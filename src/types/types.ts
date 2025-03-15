import type { Location, LocationEvent } from './enums';
import type NotFoundView from '../spa/view/main/not-found/not-found-view';
import type IndexView from '../spa/view/main/index/index-view';
import type SelectorView from '../spa/view/main/selector/selector-view';

export type LocalStorageItem = {
    [key: string]: AppState;
};

export type AppState = {
    isTurning: boolean;
    mute: boolean;
    list: Array<DecisionItem>;
    lastId: string;
};

export type JsonData = Pick<AppState, 'list' | 'lastId'>;

export type DecisionItem = {
    id: string;
    title: string;
    weight: string;
};

export type InputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export type ElementParameters = {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    textContent?: string;
    callback?: (() => void) | null;
    hasLabel?: boolean;
    type?: InputTypes;
    placeholder?: string;
};

export type RequestParameters = {
    path: string;
};

export type RouterParameters = {
    nameEvent: LocationEvent;
    locationField: Location;
};

export type Route = {
    path: string;
    callback: () => Promise<void>;
};

export type HistoryState = {
    url?: string;
};

export type ViewCommon = IndexView | SelectorView | NotFoundView;

export type Callback = ((event: Event) => void) | null;

export type LoadDataCB = (data: JsonData) => void;

export type RouterCB = (parameters: RequestParameters) => void;
