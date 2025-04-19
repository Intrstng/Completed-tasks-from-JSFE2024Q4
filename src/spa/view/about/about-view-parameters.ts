import type { ElementParameters } from '../../../types';
import { CSS_ABOUT } from './about-classes';
import { aboutContent } from './about-constants';
import { CSS_BUTTON } from '../../util/button/button-classes';
import { BUTTON_CONSTANTS } from '../../util/button/button-parameters/button-constants';

export const aboutParameters: ElementParameters = {
    tag: 'section',
    classNames: [CSS_ABOUT.ABOUT],
};

export const aboutTitleParameters: ElementParameters = {
    tag: 'h2',
    textContent: aboutContent.TITLE,
    classNames: [CSS_ABOUT.TITLE],
};

export const aboutSubtitleParameters: ElementParameters = {
    tag: 'h3',
    textContent: aboutContent.DESCRIPTION_TITLE,
    classNames: [CSS_ABOUT.SUBTITLE],
};

export const aboutListParameters: ElementParameters = {
    tag: 'ul',
    classNames: [CSS_ABOUT.LIST],
};

export const aboutListItemParameters: ElementParameters = {
    tag: 'li',
    classNames: [CSS_ABOUT.ITEM],
};

export const aboutListItemTextParameters: ElementParameters = {
    tag: 'p',
    classNames: [CSS_ABOUT.ITEM_TEXT],
};

export const descriptionParameters: ElementParameters = {
    tag: 'h3',
    textContent: aboutContent.DESCRIPTION_ADD,
    classNames: [CSS_ABOUT.DESCRIPTION],
};

export const navigationButtonParameters: ElementParameters = {
    tag: 'button',
    textContent: BUTTON_CONSTANTS.buttonNavigation,
    classNames: [CSS_BUTTON.BUTTON, CSS_ABOUT.NAVIGATION_BUTTON],
};

export const personalLinkParameters: ElementParameters = {
    tag: 'a',
    textContent: aboutContent.NAME,
    classNames: [CSS_ABOUT.SOCIAL],
};