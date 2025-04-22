import { SocketMessageType } from './enums';

type MessageStatus = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
  isDeleted: boolean;
}

type Message = {
  id?: string | null;
  text?: string;
  to?: string | null;
  from?: string | null;
  datetime?: number;
  status?: MessageStatus;
}

type User = {
  login: string;
  password?: string;
  isLogined?: string
}

export type BaseRequest<T extends SocketMessageType, P> = {
  id: string | null;
  type: T;
  payload: P;
};

export type LoginRequest = BaseRequest<SocketMessageType.USER_LOGIN, {
  user: {
    login: string;
    password: string;
  };
}>;

export type LogoutRequest = BaseRequest<SocketMessageType.USER_LOGOUT, {
  user: {
    login: string;
    password: string;
  };
}>;

export type GetAuthorization = BaseRequest<SocketMessageType.USER_ACTIVE, null>;

export type GetUnAuthorization = BaseRequest<SocketMessageType.USER_INACTIVE, null>;

export type GetMessage = BaseRequest<SocketMessageType.MSG_FROM_USER, {
  user: {
    login: string;
  };
}>;

export type SendMessage = BaseRequest<SocketMessageType.MSG_SEND, {
  message: {
    to: string;
    text: string;
  };
}>;

export type DeleteMessage = BaseRequest<SocketMessageType.MSG_DELETE, {
  message: {
    id: string;
  };
}>;

export type SetMessageEdit = BaseRequest<SocketMessageType.MSG_EDIT, {
  message: {
    id: string;
    text: string;
  };
}>;

export type SetMessageRead = BaseRequest<SocketMessageType.MSG_READ, {
  message: {
    id: string;
  };
}>;

