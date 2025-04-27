export enum AppInfo {
    NAME = 'Decision Making Tool',
    KEY_LS = 'decisionMakingTool',
}

export enum Pages {
    INDEX = 'index',
    SELECTOR = 'selector',
    NOT_FOUND = 'not-found',
}

export enum Location {
    PATHNAME = 'pathname',
    HASH = 'hash',
}

export enum LocationEvent {
    POPSTATE = 'popstate',
    HASHCHANGE = 'hashchange',
}

export enum InputFieldCssClasses {
    CONTAINER = 'field__container',
}

export enum InputDescription {
    TITLE = 'Title',
    WEIGHT = 'Weight',
    ID = '#',
    SEC = 'sec',
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

export enum ButtonNames {
    ADD = 'Add Option',
    PASTE = 'Paste list',
    CLEAR = 'Clear list',
    SAVE = 'Save list to file',
    LOAD = 'Load list from file',
    START = 'Start',
    START_SELECT = 'Press start button',
    DELETE = 'Delete',
    BACK = 'Back to main page',
    SOUND_ON = 'Sound: on',
    SOUND_OFF = 'Sound: off',
    TOOLTIP_DURATION = 'Enter a value between 5 and 30',
    ERROR = 'Error 404. Page is not found',
    CLOSE = 'Close',
    CANCEL = 'Cancel',
    CONFIRM = 'Confirm',
}

export enum FieldKeys {
    LIST = 'list',
    LASTID = 'lastId',
    ISMUTE = 'isMute',
    DURATION = 'duration',
}

export enum DataHandlerInput {
    TYPE = 'file',
    ACCEPT = 'application/json',
}

export enum IndexViewItemPrefixes {
    HASH = '#',
    LISTITEM_ = 'listItem_',
    LISTITEM_HASH = 'listItem_#',
    DELETE_BUTTON_HASH = 'buttonDelete_#',
    DELETE_BUTTON_ = 'deleteButton_',
}
