import { CONSTANTS_KEYS, SocketMessageType } from './enums';

export type API_CONSTANTS_TYPES = {
  [CONSTANTS_KEYS.WS_URL]: string;
  [CONSTANTS_KEYS.USER_NAME_LENGTH]: number;
  [CONSTANTS_KEYS.RECONNECT_INTERVAL]: number;
  [CONSTANTS_KEYS.ERROR_MESSAGE_DELAY]: number;
  [CONSTANTS_KEYS.SECOND]: number;
}

type MessageStatus = {
  isDelivered?: boolean;
  isReaded?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
}

export type Message = {
  id?: string | null;
  from?: string | null;
  to?: string | null;
  text?: string;
  datetime?: number;
  status?: MessageStatus;
}

export type User = {
  login: string;
  isLogined: boolean
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

export type BaseResponse<T extends SocketMessageType, P> = {
  id: string | null;
  type: T;
  payload: P;
};

export type LoginResponse = BaseResponse<SocketMessageType.USER_LOGIN, {
  user: User;
}>;

export type LogoutResponse = BaseResponse<SocketMessageType.USER_LOGOUT, {
  user: User;
}>;

export type ExternalLoginResponse = BaseResponse<SocketMessageType.USER_EXTERNAL_LOGIN, {
  user: User;
}>;

export type ExternalLogoutResponse = BaseResponse<SocketMessageType.USER_EXTERNAL_LOGOUT, {
  user: User;
}>;

export type GetAllAuthenticatedUsersResponse = BaseResponse<SocketMessageType.USER_ACTIVE, {
  users: User[];
}>;

export type GetAllUnAuthenticatedUsersResponse = BaseResponse<SocketMessageType.USER_INACTIVE, {
  users: User[];
}>;

export type SendMessageToUserResponse = BaseResponse<SocketMessageType.MSG_SEND, {
  message: Message;
}>;

    export type ReceivingMessageFromUserResponse = BaseResponse<SocketMessageType.MSG_SEND, {
      message: Message;
    }>;

export type FetchingUserMessageHistoryResponse = BaseResponse<SocketMessageType.MSG_FROM_USER, {
  messages: Message[];
}>;

export type MessageDeliveryStatusChangeResponse = BaseResponse<SocketMessageType.MSG_DELIVER, {
  message: Message;
}>;

export type MessageReadStatusChangeResponse = BaseResponse<SocketMessageType.MSG_READ, {
  message: Message;
}>;

export type MessageDeleteResponse = BaseResponse<SocketMessageType.MSG_DELETE, {
  message: Message;
}>;

export type MessageEditResponse = BaseResponse<SocketMessageType.MSG_EDIT, {
  message: Message;
}>;

export type ErrorResponse = BaseResponse<SocketMessageType.ERROR, {
  error: string,
}>;

export type Responses = LoginResponse | LogoutResponse | ExternalLoginResponse | ExternalLogoutResponse | GetAllAuthenticatedUsersResponse | GetAllUnAuthenticatedUsersResponse | SendMessageToUserResponse | ReceivingMessageFromUserResponse | FetchingUserMessageHistoryResponse | MessageDeliveryStatusChangeResponse | MessageReadStatusChangeResponse | MessageDeleteResponse | MessageEditResponse | ErrorResponse
