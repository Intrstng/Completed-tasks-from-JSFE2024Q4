import type { AppState } from './types';
import type LocalStorageState from '../spa/state/local-storage-state';

export type LocalStorageStateInterface = {
    getField(key: string): AppState | string | undefined;
    setField(key: string, value: string, state: LocalStorageState): void;
};
