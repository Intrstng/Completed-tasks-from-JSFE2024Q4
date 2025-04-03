export type LocalStorageStateInterface = {
    getField(key: any): Array<any> | number;
    setField(key: string, value: string, state: any, parameters: any): void;
};
