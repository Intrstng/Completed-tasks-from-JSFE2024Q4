import type { Pages } from '../../../types';
import { LinkNames } from '../../../constants/header-constants';
import type { PopStateEventState } from '../../router/types';
import type { Responses, SocketMessageType } from '../../api/types';

export function isValidState(state: unknown): state is PopStateEventState {
    return typeof state === 'object' && state !== null && 'url' in state;
}

export function isValidPage(value: unknown): value is Pages {
    return value === LinkNames.LOGIN || value === LinkNames.ABOUT;
}

export function isMessageOfType<T extends SocketMessageType>(
    message: Responses,
    type: T
): message is Extract<Responses, { type: T }> {
    return message.type === type;
}
