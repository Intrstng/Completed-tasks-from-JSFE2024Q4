import type { ElementParameters } from '../../../types';
import { AppInfo } from '../../../types';
import { CSS_HEADER } from './header-classes';
import { CHAT_CONSTANTS } from '../../../constants/chat-view-constants';
import { CSS_LOGIN } from '../login/login-classes';
import { BUTTON_CONSTANTS } from '../../../constants/button-constants';
import { CSS_BUTTON } from '../../components/button/button-classes';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: [CSS_HEADER.TITLE],
    title: AppInfo.NAME,
    textContent: AppInfo.NAME,
};

export const headerParameters: ElementParameters = {
    tag: 'header',
    classNames: [CSS_HEADER.HEADER, CSS_HEADER.CONTAINER],
};

export const userContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_HEADER.USER_CONTAINER],
};

export const userTitleParameters: ElementParameters = {
    tag: 'h2',
    textContent: CHAT_CONSTANTS.USER_TITLE,
    classNames: [CSS_HEADER.USER_TITLE],
};

export const userNameParameters: ElementParameters = {
    tag: 'span',
    classNames: [CSS_HEADER.USER_NAME],
};

export const navigationParameters: ElementParameters = {
    tag: 'nav',
    classNames: [CSS_HEADER.NAV],
    textContent: '',
    callback: null,
};

export const linkParameters: ElementParameters = {
    tag: 'a',
    classNames: [CSS_HEADER.ITEM],
};

export const buttonNavLogoutParameters: ElementParameters = {
    tag: 'button',
    textContent: BUTTON_CONSTANTS.buttonLogout,
    classNames: [CSS_BUTTON.BUTTON, CSS_LOGIN.BUTTON_LOGOUT],
};
