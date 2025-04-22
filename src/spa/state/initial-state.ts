import type { AppState, Paths } from '../../types';
import { AppStateKeys } from '../../types';

export const PATHS: Paths = {
    login: '/login',
    chat: '/chat',
    about: '/about',
};

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
};
