import type { AppState, AppStateKeys } from '../../types';
import { INITIAL_STATE } from './initial-state';

export default class SessionStorageState {
    public values: AppState;
    private readonly accessKey: string;

    constructor(key: string) {
        this.accessKey = key;
        this.values = this.loadState();
        window.addEventListener('beforeunload', () => this.saveState());
    }

    public getField(key: AppStateKeys): AppState[AppStateKeys] {
        return this.values[key];
    }

    public getState(): AppState {
        return this.values;
    }

    public setState(state: AppState): void {
        this.values = state;
    }

    public updatePropertyInState(key: string, value: string | number | boolean): void {
        const updatedState: AppState = {
            ...this.values,
            [key]: value,
        };
        this.setState(updatedState);
    }

    // public updateInputFieldStateProperty(key: string, value: string): void {
    //     const updatedState: AppState = {
    //         ...this.values,
    //         inputData: {
    //             ...this.values.inputData,
    //             [key]: value,
    //         },
    //     };
    //     this.setState(updatedState);
    // }

    private loadState(): AppState {
        const storageItem: string | null = sessionStorage.getItem(this.accessKey);
        if (storageItem) {
            try {
                return JSON.parse(storageItem);
            } catch (error) {
                console.error('Failed to parse localStorage item:', error);
            }
        }

        this.values = INITIAL_STATE;

        this.saveState();
        return this.values;
    }

    private saveState(): void {
        sessionStorage.setItem(this.accessKey, JSON.stringify(this.values));
    }
}
