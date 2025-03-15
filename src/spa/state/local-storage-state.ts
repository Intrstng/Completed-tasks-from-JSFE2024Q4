import type { AppState, LocalStorageItem, LocalStorageStateInterface } from '../../types';

export default class LocalStorageState implements LocalStorageStateInterface {
    private values: Map<string, AppState>;
    private readonly accessKey: string;

    constructor(key: string) {
        this.values = this.loadState();
        this.accessKey = key;
        window.addEventListener('beforeunload', () => this.saveState());
    }

    public getField(key: string): AppState | string | undefined {
        return this.values.has(key) ? this.values.get(key) : '';
    }

    public setField(key: string, value: string): void {
        // this.values.set(key, value);
        try {
            this.values.set(key, JSON.parse(value));
        } catch (error) {
            console.error('Failed to parse value for setField:', error);
        }
    }

    private loadState(): Map<string, AppState> {
        // const storageItem: string | null = localStorage.getItem(this.accessKey);
        // return storageItem ? new Map<string, any>(Object.entries(JSON.parse(storageItem))) : new Map<string, any>();
        const storageItem: string | null = localStorage.getItem(this.accessKey);
        if (storageItem) {
            try {
                const parsedItem: LocalStorageItem = JSON.parse(storageItem);
                return new Map<string, AppState>(Object.entries(parsedItem));
            } catch (error) {
                console.error('Failed to parse localStorage item:', error);
            }
        }
        return new Map<string, AppState>();
    }

    private saveState(): void {
        const valuesObject: LocalStorageItem = {};
        for (const [key, value] of this.values.entries()) {
            valuesObject[key] = value;
        }

        localStorage.setItem(this.accessKey, JSON.stringify(valuesObject));
    }
}
