import { Constants } from '../../types';
import SessionStorageState from '../state/session-storage-state';
import {
  DeleteMessage,
  GetAuthorization,
  GetMessage,
  GetUnAuthorization,
  LoginRequest,
  LogoutRequest,
  SendMessage,
  SetMessageEdit,
  SetMessageRead,
  SocketMessageType,
} from './types';
import CreatorDialog from '../util/dialog/dialog-creator';
import { CONNECTION_ERROR } from '../util/dialog/dialog-constants';
import { RECONNECT_INTERVAL } from './api-constants';

export default class ApiController {
  public socket: globalThis.WebSocket;
  private readonly wsURL: string;
  private readonly state: SessionStorageState;
  private readonly constants: Constants;
  private errorMessage: CreatorDialog | null = null;

  private reconnectInterval: number = RECONNECT_INTERVAL;
  private isConnected: boolean = false;

  constructor(state: SessionStorageState, errorMessage: CreatorDialog, constants: Constants) {
    this.wsURL = constants.wsURL;
    this.constants = constants;
    this.state = state;
    this.errorMessage = errorMessage;

    this.connect();
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
  }

  private handleCloseSocket(): void {
    this.isConnected = false;

    this.reconnect();
    console.log('Socket close connection logic');
  }

  private reconnect() {
    if (this.isConnected) return;

    console.log(`Attempting to reconnect in ${this.reconnectInterval / 1000} seconds...`);
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
      const message = JSON.parse(event.data);
      console.log('Received message:', message);


    } catch (error) {
      console.error('Error parsing message:', error);
    }
    console.error('handleMessageSocket');
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
    } else {
      console.error('Unable to login user, not connected.');
    }
  }

  // Check params
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

  // Check id (login => from whom)
  public getMessages(id: string, login: string): void {
    if (this.isConnected && this.socket) {
      const message: GetMessage = {
        id,
        type: SocketMessageType.MSG_FROM_USER,
        payload: {
          user: {
            login,
          },
        },
      };
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('Unable to get messages, not connected.');
    }
  }

  public sendMessage(recipient: string, msg: string): void {
    if (this.isConnected && this.socket) {
      const message: SendMessage = {
        id: crypto.randomUUID(),
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
      console.error('Unable to send message, not connected.');
    }
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