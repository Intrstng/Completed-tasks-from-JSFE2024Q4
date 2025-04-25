import type { Pages } from '../../../types';
import { LinkNames } from '../../../constants/header-constants';
import type { PopStateEventState } from '../../router/types';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}

export function isValidPage(value: unknown): value is Pages {
    return value === LinkNames.LOGIN || value === LinkNames.ABOUT;
}
