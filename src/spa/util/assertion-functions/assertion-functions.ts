import type {
    ButtonParameters,
    Callback,
    CallbackID,
    Car,
    DriveData,
    EngineData,
    PopStateEventState,
    Winner,
    Pages,
    ToggleButtonActiveClassCB,
} from '../../../types';
import { Description } from '../../../types';
import CreatorElement from '../creator-element';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}

export function getCallbackWithID(buttonParameters: ButtonParameters, callback: CallbackID): Callback | void {
    const id: number | undefined = buttonParameters.id ? Number(buttonParameters.id) : undefined;
    if (id !== undefined) {
        return callback(id);
    }
    console.warn('ID is required');
}

export function isCarItem(item: unknown): item is Car {
    return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        typeof item.id === 'number' &&
        'name' in item &&
        typeof item.name === 'string' &&
        'color' in item &&
        typeof item.color === 'string'
    );
}

export function isCarArray(data: unknown): data is Car[] {
    return Array.isArray(data) && data.every(item => isCarItem(item));
}

export function isEngineItem(item: unknown): item is EngineData {
    return (
        typeof item === 'object' &&
        item !== null &&
        'velocity' in item &&
        typeof item.velocity === 'number' &&
        'distance' in item &&
        typeof item.distance === 'number'
    );
}

export function isDriveItem(item: unknown): item is DriveData {
    return typeof item === 'object' && item !== null && 'success' in item && typeof item.success === 'boolean';
}

export function isWinnerItem(item: unknown): item is Winner {
    return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        typeof item.id === 'number' &&
        'wins' in item &&
        typeof item.wins === 'number' &&
        'time' in item &&
        typeof item.time === 'number'
    );
}

export function isWinnerArray(data: unknown): data is Winner[] {
    return Array.isArray(data) && data.every(item => isWinnerItem(item));
}

export function isValidPage(value: unknown): value is Pages {
    return value === Description.TO_GARAGE || value === Description.TO_WINNERS;
}

export function toggleButtonActiveClassAssertion(
    toggleCB: ToggleButtonActiveClassCB,
    button: CreatorElement | null
): void {
    if (toggleCB && button && button instanceof CreatorElement) {
        toggleCB(button);
    }
}
