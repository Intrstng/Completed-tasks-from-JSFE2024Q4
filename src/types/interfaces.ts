import type { AppState } from './types';

export type LocalStorageStateInterface = {
    getField(key: string): AppState | string | undefined;
    setField(key: string, value: string): void;
};
