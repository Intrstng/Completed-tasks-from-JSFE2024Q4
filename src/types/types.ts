import type ChatView from '../spa/view/main/chat/chat-view';
import type AboutView from '../spa/view/about/about-view';
import type LoginView from '../spa/view/login/login-view';
import type CreatorElement from '../spa/components/creator-element';
import type { Responses, SocketMessageType } from '../spa/api/types';

export type ViewCommon = ChatView | AboutView | LoginView;

export type EventCB = ((event: Event) => void | Promise<void>) | null;

export type ToggleShowErrorMessageCB = (errorElement: CreatorElement, isShown: boolean) => void;

export type Css_Classes = Record<string, string>;

type MessageHandler<T extends SocketMessageType> = (message: Extract<Responses, { type: T }>) => void | Promise<void>;

export type MessageHandlers = {
    [K in SocketMessageType]?: MessageHandler<K>;
};
