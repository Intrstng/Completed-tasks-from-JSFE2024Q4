import { AppStateKeys } from '../../types';
import type { AppState } from './types';

export const INITIAL_STATE: AppState = {
    [AppStateKeys.IS_LOGGED]: false,
    [AppStateKeys.CURRENT_USER_NAME]: '',
    [AppStateKeys.CURRENT_USER_PASS]: '',
    [AppStateKeys.CURRENT_CONTACT]: {
        login: '',
        isLogined: false,
    },
    [AppStateKeys.MESSAGE_HISTORY]: [],
    [AppStateKeys.CURRENT_MESSAGE]: '',
    [AppStateKeys.MESSAGE_COUNTER]: {},
    [AppStateKeys.ONLINE_USERS]: [],
    [AppStateKeys.OFFLINE_USERS]: [],
};
