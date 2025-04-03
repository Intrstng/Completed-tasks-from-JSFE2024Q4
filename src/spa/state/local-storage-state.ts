import type { ElementParameters } from '../../types';

export default class LocalStorageState {
    public values: any;
    private readonly accessKey: string;

    constructor(key: string) {
        this.accessKey = key;
        this.values = this.loadState();
        window.addEventListener('beforeunload', () => this.saveState());
    }

    public getField(key: any): Array<any> | number {
        return this.values[key];
    }

    public getState(): any {
        return this.values;
    }

    public setState(state: any): void {
        this.values = state;
    }

    // public getLastId(): number {
    //   return this.values.lastId || 1;
    // }

    public getList(): Array<any> {
        return this.values.list;
    }

    public incrementLastId(): void {
        this.values.lastId += 1;
    }

    public setField(id: string, value: string, state: LocalStorageState, parameters: ElementParameters): void {
        const currentState = state.getState();
        let newState: any;

        // if (parameters.placeholder === InputDescription.TITLE) {
        //   newState = {
        //     ...currentState,
        //     list: currentState.list.map(item => (item.id === id ? { ...item, title: value } : item)),
        //   };
        // } else if (parameters.placeholder === InputDescription.WEIGHT) {
        //   newState = {
        //     ...currentState,
        //     list: currentState.list.map(item => (item.id === id ? { ...item, weight: value } : item)),
        //   };
        // } else {
        newState = { ...currentState };
        // }
        this.setState(newState);
    }

    private loadState(): any {
        const storageItem: string | null = localStorage.getItem(this.accessKey);
        if (storageItem) {
            try {
                // const parsedData: unknown = JSON.parse(storageItem);
                //
                // assertIsDecisionJsonData(parsedData);
                // return parsedData;
                return JSON.parse(storageItem);
            } catch (error) {
                console.error('Failed to parse localStorage item:', error);
            }
        }

        this.values = { list: [{ id: '#1', title: '', weight: '' }], lastId: 1 };

        this.saveState();
        return this.values;
    }

    private saveState(): void {
        localStorage.setItem(this.accessKey, JSON.stringify(this.values));
    }
}
