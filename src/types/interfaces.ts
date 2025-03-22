import type { AppStateKey } from './types';
import type { DecisionItem, ElementParameters } from './types';
import type LocalStorageState from '../spa/state/local-storage-state';

export type LocalStorageStateInterface = {
    getField(key: AppStateKey): Array<DecisionItem> | number;
    setField(key: string, value: string, state: LocalStorageState, parameters: ElementParameters): void;
};

export type PathData = {
    fill?: string;
    d: string;
};
