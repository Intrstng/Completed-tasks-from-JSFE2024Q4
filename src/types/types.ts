import type { InputTypes, Location, LocationEvent } from './enums';
import ChatView from '../spa/view/main/chat/chat-view';
import type AboutView from '../spa/view/about/about-view';
import LoginView from '../spa/view/login/login-view';

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

export type ElementParameters = {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    textContent?: string;
    callback?: EventCB | null;
    type?: InputTypes | InputTypes.COLOR;
    placeholder?: string;
    title?: string;
    min?: string;
    max?: string;
    value?: string;
    required?: boolean;
    rows?: string;
    cols?: string;
    name?: string;
    autocomplete?: string;
};

export type DialogParameters = ElementParameters & {
    open: boolean;
};

export type ViewCommon = ChatView | AboutView | LoginView;

export type ButtonParameters = Pick<ElementParameters, 'id' | 'tag' | 'classNames' | 'textContent' | 'callback'>;

export type ButtonsCollection = Array<ButtonParameters>;

export type Callback = () => void;

export type EventCB = ((event: Event) => void | Promise<void>) | null;

export type QueryCB = (queryParameters: QueryParameters[]) => string;

export type Paths = {
    login: '/login';
    chat: '/chat';
    about: '/about';
};

export type QueryParameters = {
    key: string;
    value: number | string;
};

export type Css_Classes = { [key: string]: string };

export type ContactItem = {
    login: string;
    isLogined: boolean
};
