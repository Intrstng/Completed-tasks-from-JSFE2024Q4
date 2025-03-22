import type { Location, LocationEvent } from './enums';
import type NotFoundView from '../spa/view/main/not-found/not-found-view';
import type IndexView from '../spa/view/main/index/index-view';
import type SelectorView from '../spa/view/main/selector/selector-view';
import type { InputTypes } from './enums';
import type CreatorElement from '../spa/util/creator-element';
import type InputFieldCreator from '../spa/util/input-field/input-field-creator';
import type ButtonCreator from '../spa/util/button/button-creator';

export type AppState = {
    list: Array<DecisionItem>;
    lastId: number;
};

export type SelectorState = {
    isMute: boolean;
    duration: string | undefined;
};

export type DecisionItem = {
    id: string;
    title: string;
    weight: string;
};

export type AppStateKey = keyof AppState;

export type SelectorStateKey = keyof SelectorState;

export type JsonData = Pick<AppState, 'list' | 'lastId'>;

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

export type DialogParameters = {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    open?: boolean;
    content?: Array<ElementParameters>;
    callback?: ((event: Event) => void) | null;
};

export type CanvasParameters = Pick<ElementParameters, 'id' | 'tag' | 'classNames' | 'textContent'> & {
    width: string;
    height: string;
};

export type ButtonParameters = Pick<ElementParameters, 'id' | 'tag' | 'classNames' | 'textContent' | 'callback'>;

export type ButtonsCollection = Array<ButtonParameters>;

export type DialogContentParameters = ElementParameters | ButtonParameters;

export type DialogInnerElement = CreatorElement | InputFieldCreator | ButtonCreator;

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

export type ViewCommon = IndexView | SelectorView | NotFoundView;

export type EventCallback = ((event: Event) => void) | null;

export type Callback = () => void;

export type LoadDataCB = (data: JsonData) => void;

export type RouterCB = (parameters: RequestParameters) => void;

export type CallbackDialogSubmit = ((value: AppState) => void) | undefined;

export type PopStateEventState = {
    url?: string;
};

export type LocalStorageItem = {
    [key: string]: AppState;
};
