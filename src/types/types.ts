import { AppStateKeys, Description, InputTypes, Location, LocationEvent } from './enums';
import GarageView from '../spa/view/main/garage/garage-view';
import WinnersView from '../spa/view/main/winners/winners-view';
import { stringifyLocal } from 'mini-css-extract-plugin/types/utils';

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

export type EventCallback = ((event: Event) => void) | null;

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

export type ViewCommon = GarageView | WinnersView;

export type TableRecord = {
    wins: number;
    time: number;
    name: string;
    color: string;
};

export type ButtonParameters = Pick<ElementParameters, 'id' | 'tag' | 'classNames' | 'textContent' | 'callback'>;

export type ButtonsCollection = Array<ButtonParameters>;

export type OrderButtonParametersWithCB = {
    ascButtonParametersWithCB: ElementParameters | null;
    descButtonParametersWithCB: ElementParameters | null;
};

export type Callback = () => void;

export type CallbackID = (id: number) => void;

export type CreateButtonCB = Callback | CallbackID;

export type Car = {
    id: number;
    name: string;
    color: string;
};

export type RaceWinner = {
    name: string;
    time: string;
};

export type Winner = {
    id: number;
    wins: number;
    time: number;
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
    animationID: number | null;
    distance: number;
};

export type EngineData = {
    velocity: number;
    distance: number;
};

export type AppState = {
    [AppStateKeys.CARS]: Car[];
    [AppStateKeys.WINNERS]: Winner[];
    [AppStateKeys.ANIMATION]: Animation[];
    [AppStateKeys.WINNERS_DATA]: Car[];
    [AppStateKeys.SELECTED_CAR]: Car;
    [AppStateKeys.CARS_QUANTITY]: number;
    [AppStateKeys.WINNERS_QUANTITY]: number;
    [AppStateKeys.MAIN_PAGE]: Description;
    [AppStateKeys.GARAGE_PAGE]: number;
    [AppStateKeys.WINNERS_PAGE]: number;
    [AppStateKeys.ORDER_WINS]: Description;
    [AppStateKeys.ORDER_TIME]: Description;
    [AppStateKeys.SORT_TYPE]: string;
    [AppStateKeys.WINNER]: RaceWinner;
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
