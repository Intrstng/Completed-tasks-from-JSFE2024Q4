import type { MessageHandlers } from '../../types';
import { AppStateKeys, DOMEvents } from '../../types';
import type {
    API_CONSTANTS_TYPES,
    DeleteMessage,
    ExternalLogoutResponse,
    GetAllAuthenticatedUsersResponse,
    GetAllUnAuthenticatedUsersResponse,
    GetAuthorization,
    GetMessage,
    GetUnAuthorization,
    LoginRequest,
    LogoutRequest,
    Message,
    ReceiveUserMessagesHistoryResponse,
    SendMessage,
    SendMessageToUserResponse,
    SetMessageEdit,
    SetMessageRead,
    ExternalLoginResponse,
    LoginResponse,
    LogoutResponse,
    ErrorResponse,
    Responses,
} from './types';
import { CONSTANTS_KEYS, SocketMessageType, WSEvents } from './types';
import { CONNECTION_ERROR } from '../../constants/dialog-constants';
import { API_CONSTANTS } from '../../constants/api-constants';
import type Router from '../router/router';
import { PagesNames } from '../../constants/header-constants';
import type { AppState } from '../state/types';
import CreatorDialog from '../components/dialog/dialog-creator';
import type { StateService } from '../state/state-service';
import { isMessageOfType } from '../utils/assertion-functions/assertion-functions';

export default class ApiController {
    public socket: globalThis.WebSocket | null = null;
    private readonly wsURL: string | null = null;
    private readonly state: StateService;
    private router: Router;
    private readonly constants: API_CONSTANTS_TYPES;
    private readonly errorMessage: CreatorDialog | null = null;
    private reconnectInterval: number = API_CONSTANTS.RECONNECT_INTERVAL;
    private isConnected = false;

    private readonly messageHandlers: MessageHandlers = {
        [SocketMessageType.USER_LOGIN]: this.loginUserAction.bind(this),
        [SocketMessageType.USER_LOGOUT]: this.logoutUserAction.bind(this),
        [SocketMessageType.USER_ACTIVE]: this.getActiveUsersAction.bind(this),
        [SocketMessageType.USER_INACTIVE]: this.getInActiveUsersAction.bind(this),
        [SocketMessageType.USER_EXTERNAL_LOGIN]: this.externalUserLoginAction.bind(this),
        [SocketMessageType.USER_EXTERNAL_LOGOUT]: this.externalUserLogoutAction.bind(this),
        [SocketMessageType.MSG_SEND]: this.sendMessageToUserAction.bind(this),
        [SocketMessageType.MSG_FROM_USER]: this.getUserMessagesHistoryFromUserAction.bind(this),
        [SocketMessageType.ERROR]: this.getMessageErrorAction.bind(this),

        [SocketMessageType.MSG_DELIVER]: () => {
            console.log('MSG_DELIVER will be added soon');
        },
        [SocketMessageType.MSG_READ]: () => {
            console.log('MSG_READ will be added soon');
        },
        [SocketMessageType.MSG_EDIT]: () => {
            console.log('MSG_EDIT will be added soon');
        },
        [SocketMessageType.MSG_DELETE]: () => {
            console.log('MSG_DELETE will be added soon');
        },
    };

    constructor(state: StateService, router: Router, errorMessage: CreatorDialog, constants: API_CONSTANTS_TYPES) {
        this.wsURL = constants[CONSTANTS_KEYS.WS_URL];

        if (this.wsURL) {
            this.socket = new WebSocket(this.wsURL);
        }

        this.constants = constants;
        this.state = state;
        this.router = router;
        this.errorMessage = errorMessage;

        this.connect();

        globalThis.addEventListener(DOMEvents.BEFOREUNLOAD, () => {
            if (this.socket) {
                this.socket.close();
            }
        });
    }

    public restoreUserSession(): void {
        const login = this.state.getState()[AppStateKeys.CURRENT_USER_NAME];
        const password = this.state.getState()[AppStateKeys.CURRENT_USER_PASS];

        if (login && password) {
            this.loginUser(login, password);
            console.log('User session restored with credentials');
        }
    }

