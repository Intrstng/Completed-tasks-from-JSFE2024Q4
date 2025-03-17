import { FieldKeys, SelectorState, SelectorStateKey } from '../../types';
import { inputDurationParameters } from '../view/main/index/index-view-elements-parameters';

export default class LocalStorageSelector {
    public values: SelectorState;
    private readonly accessKey: string;

    constructor(key: string) {
        this.accessKey = key;
        this.values = this.loadState();
        window.addEventListener('beforeunload', () => this.saveState());
    }

    public getField(key: SelectorStateKey): boolean | string | undefined {
        return this.values[key];
    }

    public getState(): SelectorState {
        return this.values;
    }

    public setState(state: SelectorState): void {
        this.values = state;
    }

    public setField(key: FieldKeys, value: boolean | string): void {
        let currentState = this.values;
        let newState: SelectorState = { ...currentState, [key]: value };
        this.setState(newState);
    }

    private loadState(): SelectorState {
        const selectorStorageItem: string | null = localStorage.getItem(this.accessKey);
        if (selectorStorageItem) {
            try {
                return JSON.parse(selectorStorageItem);
            } catch (error) {
                console.error('Failed to parse selector localStorage item:', error);
            }
        }

        this.values = {
            isMute: false,
            duration: inputDurationParameters.value,
        };

        this.saveState();
        return this.values;
    }

    private saveState(): void {
        localStorage.setItem(this.accessKey, JSON.stringify(this.values));
    }
}
