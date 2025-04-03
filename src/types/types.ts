import { InputTypes, Location, LocationEvent } from './enums';
import GarageView from '../spa/view/main/garage/garage-view';
import WinnersView from '../spa/view/main/winners/winners-view';

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
    callback?: ((event: Event) => void) | null;
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

export type OrderButtonParametersWithCB = {
    ascButtonParametersWithCB: ElementParameters | null;
    descButtonParametersWithCB: ElementParameters | null;
};
