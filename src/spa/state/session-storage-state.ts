import type { AppStateKeys } from '../../types';
import { INITIAL_STATE } from './initial-state';
import type { AppState, MessageCounter, SubscriberCallback } from './types';
import type { Message, SocketMessageType, User } from '../api/types';
import { DOMEvents } from '../../types';

export default class SessionStorageState {
    public values: AppState;
    public subscribers: Map<SocketMessageType, SubscriberCallback>;
    private readonly accessKey: string;

    constructor(key: string) {
        this.accessKey = key;
        this.values = this.loadState();
        this.subscribers = new Map();
        globalThis.addEventListener(DOMEvents.BEFOREUNLOAD, () => this.saveState());
    }

    public subscribe(key: SocketMessageType, callback: SubscriberCallback): void {
        this.subscribers.set(key, callback);
    }

    public unsubscribe(key: SocketMessageType): void {
        this.subscribers.delete(key);
    }

    public notifySubscribers(key?: SocketMessageType, extraParameter?: string): void {
        if (key) {
            const callback = this.subscribers.get(key);
            if (callback) {
                callback(this.values, extraParameter);
            }
        } else {
            this.subscribers.forEach(callback => callback(this.values, extraParameter));
        }
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

    public updatePropertyInState(
        key: string,
        value: User[] | Message[] | MessageCounter | string | number | boolean
    ): void {
        const updatedState: AppState = {
            ...this.values,
            [key]: value,
        };
        this.setState(updatedState);
    }

    public resetState(): void {
        this.values = INITIAL_STATE;
        this.saveState();
    }

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
