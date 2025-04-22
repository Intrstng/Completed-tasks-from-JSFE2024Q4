import type { AppState, Constants, Paths } from '../../types';
import { AppStateKeys } from '../../types';

export const PATHS: Paths = {
    login: '/login',
    chat: '/chat',
    about: '/about',
};

const PORT: string = '4000';

export const CONSTANTS: Constants = {
    baseURL: `http://127.0.0.1:${PORT}`,
    wsURL: `ws://127.0.0.1:${PORT}`,
    userNameLength: 10
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
