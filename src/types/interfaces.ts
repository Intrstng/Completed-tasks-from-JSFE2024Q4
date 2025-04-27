import type { AppStateKey } from './types';
import type LocalStorageState from '../spa/state/local-storage-state';
import type { InputTypes, Location, LocationEvent } from './enums';

export interface LocalStorageStateInterface {
    getField(key: AppStateKey): Array<DecisionItem> | number | boolean | string | undefined;
    setField(key: string, value: string, state: LocalStorageState, parameters: ElementParameters): void;
}

export interface AppState {
    list: Array<DecisionItem>;
    lastId: number;
    isMute: boolean;
    duration: string | undefined;
}

export interface DecisionItem {
    id: string;
    title: string;
    weight: string;
}

export interface ElementParameters {
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
}

export interface DialogParameters {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    open?: boolean;
    content?: Array<ElementParameters>;
    callback?: ((event: Event) => void) | null;
}

export interface RequestParameters {
    path: string;
}

export interface RouterParameters {
    nameEvent: LocationEvent;
    locationField: Location;
}

export interface Route {
    path: string;
    callback: () => Promise<void>;
}

export interface PopStateEventState {
    url?: string;
}

export interface PathData {
    fill?: string;
    d: string;
}
