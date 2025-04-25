import type { ElementParameters } from '../../../../../types';
import { InputTypes } from '../../../../../types';
import { PagesNames } from '../../../../../constants/header-constants';
import { chatContent } from '../../../../../constants/chat-constants';
import { CSS_CONTACTS } from '../chat-classes';

export const contactsContainerParameters: ElementParameters = {
    tag: 'aside',
    classNames: [CSS_CONTACTS.CONTACTS_CONTAINER],
};

export const contactsSearchFieldParameters: ElementParameters = {
    tag: 'input',
    placeholder: chatContent.SEARCH,
    type: InputTypes.TEXT,
    id: chatContent.INPUT_SEARCH_ID,
    textContent: PagesNames.CHAT,
    classNames: [CSS_CONTACTS.SEARCH_FIELD],
};

export const contactsListParameters: ElementParameters = {
    tag: 'ul',
    classNames: [CSS_CONTACTS.CONTACTS_LIST],
};

export const contactItemParameters: ElementParameters = {
    tag: 'li',
    classNames: [CSS_CONTACTS.CONTACTS_ITEM],
};

export const contactCounterParameters: ElementParameters = {
    tag: 'span',
    classNames: [CSS_CONTACTS.CONTACTS_COUNTER],
};

export const contactStatusParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CONTACTS.CONTACT_STATUS],
};

export const contactParameters: ElementParameters = {
    tag: 'p',
    classNames: [CSS_CONTACTS.CONTACT],
};
