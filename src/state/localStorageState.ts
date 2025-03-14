import type { LocalStorageItem, LocalStorageStateInterface } from '../types';

export default class LocalStorageState implements LocalStorageStateInterface {
    private values: any;
    private readonly accessKey: string;

    constructor(key: string) {
        this.values = this.loadState();
        this.accessKey = key;
        window.addEventListener('beforeunload', () => this.saveState());
    }

    getField(key: string): string {
        return this.values.has(key) ? this.values.get(key) : '';
    }

    setField(key: string, value: string): void {
        this.values.set(key, value);
    }

    private loadState(): Map<string, any> {
        const storageItem: string | null = localStorage.getItem(this.accessKey);
        return storageItem ? new Map<string, any>(Object.entries(JSON.parse(storageItem))) : new Map<string, any>();
    }

    private saveState(): void {
        const valuesObject: LocalStorageItem = {};
        for (const [key, value] of this.values.entries()) {
            valuesObject[key] = value;
        }

        localStorage.setItem(this.accessKey, JSON.stringify(valuesObject));
    }
}
