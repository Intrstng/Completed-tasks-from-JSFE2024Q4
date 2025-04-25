import type { InputTypes } from './enums';
import type ChatView from '../spa/view/main/chat/chat-view';
import type AboutView from '../spa/view/about/about-view';
import type LoginView from '../spa/view/login/login-view';
import type CreatorElement from '../spa/components/creator-element';

export type ElementParameters = {
    tag?: string;
    id?: string;
    classNames?: string[];
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

export type EventCB = ((event: Event) => void | Promise<void>) | null;

export type ToggleShowErrorMessageCB = (errorElement: CreatorElement, isShown: boolean) => void;

export type Css_Classes = Record<string, string>;
