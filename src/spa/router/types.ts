import type { Location, LocationEvent } from '../../types';

export type Route = {
    path: string;
    callback: () => Promise<void>;
};

export type RequestParameters = {
    path: string;
};

export type RouterCB = (parameters: RequestParameters) => void;

export type RouterParameters = {
    nameEvent: LocationEvent;
    locationField: Location;
};

export type PopStateEventState = {
    url?: string;
};

export type Paths = {
    login: '/login';
    chat: '/chat';
    about: '/about';
};

export type AuthedPathRoute = {
    path: string;
    callback: () => Promise<void>;
};
