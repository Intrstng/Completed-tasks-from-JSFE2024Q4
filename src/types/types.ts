import type ChatView from '../spa/view/main/chat/chat-view';
import type AboutView from '../spa/view/about/about-view';
import type LoginView from '../spa/view/login/login-view';
import type CreatorElement from '../spa/components/creator-element';

export type ViewCommon = ChatView | AboutView | LoginView;

export type EventCB = ((event: Event) => void | Promise<void>) | null;

export type ToggleShowErrorMessageCB = (errorElement: CreatorElement, isShown: boolean) => void;

export type Css_Classes = Record<string, string>;
