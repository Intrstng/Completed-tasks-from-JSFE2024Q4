import type { AppStateKey } from './types';
import { DecisionItem, ElementParameters } from './types';
import type LocalStorageState from '../spa/state/local-storage-state';

export type LocalStorageStateInterface = {
    getField(key: AppStateKey): Array<DecisionItem> | number;
    setField(key: string, value: string, state: LocalStorageState, parameters: ElementParameters): void;
};

export interface PathData {
    fill?: string;
    d: string;
}
