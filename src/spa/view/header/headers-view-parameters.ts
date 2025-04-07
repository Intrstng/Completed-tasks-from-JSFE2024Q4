import { CssClasses, Description, ElementParameters } from '../../../types';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: ['title'],
    title: 'Async Race',
    textContent: 'Async Race',
};

export const headerParameters: ElementParameters = {
    tag: 'header',
    classNames: [CssClasses.HEADER],
};

export const navigationParameters: ElementParameters = {
    tag: 'nav',
    classNames: [CssClasses.NAV],
    textContent: '',
    callback: null,
};

export const linkParameters: ElementParameters = {
    tag: 'a',
    classNames: [CssClasses.ITEM],
};

export const LinkNames = {
    GARAGE: Description.TO_GARAGE,
    WINNERS: Description.TO_WINNERS,
};

export const PagesNames = {
    GARAGE: Description.GARAGE,
    WINNERS: Description.WINNERS,
};
