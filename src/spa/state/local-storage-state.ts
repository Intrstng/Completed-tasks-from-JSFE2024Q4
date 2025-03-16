import type { AppState, AppStateKey, LocalStorageStateInterface } from '../../types';
import { DecisionItem, ElementParameters, InputDescription } from '../../types';

export default class LocalStorageState implements LocalStorageStateInterface {
    public values: AppState;
    private readonly accessKey: string;

    constructor(key: string) {
        this.accessKey = key;
        this.values = this.loadState();
        window.addEventListener('beforeunload', () => this.saveState());
    }

    public getField(key: AppStateKey): Array<DecisionItem> | number {
        return this.values[key];
    }

    public getState(): AppState {
        return this.values;
    }

    public setState(state: AppState): void {
        this.values = state;
    }

    public getLastId(): number {
        return this.values.lastId || 1;
    }

    public getList(): Array<DecisionItem> {
        return this.values.list;
    }

    public incrementLastId(): void {
        this.values.lastId += 1;
    }

    public setField(id: string, value: string, state: LocalStorageState, parameters: ElementParameters): void {
        let currentState = state.getState();
        let newState: AppState;

        if (parameters.placeholder === InputDescription.TITLE) {
            newState = {
                ...currentState,
                list: currentState.list.map(item => (item.id === id ? { ...item, title: value } : item)),
            };
        } else if (parameters.placeholder === InputDescription.WEIGHT) {
            newState = {
                ...currentState,
                list: currentState.list.map(item => (item.id === id ? { ...item, weight: value } : item)),
            };
        } else {
            newState = { ...currentState };
        }
        this.setState(newState);
    }

    private loadState(): AppState {
        const storageItem: string | null = localStorage.getItem(this.accessKey);
        if (storageItem) {
            try {
                return JSON.parse(storageItem);
            } catch (error) {
                console.error('Failed to parse localStorage item:', error);
            }
        }

        this.values = {
            list: [],
            lastId: 0,
        };

        this.saveState();
        return this.values;
    }

    private saveState(): void {
        localStorage.setItem(this.accessKey, JSON.stringify(this.values));
    }
}
