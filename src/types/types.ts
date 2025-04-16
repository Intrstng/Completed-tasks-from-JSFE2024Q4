import type { AppStateKeys, Description, InputTypes, Location, LocationEvent } from './enums';
import type GarageView from '../spa/view/main/garage/garage-view';
import type WinnersView from '../spa/view/main/winners/winners-view';
import type CreatorElement from '../spa/util/creator-element';

export type Route = {
    path: string;
    callback: () => Promise<void>;
};

export type RequestParameters = {
    path: string;
};

export type RouterCB = (parameters: RequestParameters) => void;

export type RouterParameters = {
    nameEvent: LocationEvent;
    locationField: Location;
};

export type PopStateEventState = {
    url?: string;
};

export type EventCallback = ((event: Event) => void | Promise<void>) | null;

export type ElementParameters = {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    textContent?: string;
    callback?: EventCallback | null;
    type?: InputTypes;
    placeholder?: string;
    title?: string;
    min?: string;
    max?: string;
    value?: string;
    required?: boolean;
    rows?: string;
    cols?: string;
};

export type DialogParameters = ElementParameters & {
    open: boolean;
};

export type ViewCommon = GarageView | WinnersView;

export type ButtonParameters = Pick<ElementParameters, 'id' | 'tag' | 'classNames' | 'textContent' | 'callback'>;

export type ButtonsCollection = Array<ButtonParameters>;

export type OrderButtonParametersWithCB = {
    ascButtonParametersWithCB: ElementParameters | null;
    descButtonParametersWithCB: ElementParameters | null;
};

export type Callback = () => void;

export type CallbackID = (id: number) => void;

export type CallbackQuery = (queryParameters: QueryParameters[]) => string;

export type ToggleActiveButtonCallback = (button: CreatorElement) => void;

export type CreateTableRecordsCB = (cars: Array<Car>, winners: Array<Winner>) => Array<TableRecord>;

export type AddOrderButtonCallbacksToParametersCB = (columnName: Description) => OrderButtonParametersWithCB;

export type ToggleButtonActiveClassCB = (button: CreatorElement) => void;

export type AnimateCarRacingCB = (
    carID: number,
    car: HTMLElement,
    duration: number,
    trackDistance: number
) => AnimationFrame;

export type Car = {
    id: number;
    name: string;
    color: string;
};

export type RaceWinner = {
    carID: number;
    name: string;
    time: string;
};

export type RaceWinnerMessage = Omit<RaceWinner, 'name'>;

export type Winner = {
    id: number;
    wins: number;
    time: number;
};

export type TableRecord = {
    wins: number;
    time: number;
    name: string;
    color: string;
};

export type Input = {
    createName: string;
    createColor: string;
    updateName: string;
    updateColor: string;
};

export type Buttons = {
    start: boolean;
    reset: boolean;
};

export type Animation = {
    id: number | null;
    distance: number;
};

export type AnimationFrame = {
    carID: number;
    animationID: number | null;
    distance: number;
};

export type EngineData = {
    velocity: number;
    distance: number;
};

export type DriveData = {
    success: boolean;
};

export type AppState = {
    [AppStateKeys.CARS]: Car[];
    [AppStateKeys.WINNERS]: Winner[];
    [AppStateKeys.ANIMATION]: AnimationFrame[];
    [AppStateKeys.WINNERS_DATA]: Car[];
    [AppStateKeys.SELECTED_CAR]: Car;
    [AppStateKeys.CARS_QUANTITY]: number;
    [AppStateKeys.WINNERS_QUANTITY]: number;
    [AppStateKeys.MAIN_PAGE]: Description;
    [AppStateKeys.GARAGE_PAGE]: number;
    [AppStateKeys.WINNERS_PAGE]: number;
    [AppStateKeys.ORDER_WINS]: Description.ASC | Description.DESC;
    [AppStateKeys.ORDER_TIME]: Description.ASC | Description.DESC;
    [AppStateKeys.SORT_TYPE]: Description.SORT_WINS | Description.SORT_TIME;
    [AppStateKeys.WINNER]: Array<RaceWinner>;
    [AppStateKeys.WINS_SORT_ACTIVE]: boolean;
    [AppStateKeys.TIME_SORT_ACTIVE]: boolean;
    [AppStateKeys.IS_UPDATE_ACTIVE]: boolean;
    [AppStateKeys.INPUT_DATA]: Input;
    [AppStateKeys.BUTTONS_STATE]: Buttons;
};

export type Paths = {
    garage: '/garage';
    winners: '/winners';
    engine: '/engine';
};

export type Constants = {
    baseURL: string;
    carsOnPage: number;
    winnersOnPage: number;
    carsToGenerate: number;
    brands: Array<string>;
    models: Array<string>;
    dialogDelay: number;
    resetRaceDelay: number;
    milliseconds: number;
};

export type QueryParameters = {
    key: string;
    value: number | string;
};

export type CarPayload = {
    name: string;
    color: string;
};

export type SortOrderType = Description.ASC | Description.DESC;

export type Operator = Description.INCREMENT | Description.DECREMENT;

export type ResponseObject = {
    success: boolean;
    carID: number;
    time: number;
};

export type Css_Classes = { [key: string]: string };

export type PaginationParameters = {
    container: ElementParameters;
    prevBtn: ElementParameters;
    nextBtn: ElementParameters;
};

export type CurrentPage = AppStateKeys.GARAGE_PAGE | AppStateKeys.WINNERS_PAGE;

export type ItemsTotal = AppStateKeys.CARS_QUANTITY | AppStateKeys.WINNERS_QUANTITY;

export type PageStateKeys = {
    currentPage: CurrentPage;
    itemsTotal: ItemsTotal;
};
