export type LocalStorageStateInterface = {
    getField(key: string): string;
    setField(key: string, value: string): void;
};
