import type { AppStateKeys } from '../../types';
import { INITIAL_STATE } from './initial-state';
import type { AppState, MessageCounter, SubscriberCallback } from './types';
import type { Message, SocketMessageType, User } from '../api/types';

export class StateService {
    public values: AppState = INITIAL_STATE;
    public subscribers = new Map<SocketMessageType, SubscriberCallback>();

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
    }
}
