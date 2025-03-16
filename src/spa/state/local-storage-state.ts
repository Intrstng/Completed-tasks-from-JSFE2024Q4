import type { AppState, LocalStorageItem, LocalStorageStateInterface } from '../../types';
import { DecisionItem } from '../../types';

export default class LocalStorageState implements LocalStorageStateInterface {
    public values: AppState;
    private readonly accessKey: string;

    constructor(key: string) {
        this.accessKey = key;
        this.values = this.loadState();
        window.addEventListener('beforeunload', () => this.saveState());
    }

    public getField(key: string): string {
        return '';
        // const value = this.values[key];
        // return value ? JSON.stringify(value) : '';
    }

    public getState(): AppState {
        return this.values;
    }

    public setState(state: AppState): void {
        this.values = state;
        console.log(this.values);
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

    public setField(key: string, value: string, state: LocalStorageState): void {
        // this.values.set(key, value)

        const appState = {
            list: [],
            lastId: 3,
        };

        console.log('!!!!!!', state);
        try {
            // this.values[key.toLowerCase()] = value;
        } catch (error) {
            console.error('Failed to parse value for setField:', error);
        }
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
        // this.values = {
        //     list: [
        //         { id: '#1', title: 'rertert', weight: '32' },
        //         { id: '#3', title: '7777', weight: '7' },
        //         { id: '#4', title: '', weight: '' },
        //     ],
        //     lastId: 4,
        // };

        this.saveState();
        return this.values;
    }

    private saveState(): void {
        localStorage.setItem(this.accessKey, JSON.stringify(this.values));
    }
}

// import type { AppState, LocalStorageItem, LocalStorageStateInterface } from '../../types';
//
// export default class LocalStorageState implements LocalStorageStateInterface {
//     private values: Map<string, AppState>;
//     private readonly accessKey: string;
//
//     constructor(key: string) {
//         this.values = this.loadState();
//         this.accessKey = key;
//         window.addEventListener('beforeunload', () => this.saveState());
//     }
//
//     public getField(key: string): string {
//         const value = this.values.get(key);
//         return value ? JSON.stringify(value) : '';
//     }
//
//     public getLastId(key: string): string {
//         return ''
//         // const value = this.values.get(key);
//         // return value ? JSON.stringify(value) : '';
//     }
//
//     public setField(key: string, value: string, state: LocalStorageState): void {
//         // this.values.set(key, value);
//         console.log('!!!!!!', key, value)
//         try {
//             const parsedValue: AppState = JSON.parse(value);
//             this.values.set(key.toLowerCase(), parsedValue);
//         } catch (error) {
//             console.error('Failed to parse value for setField:', error);
//         }
//     }
//
//     private loadState(): Map<string, AppState> {
//         // const storageItem: string | null = localStorage.getItem(this.accessKey);
//         // return storageItem ? new Map<string, any>(Object.entries(JSON.parse(storageItem))) : new Map<string, any>();
//         const storageItem: string | null = localStorage.getItem(this.accessKey);
//         if (storageItem) {
//             try {
//                 const parsedItem: LocalStorageItem = JSON.parse(storageItem);
//                 return new Map<string, AppState>(Object.entries(parsedItem));
//             } catch (error) {
//                 console.error('Failed to parse localStorage item:', error);
//             }
//         }
//         return new Map<string, AppState>();
//     }
//
//     private saveState(): void {
//         const valuesObject: LocalStorageItem = {};
//         for (const [key, value] of this.values.entries()) {
//             valuesObject[key] = value;
//         }
//
//         localStorage.setItem(this.accessKey, JSON.stringify(valuesObject));
//     }
// }
