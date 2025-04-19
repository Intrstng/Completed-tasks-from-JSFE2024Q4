import type { Pages, PopStateEventState, } from '../../../types';
import { LinkNames } from '../../view/header/header-constants';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}

export function isValidPage(value: unknown): value is Pages {
    return value === LinkNames.CHAT || value === LinkNames.LOGIN || value === LinkNames.ABOUT;
}
