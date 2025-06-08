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

export enum Description {
    APP_NAME = 'Async Race',
    WINNER = 'winner',
    WINNER_TIME = 'time:',
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
    COLOR = 'Select car color:',
    INCREMENT = 'increment',
    DECREMENT = 'decrement',
    SORT_TIME = 'time',
    SORT_WINS = 'wins',
    TABLE = 'table',
    DIALOG_NAME = 'dialogName',
    DIALOG_TIME = 'dialogTime',
    OPEN = 'open',
    FINISHED = 'Finished first:',
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

export enum Paths {
    GARAGE = '/garage',
    WINNERS = '/winners',
    ENGINE = '/engine',
}
