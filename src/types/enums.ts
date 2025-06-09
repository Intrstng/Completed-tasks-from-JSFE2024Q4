export enum AppInfo {
    NAME = 'Fun chat',
}

export enum Pages {
    LOGIN = 'login',
    ABOUT = 'about',
    CHAT = 'chat',
    EMPTY = '',
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

export enum IS_DISABLED {
    TRUE = 'true',
    FALSE = 'false',
}

export enum AppStateKeys {
    IS_LOGGED = 'isLogged',
    CURRENT_USER_NAME = 'currentUserName',
    CURRENT_USER_PASS = 'currentUserPass',
    CURRENT_CONTACT = 'currentContact',
    MESSAGE_HISTORY = 'messageHistory',
    CURRENT_MESSAGE = 'currentMessage',
    ONLINE_USERS = 'onlineUsers',
    OFFLINE_USERS = 'offlineUsers',
    MESSAGE_COUNTER = 'messageCounter',
}

export enum DOMEvents {
    CLICK = 'click',
    DBLCLICK = 'dblclick',
    MOUSEDOWN = 'mousedown',
    MOUSEUP = 'mouseup',
    MOUSEMOVE = 'mousemove',
    MOUSEOVER = 'mouseover',
    MOUSEOUT = 'mouseout',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',

    KEYDOWN = 'keydown',
    KEYUP = 'keyup',
    KEYPRESS = 'keypress',

    SUBMIT = 'submit',
    CHANGE = 'change',
    INPUT = 'input',
    FOCUS = 'focus',
    BLUR = 'blur',
    RESET = 'reset',

    DOM_CONTENT_LOADED = 'DOMContentLoaded',
    LOAD = 'load',
    RESIZE = 'resize',
    SCROLL = 'scroll',
    BEFOREUNLOAD = 'beforeunload',
    UNLOAD = 'unload',

    TOUCHSTART = 'touchstart',
    TOUCHMOVE = 'touchmove',
    TOUCHEND = 'touchend',
    TOUCHCANCEL = 'touchcancel',

    DRAG = 'drag',
    DRAGSTART = 'dragstart',
    DRAGEND = 'dragend',
    DRAGOVER = 'dragover',
    DROP = 'drop',

    PLAY = 'play',
    PAUSE = 'pause',
    ENDED = 'ended',
    VOLUMECHANGE = 'volumechange',

    ANIMATIONSTART = 'animationstart',
    ANIMATIONEND = 'animationend',
    ANIMATIONITERATION = 'animationiteration',
    TRANSITIONEND = 'transitionend',

    ERROR = 'error',
    CONTEXTMENU = 'contextmenu',
    HASHCHANGE = 'hashchange',
    POPSTATE = 'popstate',
}

export enum Attributes {
    TYPE = 'type',
    SET_ATTRIBUTE = 'setAttribute',
    GET_ATTRIBUTE = 'getAttribute',
    CLASS_LIST = 'classList',
    TEXT_CONTENT = 'textContent',
    HREF = 'href',
    SRC = 'src',
    TARGET = 'target',
    BLANK = '_blank',
    ID = 'id',
    OPEN = 'open',
    VALUE = 'value',
    AUTOCOMPLETE = 'autocomplete',
    REQUIRED = 'required',
    PLACEHOLDER = 'placeholder',
    NAME = 'name',
    MIN = 'min',
    MAX = 'max',
    FOR = 'for',
    DATASET = 'dataset',
    ROWS = 'rows',
    COLS = 'cols',
    TITLE = 'title',
    DISABLED = 'disabled',
}

export enum SVG_Attributes {
    SVG = 'svg',
    G = 'g',
    CLASS = 'class',
    VIEW_BOX = 'viewBox',
    STYLE = 'style',
    FILL = 'fill',
    NONE = 'none',
    ID = 'id',
    MAIN_GROUP = 'mainGroup',
}

export enum Booleans {
    TRUE = 'true',
    FALSE = 'false',
}
