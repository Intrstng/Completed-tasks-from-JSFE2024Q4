import { AppStateKeys } from '../../types';
import SessionStorageState from '../state/session-storage-state';
import {
  API_CONSTANTS_TYPES, CONSTANTS_KEYS,
  DeleteMessage,
  GetAuthorization,
  GetMessage,
  GetUnAuthorization,
  LoginRequest,
  LogoutRequest, Message, Responses,
  SendMessage,
  SetMessageEdit,
  SetMessageRead,
  SocketMessageType, User,
} from './types';
import CreatorDialog from '../util/dialog/dialog-creator';
import { CONNECTION_ERROR } from '../util/dialog/dialog-constants';
import { API_CONSTANTS } from './api-constants';
import Router from '../router/router';
import { PagesNames } from '../view/header/header-constants';
import { AppState } from '../state/types';

export default class ApiController {
  public socket: globalThis.WebSocket;
  private readonly wsURL: string;
  private readonly state: SessionStorageState;
  private router: Router;
  private readonly constants: API_CONSTANTS_TYPES;
  private errorMessage: CreatorDialog | null = null;

  private reconnectInterval: number = API_CONSTANTS.RECONNECT_INTERVAL;
  private isConnected: boolean = false;

  constructor(state: SessionStorageState, router: Router,errorMessage: CreatorDialog, constants: API_CONSTANTS_TYPES) {
    this.wsURL = constants[CONSTANTS_KEYS.WS_URL];
    this.constants = constants;
    this.state = state;
    this.router = router;
    this.errorMessage = errorMessage;

    this.connect();

    window.addEventListener('beforeunload', () => {
      this.socket?.close();
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
    if (this.wsURL) {
      this.socket = new WebSocket(this.wsURL);

      this.socket.onopen = () => this.handleOpenSocket();
      this.socket.onclose = () => this.handleCloseSocket();
      this.socket.onerror = () => this.handleErrorSocket();
      this.socket.onmessage = (event: MessageEvent) => this.handleMessageSocket(event);
    } else {
      console.error('WebSocket URL is not defined');
    }
  }

  private handleOpenSocket(): void {
    this.isConnected = true;
    this.errorMessage.closeDialog();
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

    console.log(`Attempting to reconnect in ${this.reconnectInterval / API_CONSTANTS[CONSTANTS_KEYS.SECOND]} seconds...`);
    setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }

  private handleErrorSocket(): void {
    this.errorMessage.showDialog(CONNECTION_ERROR.RECONNECT)

    this.socket?.close();
    console.error('Socket connection terminated. Reconnection in progress');
  }

  private handleMessageSocket(event: MessageEvent): void {
    try {
      const message: Responses = JSON.parse(event.data);
      console.log('Received message:', message);

      switch (message.type) {
        case SocketMessageType.USER_LOGIN: {
          const { login, isLogined } = message.payload.user;

          this.state.updatePropertyInState(AppStateKeys.CURRENT_USER_NAME, login);
          this.state.updatePropertyInState(AppStateKeys.IS_LOGGED, isLogined);

          if (isLogined) {
            this.getAuthorizedUsers();
            this.getUnAuthorizedUsers();

            this.router.navigate(PagesNames.CHAT);
          }

          break;
        }
        case SocketMessageType.USER_LOGOUT: {
          const { isLogined } = message.payload.user;

          this.state.updatePropertyInState(AppStateKeys.IS_LOGGED, isLogined);
          this.state.updatePropertyInState(AppStateKeys.CURRENT_USER_NAME, '');
          this.state.resetState();
          this.router.navigate(PagesNames.LOGIN)

          break;
        }
        case SocketMessageType.USER_ACTIVE: {
          const currentUserName = this.state.getState()[AppStateKeys.CURRENT_USER_NAME];
          const usersCollectionWithoutCurrentUser = message.payload.users.filter(user => user.login !== currentUserName)
          const currentState: AppState = this.state.getState()
          const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.ONLINE_USERS]: usersCollectionWithoutCurrentUser,
          }

          this.state.setState(updatedState);
          break;
        }
        case SocketMessageType.USER_INACTIVE: {
          const currentState: AppState = this.state.getState()
          const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.OFFLINE_USERS]: message.payload.users,
          }
          this.state.setState(updatedState);
          break;
        }
        case SocketMessageType.USER_EXTERNAL_LOGIN: {
          const currentOnlineUsers = this.state.getState()[AppStateKeys.ONLINE_USERS]
          const currentOfflineUsers = this.state.getState()[AppStateKeys.OFFLINE_USERS]

          const updatedOnlineUsers = [...currentOnlineUsers, message.payload.user]
          this.state.updatePropertyInState(AppStateKeys.ONLINE_USERS, updatedOnlineUsers)

          const updatedCurrentOfflineUsers = currentOfflineUsers.filter(user => user.login !== message.payload.user.login)
          this.state.updatePropertyInState(AppStateKeys.OFFLINE_USERS, updatedCurrentOfflineUsers)

          this.state.notifySubscribers();
          break;
        }
        case SocketMessageType.USER_EXTERNAL_LOGOUT: {
          const currentOnlineUsers = this.state.getState()[AppStateKeys.ONLINE_USERS]
          const currentOfflineUsers = this.state.getState()[AppStateKeys.OFFLINE_USERS]

          const updatedCurrentOnlineUsers = currentOnlineUsers.filter(user => user.login !== message.payload.user.login)
          this.state.updatePropertyInState(AppStateKeys.ONLINE_USERS, updatedCurrentOnlineUsers)

          const updatedCurrentOfflineUsers = [...currentOfflineUsers, message.payload.user];
          this.state.updatePropertyInState(AppStateKeys.OFFLINE_USERS, updatedCurrentOfflineUsers)

          this.state.notifySubscribers();
          break;
        }
        case SocketMessageType.MSG_FROM_USER:

          const currentState: AppState = this.state.getState()
          const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.MESSAGE_HISTORY]: message.payload.messages,
          }
          this.state.setState(updatedState);
          break;

        case SocketMessageType.MSG_SEND: {
          const currentMessageHistory: Message[] = this.state.getState()[AppStateKeys.MESSAGE_HISTORY];
          const updatedMessageHistory: Message[] = [...currentMessageHistory, message.payload.message]
          this.state.updatePropertyInState(AppStateKeys.MESSAGE_HISTORY, updatedMessageHistory)
          break;
        }
        case SocketMessageType.MSG_DELIVER: {

          break;
        }
        case SocketMessageType.MSG_READ: {

          break;
        }
        case SocketMessageType.MSG_EDIT: {

          break;
        }
        case SocketMessageType.MSG_DELETE: {

          break;
        }
        case SocketMessageType.ERROR: {
          this.errorMessage.showDialog(message.payload.error)
          break;
        }
        default:
          console.warn('Unhandled message type:', message);
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

      // Check saving password on client side
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
            password
          },
        },
      };
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('Unable to logout user, not connected.');
    }
  }

  public getAuthorizedUsers(): void {
    if (this.isConnected && this.socket) {
      const message: GetAuthorization = {
        id: crypto.randomUUID(),
        type: SocketMessageType.USER_ACTIVE,
        payload: null,
      };
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('Unable to get authorized users, not connected.');
    }
  }

  public getUnAuthorizedUsers(): void {
    if (this.isConnected && this.socket) {
      const message: GetUnAuthorization = {
        id: crypto.randomUUID(),
        type: SocketMessageType.USER_INACTIVE,
        payload: null,
      };
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('Unable to get unauthorized users, not connected.');
    }
  }

  public async getMessages(login: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.isConnected && this.socket) {
        const messageId = crypto.randomUUID();

        const handler = (event: MessageEvent) => {
          const response: Responses = JSON.parse(event.data);
          if (response.type === SocketMessageType.MSG_FROM_USER &&
              response.id === messageId) {
            this.socket.removeEventListener('message', handler);
            resolve();
          }
        };

        this.socket.addEventListener('message', handler);

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

  public async sendMessage(recipient: string, msg: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.isConnected && this.socket) {
        const messageId = crypto.randomUUID();

        const handler = (event: MessageEvent) => {
          const response: Responses = JSON.parse(event.data);
          if (response.type === SocketMessageType.MSG_SEND &&
              response.id === messageId) {
            this.socket.removeEventListener('message', handler);
            resolve();
          }
        };

        this.socket.addEventListener('message', handler);

        const message: SendMessage = {
          id: messageId,
          type: SocketMessageType.MSG_SEND,
          payload: {
            message: {
              to: recipient,
              text: msg,
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
}