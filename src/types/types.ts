import type { AppStateKeys, Description, InputTypes, Location, LocationEvent } from './enums';
import type GarageView from '../spa/view/main/garage/garage-view';
import type WinnersView from '../spa/view/main/winners/winners-view';
import type CreatorElement from '../spa/util/creator-element';
import type { AnimationFrame, QueryParameters, TableRecord, Winner } from './interfaces';

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

export type ElementParameters = {
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

export type EventCB = ((event: Event) => void | Promise<void>) | null;

export type QueryCB = (queryParameters: QueryParameters[]) => string;

export type TableNameHeadCellCB = (headCellCreator: CreatorElement, columnName: Description) => void;

export type ToggleActiveButtonCB = (button: CreatorElement) => void;

export type CreateTableRecordsCB = (cars: Array<Car>, winners: Array<Winner>) => Array<TableRecord>;

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