    public connect() {
        if (this.wsURL && this.socket) {
            this.socket.addEventListener(WSEvents.OPEN, () => this.handleOpenSocket());
            this.socket.addEventListener(WSEvents.CLOSE, () => this.handleCloseSocket());
            this.socket.addEventListener(WSEvents.ERROR, () => this.handleErrorSocket());
            this.socket.addEventListener(WSEvents.MESSAGE, (event: MessageEvent) => this.handleMessageSocket(event));
        } else {
            console.error('WebSocket URL is not defined');
        }
    }

    public async handleMessageSocket<T extends SocketMessageType>(event: MessageEvent): Promise<void> {
        try {
            const message: Extract<Responses, { type: T }> = JSON.parse(event.data);

            const handler = this.messageHandlers[message.type];

            if (handler && isMessageOfType(message, message.type)) {
                await handler(message);
            } else {
                console.warn('No handler for message type:', message.type);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }

    public loginUser(login: string, password: string): void {
        if (this.isConnected && this.socket) {
            const message: LoginRequest = {
                id: crypto.randomUUID(),
                type: SocketMessageType.USER_LOGIN,
                payload: {
                    user: {
                        login,
                        password,
                    },
                },
            };
            this.socket.send(JSON.stringify(message));

            this.state.updatePropertyInState(AppStateKeys.CURRENT_USER_PASS, password);
        } else {
            console.error('Unable to login user, not connected.');
        }
    }

    public logoutUser(login: string, password: string): void {
        if (this.isConnected && this.socket) {
            const message: LogoutRequest = {
                id: crypto.randomUUID(),
                type: SocketMessageType.USER_LOGOUT,
                payload: {
                    user: {
                        login,
                        password,
                    },
                },
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('Unable to logout user, not connected.');
        }
    }

    public async getAuthorizedUsers(): Promise<void> {
        return new Promise<void>(resolve => {
            if (this.isConnected && this.socket) {
                const messageId = crypto.randomUUID();

                const handler = (event: MessageEvent) => {
                    const response: GetAllAuthenticatedUsersResponse = JSON.parse(event.data);

                    if (response.type === SocketMessageType.USER_ACTIVE && response.id === messageId) {
                        if (this.socket) {
                            this.socket.removeEventListener(WSEvents.MESSAGE, handler);
                        }
                        resolve();
                    }
                };

                this.socket.addEventListener(WSEvents.MESSAGE, handler);

                const message: GetAuthorization = {
                    id: messageId,
                    type: SocketMessageType.USER_ACTIVE,
                    payload: null,
                };
                this.socket.send(JSON.stringify(message));
            } else {
                console.error('Unable to get authorized users, not connected.');
                resolve();
            }
        });
    }

    public async getUnAuthorizedUsers(): Promise<void> {
        return new Promise<void>(resolve => {
            if (this.isConnected && this.socket) {
                const messageId = crypto.randomUUID();

                const handler = (event: MessageEvent) => {
                    const response: GetAllUnAuthenticatedUsersResponse = JSON.parse(event.data);
                    if (response.type === SocketMessageType.USER_INACTIVE && response.id === messageId) {
                        if (this.socket) {
                            this.socket.removeEventListener(WSEvents.MESSAGE, handler);
                        }
                        resolve();
                    }
                };

                this.socket.addEventListener(WSEvents.MESSAGE, handler);

                const message: GetUnAuthorization = {
                    id: messageId,
                    type: SocketMessageType.USER_INACTIVE,
                    payload: null,
                };
                this.socket.send(JSON.stringify(message));
            } else {
                console.error('Unable to get unauthorized users, not connected.');
                resolve();
            }
        });
    }

    public async getMessages(login: string): Promise<void> {
        return new Promise<void>(resolve => {
            if (this.isConnected && this.socket) {
                const messageId = crypto.randomUUID();

                const handler = (event: MessageEvent) => {
                    const response: ReceiveUserMessagesHistoryResponse = JSON.parse(event.data);
                    if (response.type === SocketMessageType.MSG_FROM_USER && response.id === messageId) {
                        if (this.socket) {
                            this.socket.removeEventListener(WSEvents.MESSAGE, handler);
                        }
                        resolve();
                    }
                };

                this.socket.addEventListener(WSEvents.MESSAGE, handler);

                const message: GetMessage = {
                    id: messageId,
                    type: SocketMessageType.MSG_FROM_USER,
                    payload: { user: { login } },
                };
                this.socket.send(JSON.stringify(message));
            } else {
                console.error('Unable to get messages, not connected.');
                resolve();
            }
        });
    }

    public async sendMessage(recipient: string, message_: string): Promise<void> {
        return new Promise<void>(resolve => {
            if (this.isConnected && this.socket) {
                const messageId = crypto.randomUUID();

                const handler = (event: MessageEvent) => {
                    const response: SendMessageToUserResponse = JSON.parse(event.data);
                    if (response.type === SocketMessageType.MSG_SEND && response.id === messageId) {
                        if (this.socket) {
                            this.socket.removeEventListener(WSEvents.MESSAGE, handler);
                        }
                        resolve();
                    }
                };

                this.socket.addEventListener(WSEvents.MESSAGE, handler);

                const message: SendMessage = {
                    id: messageId,
                    type: SocketMessageType.MSG_SEND,
                    payload: {
                        message: {
                            to: recipient,
                            text: message_,
                        },
                    },
                };
                this.socket.send(JSON.stringify(message));
            } else {
                console.error('Unable to get messages, not connected.');
                resolve();
            }
        });
    }

    public deleteMessage(id: string): void {
        if (this.isConnected && this.socket) {
            const message: DeleteMessage = {
                id: crypto.randomUUID(),
                type: SocketMessageType.MSG_DELETE,
                payload: {
                    message: {
                        id,
                    },
                },
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('Unable to delete message, not connected.');
        }
    }

    public setMessageEdited(id: string, text: string): void {
        if (this.isConnected && this.socket) {
            const message: SetMessageEdit = {
                id: crypto.randomUUID(),
                type: SocketMessageType.MSG_EDIT,
                payload: {
                    message: {
                        id,
                        text,
                    },
                },
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('Unable to set message edited, not connected.');
        }
    }

    public setMessageRead(id: string): void {
        if (this.isConnected && this.socket) {
            const message: SetMessageRead = {
                id: crypto.randomUUID(),
                type: SocketMessageType.MSG_READ,
                payload: {
                    message: {
                        id,
                    },
                },
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('Unable to set message, not connected.');
        }
    }

    private handleOpenSocket(): void {
        this.isConnected = true;
        if (this.errorMessage) {
            this.errorMessage.closeDialog();
        }
        console.log('Socket open connection logic');

        this.restoreUserSession();
    }

    private handleCloseSocket(): void {
        this.isConnected = false;

        this.reconnect();
        console.log('Socket close connection logic');
    }

    private reconnect() {
        if (this.isConnected) return;

        console.log(
            `Attempting to reconnect in ${this.reconnectInterval / API_CONSTANTS[CONSTANTS_KEYS.SECOND]} seconds...`
        );
        setTimeout(() => {
            this.connect();
        }, this.reconnectInterval);
    }

    private handleErrorSocket(): void {
        if (this.errorMessage) {
            this.errorMessage.showDialog(CONNECTION_ERROR.RECONNECT);
        }
        if (this.socket) {
            this.socket.close();
        }
        console.error('Socket connection terminated. Reconnection in progress');
    }

    private async loginUserAction(message: LoginResponse): Promise<void> {
        const { login, isLogined } = message.payload.user;

        this.state.updatePropertyInState(AppStateKeys.CURRENT_USER_NAME, login);
        this.state.updatePropertyInState(AppStateKeys.IS_LOGGED, isLogined);

        if (isLogined) {
            await this.getAuthorizedUsers();
            await this.getUnAuthorizedUsers();

            this.router.navigate(PagesNames.CHAT);
        }
    }

    private logoutUserAction(message: LogoutResponse): void {
        const { isLogined } = message.payload.user;

        this.state.updatePropertyInState(AppStateKeys.IS_LOGGED, isLogined);
        this.state.updatePropertyInState(AppStateKeys.CURRENT_USER_NAME, '');
        this.state.resetState();
        this.router.navigate(PagesNames.LOGIN);
    }

    private getActiveUsersAction(message: GetAllAuthenticatedUsersResponse): void {
        const currentUserName = this.state.getState()[AppStateKeys.CURRENT_USER_NAME];
        const usersCollectionWithoutCurrentUser = message.payload.users.filter(user => user.login !== currentUserName);
        const currentState: AppState = this.state.getState();
        const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.ONLINE_USERS]: usersCollectionWithoutCurrentUser,
        };

        this.state.setState(updatedState);
    }

    private getInActiveUsersAction(message: GetAllUnAuthenticatedUsersResponse): void {
        const currentState: AppState = this.state.getState();
        const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.OFFLINE_USERS]: message.payload.users,
        };
        this.state.setState(updatedState);
    }

    private externalUserLoginAction(message: ExternalLoginResponse): void {
        const currentOnlineUsers = this.state.getState()[AppStateKeys.ONLINE_USERS];
        const currentOfflineUsers = this.state.getState()[AppStateKeys.OFFLINE_USERS];

        const updatedOnlineUsers = [...currentOnlineUsers, message.payload.user];
        this.state.updatePropertyInState(AppStateKeys.ONLINE_USERS, updatedOnlineUsers);

        const updatedCurrentOfflineUsers = currentOfflineUsers.filter(
            user => user.login !== message.payload.user.login
        );
        this.state.updatePropertyInState(AppStateKeys.OFFLINE_USERS, updatedCurrentOfflineUsers);

        this.state.notifySubscribers(SocketMessageType.USER_EXTERNAL_LOGIN);
    }

    private externalUserLogoutAction(message: ExternalLogoutResponse): void {
        const currentOnlineUsers = this.state.getState()[AppStateKeys.ONLINE_USERS];
        const currentOfflineUsers = this.state.getState()[AppStateKeys.OFFLINE_USERS];

        const updatedCurrentOnlineUsers = currentOnlineUsers.filter(user => user.login !== message.payload.user.login);
        this.state.updatePropertyInState(AppStateKeys.ONLINE_USERS, updatedCurrentOnlineUsers);

        const updatedCurrentOfflineUsers = [...currentOfflineUsers, message.payload.user];
        this.state.updatePropertyInState(AppStateKeys.OFFLINE_USERS, updatedCurrentOfflineUsers);

        this.state.notifySubscribers(SocketMessageType.USER_EXTERNAL_LOGOUT);
    }

    private sendMessageToUserAction(message: SendMessageToUserResponse): void {
        const currentMessageHistory: Message[] = this.state.getState()[AppStateKeys.MESSAGE_HISTORY];
        const updatedMessageHistory: Message[] = [...currentMessageHistory, message.payload.message];
        this.state.updatePropertyInState(AppStateKeys.MESSAGE_HISTORY, updatedMessageHistory);

        if (message.payload.message.from) {
            this.setMessageCounterFromContact(message.payload.message.from);
            this.state.notifySubscribers(SocketMessageType.MSG_SEND, message.payload.message.from);
        }
    }

    private getUserMessagesHistoryFromUserAction(message: ReceiveUserMessagesHistoryResponse): void {
        const currentState: AppState = this.state.getState();
        const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.MESSAGE_HISTORY]: message.payload.messages,
        };
        this.state.setState(updatedState);
    }

    private getMessageErrorAction(message: ErrorResponse): void {
        if (this.errorMessage instanceof CreatorDialog) {
            this.errorMessage.showDialog(message.payload.error);
        }
    }

    private setMessageCounterFromContact(from: string): void {
        const currentUsersMessageCounters = this.state.getState()[AppStateKeys.MESSAGE_COUNTER];

        let currentUserCounter: number = currentUsersMessageCounters[from];

        if (currentUserCounter) {
            currentUserCounter += 1;
        } else {
            currentUserCounter = 1;
        }

        currentUsersMessageCounters[from] = currentUserCounter;

        const currentState: AppState = this.state.getState();
        const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.MESSAGE_COUNTER]: currentUsersMessageCounters,
        };

        this.state.setState(updatedState);
    }
}
