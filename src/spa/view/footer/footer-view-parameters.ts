import type { ElementParameters } from '../../../types';
import { CSS_FOOTER } from './footer-classes';
import { COPYRIGHT } from './footer-constants';

export const footerParameters: ElementParameters = {
    tag: 'footer',
    classNames: [CSS_FOOTER.CONTAINER, CSS_FOOTER.FOOTER],
};

export const copyrightParameters: ElementParameters = {
    tag: 'h3',
    classNames: [CSS_FOOTER.COPYRIGHT],
    title: COPYRIGHT,
    textContent: COPYRIGHT,
};

export const gitLinkParameters: ElementParameters = {
    tag: 'a',
    classNames: [CSS_FOOTER.LINK, CSS_FOOTER.GIT],
};

export const rsLinkParameters: ElementParameters = {
    tag: 'a',
    classNames: [CSS_FOOTER.LINK, CSS_FOOTER.RS],
};
