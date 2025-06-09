import type { AppStateKeys, Description } from './enums';
import type GarageView from '../spa/view/main/garage/garage-view';
import type WinnersView from '../spa/view/main/winners/winners-view';
import type CreatorElement from '../spa/util/creator-element';
import type {
    Car,
    ElementParameters,
    QueryParameters,
    RaceWinner,
    RequestParameters,
    TableRecord,
    Winner,
} from './interfaces';

export type RouterCB = (parameters: RequestParameters) => void;

export type ViewCommon = GarageView | WinnersView;

export type ButtonParameters = Pick<ElementParameters, 'id' | 'tag' | 'classNames' | 'textContent' | 'callback'>;

export type ButtonsCollection = Array<ButtonParameters>;

export type Callback = () => void;

export type CallbackID = (id: number) => void;

export type EventCB = ((event: Event) => void | Promise<void>) | null;

export type QueryCB = (queryParameters: QueryParameters[]) => string;

export type TableNameHeadCellCB = (headCellCreator: CreatorElement, columnName: Description) => void;

export type ToggleActiveButtonCB = (button: CreatorElement) => void;

export type CreateTableRecordsCB = (cars: Array<Car>, winners: Array<Winner>) => Array<TableRecord>;

export type ToggleButtonActiveClassCB = (button: CreatorElement) => void;

export type RaceWinnerMessage = Omit<RaceWinner, 'name'>;

export type SortOrderType = Description.ASC | Description.DESC;

export type Operator = Description.INCREMENT | Description.DECREMENT;

export type Css_Classes = { [key: string]: string };

export type CurrentPage = AppStateKeys.GARAGE_PAGE | AppStateKeys.WINNERS_PAGE;

export type ItemsTotal = AppStateKeys.CARS_QUANTITY | AppStateKeys.WINNERS_QUANTITY;
