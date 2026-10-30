import type { DecisionItem, JsonData, PopStateEventState } from '../../../types';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}

export function isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null;
}

export function isDecisionItem(item: unknown): item is DecisionItem {
    return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        typeof item.id === 'string' &&
        'title' in item &&
        typeof item.title === 'string' &&
        'weight' in item &&
        typeof item.weight === 'string'
    );
}

export function assertIsDecisionJsonData(data: unknown): asserts data is JsonData {
    if (!isObject(data)) {
        throw new Error('Parsed data is not an object.');
    }

    if (!('list' in data) || !Array.isArray(data.list) || !('lastId' in data) || typeof data.lastId !== 'number') {
        throw new Error('Invalid or missing properties in JSON.');
    }

    for (const item of data.list) {
        if (!isDecisionItem(item)) {
            throw new Error('Invalid item in "list" array.');
        }
    }
}
