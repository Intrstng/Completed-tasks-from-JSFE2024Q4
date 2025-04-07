export enum AppInfo {
    NAME = 'Async Race',
    KEY_LS = 'asyncRace',
}

export enum Pages {
    GARAGE = 'garage',
    WINNERS = 'winners',
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

export enum COLORS {
    BLACK = '#000000',
    WHITE = '#FFFFFF',
    GREEN = '#00FF00',
    RED = '#FF0000',
    BLUE = '#0000FF',
}

export enum Description {
    TO_GARAGE = 'To garage',
    TO_WINNERS = 'To winners',
    GARAGE = 'garage',
    WINNERS = 'winners',
    CREATE = 'Create car',
    UPDATE = 'Update car',
    GENERATE = 'Generate cars',
    RACE = 'Race',
    RESET = 'Reset',
    SELECT = 'Select',
    REMOVE = 'Remove',
    START = 'Start',
    BACK = 'Back',
    PREV = 'Prev',
    NEXT = 'Next',
    PAGE = 'Page',
    NUMBER = '№',
    CAR = 'Car',
    NAME = 'Name',
    WINS = 'Wins',
    TIME = 'Best time (s)',
    ASC = 'asc',
    DESC = 'desc',
    BRAND = 'Enter car brand',
    COLOR = 'Select car color',
}

export enum InputUse {
    CREATE = 'Create',
    UPDATE = 'Update',
}

export enum InputFieldsKeys {
    CREATE_NAME = 'createName',
    CREATE_COLOR = 'createColor',
    UPDATE_NAME = 'updateName',
    UPDATE_COLOR = 'updateColor',
}

export enum AppStateKeys {
    CARS = 'cars',
    WINNERS = 'winners',
    ANIMATION = 'animation',
    WINNERS_DATA = 'winnersData',
    SELECTED_CAR = 'selectedCar',
    CARS_QUANTITY = 'carsQuantity',
    WINNERS_QUANTITY = 'winnersQuantity',
    MAIN_PAGE = 'mainPage',
    GARAGE_PAGE = 'garagePage',
    WINNERS_PAGE = 'winnersPage',
    ORDER_WINS = 'orderWins',
    ORDER_TIME = 'orderTime',
    SORT_TYPE = 'sortType',
    WINNER = 'winner',
    WINS_SORT_ACTIVE = 'winsSortActive',
    TIME_SORT_ACTIVE = 'timeSortActive',
    IS_UPDATE_ACTIVE = 'isUpdateActive',
    INPUT_DATA = 'inputData',
    BUTTONS_STATE = 'buttonsState',
}

export enum CssClasses {
    HEADER = 'header',
    TITLE = 'title',
    NAV = 'nav',
    ITEM = 'nav-item',
    ITEM_SELECTED = 'nav-item__selected',
    MAIN = 'main',
    GARAGE = 'garage',
    GARAGE_SUMMARY = 'garage__summary',
    GARAGE_CURRENT = 'garage__current',
    WINNERS = 'winners',
    WINNERS_SUMMARY = 'winners__summary',
    WINNERS_CURRENT = 'winners__current',
    TABLE_CONTAINER = 'winners__container',
    WINNERS_TABLE = 'winners__table',
    TABLE = 'table',
    TABLE_HEAD = 'table__head',
    TABLE_BODY = 'table__body',
    TABLE_ROW = 'table__row',
    TABLE_HEAD_CELL = 'table__head-cell',
    TABLE_ROW_CELL = 'table__row-cell',
    PAGINATION_GARAGE_CONTAINER = 'garage__pagination',
    PAGINATION_WIN_CONTAINER = 'winners__pagination',
    BUTTON = 'button',
    BUTTON_PREV = 'prev-btn',
    BUTTON_NEXT = 'next-btn',
    BUTTON_ASC = 'asc-btn',
    BUTTON_DESC = 'desc-btn',
    BUTTON_CONTROLS = 'controls-btn',
    BUTTON_CREATE = 'create-btn',
    BUTTON_UPDATE = 'update-btn',
    BUTTON_START = 'start-btn',
    BUTTON_BACK = 'back-btn',
    BUTTON_SELECT = 'select-btn',
    BUTTON_REMOVE = 'remove-btn',
    INPUT = 'input-class',
    BRAND = 'input-brand',
    COLOR = 'input-color',
    BOARD = 'race-board',
    BLOCK = 'car-block',
    NAME = 'car-block__name',
    RACE = 'car-block__race',
    RACE_CONTROLS = 'car-block__controls',
    TRACK = 'car-block__track',
    ICON = 'car-block__icon',
    FINISH = 'car-block__finish',
}
