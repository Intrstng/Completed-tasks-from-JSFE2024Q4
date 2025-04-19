import type { AppState, Constants, Paths } from '../../types';

export const PATHS: Paths = {
    login: '/login',
    main: '/main',
    about: '/about',
};

export const CONSTANTS: Constants = {
    baseURL: 'http://127.0.0.1:4000',
};

export const INITIAL_STATE: AppState = {
    isLogged: false
};
