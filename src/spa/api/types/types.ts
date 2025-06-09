import type {
    ErrorResponse,
    ExternalLoginResponse,
    ExternalLogoutResponse,
    GetAllAuthenticatedUsersResponse,
    GetAllUnAuthenticatedUsersResponse,
    LoginResponse,
    LogoutResponse,
    MessageDeleteResponse,
    MessageDeliveryStatusChangeResponse,
    MessageEditResponse,
    MessageReadStatusChangeResponse,
    ReceiveMessageFromUserResponse,
    ReceiveUserMessagesHistoryResponse,
    SendMessageToUserResponse,
} from './interfaces';

export type Responses =
    | LoginResponse
    | LogoutResponse
    | ExternalLoginResponse
    | ExternalLogoutResponse
    | GetAllAuthenticatedUsersResponse
    | GetAllUnAuthenticatedUsersResponse
    | SendMessageToUserResponse
    | ReceiveMessageFromUserResponse
    | ReceiveUserMessagesHistoryResponse
    | MessageDeliveryStatusChangeResponse
    | MessageReadStatusChangeResponse
    | MessageDeleteResponse
    | MessageEditResponse
    | ErrorResponse;
