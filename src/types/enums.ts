export enum AppInfo {
    NAME = 'Fun chat',
    KEY_LS = 'funChat',
}

export enum Pages {
    LOGIN = 'login',
    ABOUT = 'about',
    CHAT = 'chat'
}

export enum Location {
    PATHNAME = 'pathname',
    HASH = 'hash',
}

export enum LocationEvent {
    POPSTATE = 'popstate',
    HASHCHANGE = 'hashchange',
}

export enum InputTypes {
    BUTTON = 'button',
    CHECKBOX = 'checkbox',
    COLOR = 'color',
    DATE = 'date',
    DATETIME_LOCAL = 'datetime-local',
    EMAIL = 'email',
    FILE = 'file',
    HIDDEN = 'hidden',
    IMAGE = 'image',
    MONTH = 'month',
    NUMBER = 'number',
    PASSWORD = 'password',
    RADIO = 'radio',
    RANGE = 'range',
    RESET = 'reset',
    SEARCH = 'search',
    SUBMIT = 'submit',
    TEL = 'tel',
    TEXT = 'text',
    TIME = 'time',
    URL = 'url',
    WEEK = 'week',
}

export enum Http_Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum QueryParameterKeys {
    PAGE = '_page',
    LIMIT = '_limit',
    SORT = '_sort',
    ORDER = '_order',
}

export enum IS_DISABLED {
    TRUE = 'true',
    FALSE = 'false'
}

export enum ContentTypes {
    JSON = 'application/json',
    PLAIN = 'text/plain',
    CSS = 'text/css',
    HTML = 'text/html',
    JS = 'text/javascript',
    FORM_DATA = 'multipart/form-data',
}

export enum HttpHeaderKeys {
    ACCEPT = 'Accept',
    AUTHORIZATION = 'Authorization',
    CACHE_CONTROL = 'Cache-Control',
    CONTENT_TYPE = 'Content-Type',
    CONTENT_LENGTH = 'Content-Length',
    COOKIE = 'Cookie',
    HOST = 'Host',
    USER_AGENT = 'User-Agent',
    ORIGIN = 'Origin',
    REFERER = 'Referer',
    ACCEPT_LANGUAGE = 'Accept-Language',
    ACCEPT_ENCODING = 'Accept-Encoding',
    X_TOTAL_COUNT = 'X-Total-Count',
}

export enum CarStatus {
    STARTED = 'status=started',
    STOPPED = 'status=stopped',
    DRIVE = 'status=drive',
}

export enum Description {
    APP_NAME = 'Fun chat',
}

export enum AppStateKeys {
    IS_LOGGED = 'isLogged',
    CURRENT_USER_NAME = 'currentUserName'
}
