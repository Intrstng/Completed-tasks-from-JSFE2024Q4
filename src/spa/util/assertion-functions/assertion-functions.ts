import { PopStateEventState } from '../../../types';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}
