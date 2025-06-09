import type { CONSTANTS_KEYS, SocketMessageType } from './enums';

export interface API_CONSTANTS_TYPES {
    [CONSTANTS_KEYS.WS_URL]: string;
    [CONSTANTS_KEYS.USER_NAME_LENGTH]: number;
    [CONSTANTS_KEYS.RECONNECT_INTERVAL]: number;
    [CONSTANTS_KEYS.ERROR_MESSAGE_DELAY]: number;
    [CONSTANTS_KEYS.SECOND]: number;
}

interface MessageStatus {
    isDelivered?: boolean;
    isReaded?: boolean;
    isEdited?: boolean;
    isDeleted?: boolean;
}

export interface Message {
    id?: string | null;
    from?: string | null;
    to?: string | null;
    text?: string;
    datetime?: number;
    status?: MessageStatus;
}

export interface User {
    login: string;
    isLogined: boolean;
}

export interface BaseRequest<T extends SocketMessageType, P> {
    id: string | null;
    type: T;
    payload: P;
}

export interface LoginRequest
    extends BaseRequest<
        SocketMessageType.USER_LOGIN,
        {
            user: {
                login: string;
                password: string;
            };
        }
    > {}

export interface LogoutRequest
    extends BaseRequest<
        SocketMessageType.USER_LOGOUT,
        {
            user: {
                login: string;
                password: string;
            };
        }
    > {}

export interface GetAuthorization extends BaseRequest<SocketMessageType.USER_ACTIVE, null> {}

export interface GetUnAuthorization extends BaseRequest<SocketMessageType.USER_INACTIVE, null> {}

export interface GetMessage
    extends BaseRequest<
        SocketMessageType.MSG_FROM_USER,
        {
            user: {
                login: string;
            };
        }
    > {}

export interface SendMessage
    extends BaseRequest<
        SocketMessageType.MSG_SEND,
        {
            message: {
                to: string;
                text: string;
            };
        }
    > {}

export interface DeleteMessage
    extends BaseRequest<
        SocketMessageType.MSG_DELETE,
        {
            message: {
                id: string;
            };
        }
    > {}

export interface SetMessageEdit
    extends BaseRequest<
        SocketMessageType.MSG_EDIT,
        {
            message: {
                id: string;
                text: string;
            };
        }
    > {}

export interface SetMessageRead
    extends BaseRequest<
        SocketMessageType.MSG_READ,
        {
            message: {
                id: string;
            };
        }
    > {}

export interface BaseResponse<T extends SocketMessageType, P> {
    id: string | null;
    type: T;
    payload: P;
}

export interface LoginResponse
    extends BaseRequest<
        SocketMessageType.USER_LOGIN,
        {
            user: User;
        }
    > {}

export interface LogoutResponse
    extends BaseRequest<
        SocketMessageType.USER_LOGOUT,
        {
            user: User;
        }
    > {}

export interface ExternalLoginResponse
    extends BaseRequest<
        SocketMessageType.USER_EXTERNAL_LOGIN,
        {
            user: User;
        }
    > {}

export interface ExternalLogoutResponse
    extends BaseRequest<
        SocketMessageType.USER_EXTERNAL_LOGOUT,
        {
            user: User;
        }
    > {}

export interface GetAllAuthenticatedUsersResponse
    extends BaseRequest<
        SocketMessageType.USER_ACTIVE,
        {
            users: User[];
        }
    > {}

export interface GetAllUnAuthenticatedUsersResponse
    extends BaseRequest<
        SocketMessageType.USER_INACTIVE,
        {
            users: User[];
        }
    > {}

export interface SendMessageToUserResponse
    extends BaseRequest<
        SocketMessageType.MSG_SEND,
        {
            message: Message;
        }
    > {}

export interface ReceiveMessageFromUserResponse
    extends BaseRequest<
        SocketMessageType.MSG_SEND,
        {
            message: Message;
        }
    > {}

export interface ReceiveUserMessagesHistoryResponse
    extends BaseRequest<
        SocketMessageType.MSG_FROM_USER,
        {
            messages: Message[];
        }
    > {}

export interface MessageDeliveryStatusChangeResponse
    extends BaseRequest<
        SocketMessageType.MSG_DELIVER,
        {
            message: Message;
        }
    > {}

export interface MessageReadStatusChangeResponse
    extends BaseRequest<
        SocketMessageType.MSG_READ,
        {
            message: Message;
        }
    > {}

export interface MessageDeleteResponse
    extends BaseRequest<
        SocketMessageType.MSG_DELETE,
        {
            message: Message;
        }
    > {}

export interface MessageEditResponse
    extends BaseRequest<
        SocketMessageType.MSG_EDIT,
        {
            message: Message;
        }
    > {}

export interface ErrorResponse
    extends BaseRequest<
        SocketMessageType.ERROR,
        {
            error: string;
        }
    > {}
