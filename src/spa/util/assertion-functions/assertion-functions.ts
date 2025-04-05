import { ButtonParameters, Callback, CallbackID, PopStateEventState } from '../../../types';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}

export function getCallbackWithID(buttonParameters: ButtonParameters, cb: CallbackID): Callback | void {
    const id: number | undefined = buttonParameters.id ? Number(buttonParameters.id) : undefined;
    if (id !== undefined) {
        return cb(id);
    }
    console.warn('ID is required');
}
