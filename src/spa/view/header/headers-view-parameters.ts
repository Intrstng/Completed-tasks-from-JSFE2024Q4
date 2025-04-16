import type { ElementParameters } from '../../../types';
import { Description } from '../../../types';
import { CSS_HEADER } from './header-classes';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: [CSS_HEADER.TITLE],
    title: Description.APP_NAME,
    textContent: Description.APP_NAME,
};

export const headerParameters: ElementParameters = {
    tag: 'header',
    classNames: [CSS_HEADER.HEADER, CSS_HEADER.CONTAINER],
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

export const LinkNames = {
    GARAGE: Description.TO_GARAGE,
    WINNERS: Description.TO_WINNERS,
};

export const PagesNames = {
    GARAGE: Description.GARAGE,
    WINNERS: Description.WINNERS,
};
