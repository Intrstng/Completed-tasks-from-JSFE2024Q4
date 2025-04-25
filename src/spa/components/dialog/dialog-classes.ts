import type { Css_Classes } from '../../../types';

export const CSS_DIALOG: Css_Classes = {
    DIALOG: 'modal',
    HIDDEN: 'modal-hidden',
    TITLE: 'modal__title',
    TEXT: 'modal__text',
    SPINNER_CONTAINER: 'modal__spinner-box',
    SPINNER: 'modal__spinner',
};

export const DIALOG_IDs: Record<string, string> = {
    ERROR_MESSAGE: 'errorModalMessage',
    SPINNER: 'errorSpinner',
    SPINNER_CONTAINER: 'spinnerContainer',
};
