import type { AppStateKeys, Description } from './enums';
import type { CurrentPage, EventCB, ItemsTotal } from './types';
import type { InputTypes, Location, LocationEvent, Pages } from './enums';

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export interface TableRecord {
    wins: number;
    time: number;
    name: string;
    color: string;
}

export interface Input {
    createName: string;
    createColor: string;
    updateName: string;
    updateColor: string;
}

export interface Buttons {
    start: boolean;
    reset: boolean;
}

export interface AnimateCarRacingCB {
    (carID: number, car: SVGElement, duration: number, trackDistance: number): AnimationFrame;
}

export interface AnimationFrame {
    carID: number;
    animationID: number | null;
    distance: number;
}

export interface EngineData {
    velocity: number;
    distance: number;
}

export interface DriveData {
    success: boolean;
}

export interface Car {
    id: number;
    name: string;
    color: string;
}

export interface RaceWinner {
    carID: number;
    name: string;
    time: string;
}

export interface AppState {
    [AppStateKeys.CARS]: Car[];
    [AppStateKeys.WINNERS]: Winner[];
    [AppStateKeys.ANIMATION]: AnimationFrame[];
    [AppStateKeys.WINNERS_DATA]: Car[];
    [AppStateKeys.SELECTED_CAR]: Car;
    [AppStateKeys.CARS_QUANTITY]: number;
    [AppStateKeys.WINNERS_QUANTITY]: number;
    [AppStateKeys.MAIN_PAGE]: string;
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
}

export interface Constants {
    baseURL: string;
    carsOnPage: number;
    winnersOnPage: number;
    carsToGenerate: number;
    brands: Array<string>;
    models: Array<string>;
    dialogDelay: number;
    resetRaceDelay: number;
    milliseconds: number;
    brandType: string;
}

export interface QueryParameters {
    key: string;
    value: number | string;
}

export interface CarPayload {
    name: string;
    color: string;
}

export interface ResponseObject {
    success: boolean;
    carID: number;
    time: number;
}

export interface PaginationParameters {
    container: ElementParameters;
    prevBtn: ElementParameters;
    nextBtn: ElementParameters;
}

export interface PageStateKeys {
    currentPage: CurrentPage;
    itemsTotal: ItemsTotal;
}

export interface OrderButtonParametersWithCB {
    ascButtonParametersWithCB: ElementParameters | null;
    descButtonParametersWithCB: ElementParameters | null;
}

export interface RouterParameters {
    nameEvent: LocationEvent;
    locationField: Location;
}

export interface PopStateEventState {
    url?: string;
}

export interface ElementParameters {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    textContent?: string;
    callback?: EventCB | null;
    type?: InputTypes | InputTypes.COLOR;
    placeholder?: string;
    title?: string;
    min?: string;
    max?: string;
    value?: string;
    required?: boolean;
    rows?: string;
    cols?: string;
}

export interface DialogParameters extends ElementParameters {
    open: boolean;
}

export interface Route {
    path: string;
    callback: () => Promise<void>;
}

export interface RequestParameters {
    path: string;
}

export interface PageParameters {
    name: Pages;
    callback: () => void;
}
