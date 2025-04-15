import { CssClasses, Description, ElementParameters } from '../../../types';
import { CSS_HEADER } from './header-classes';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: ['title'],
    title: 'Async Race',
    textContent: 'Async Race',
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
