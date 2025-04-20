import type { AppState, Constants, Paths } from '../../types';
import { AppStateKeys } from '../../types';

export const PATHS: Paths = {
    login: '/login',
    main: '/main',
    about: '/about',
};

export const CONSTANTS: Constants = {
    baseURL: 'http://127.0.0.1:4000',
};

export const INITIAL_STATE: AppState = {
    [AppStateKeys.IS_LOGGED]: false,
    [AppStateKeys.CURRENT_USER_NAME]: 'user'
};
