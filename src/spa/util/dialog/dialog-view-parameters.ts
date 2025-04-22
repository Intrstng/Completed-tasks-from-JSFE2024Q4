import type { DialogParameters, ElementParameters } from '../../../types';
import { CSS_DIALOG, DIALOG_IDs } from './dialog-classes';
import { CONNECTION_ERROR } from './dialog-constants';

export const dialogParameters: DialogParameters = {
    tag: 'dialog',
    classNames: [CSS_DIALOG.DIALOG, CSS_DIALOG.HIDDEN],
    // classNames: [CSS_DIALOG.DIALOG],
    open: false,
};

export const dialogContentParameters: Array<ElementParameters> = [
    {
        tag: 'h2',
        classNames: [CSS_DIALOG.TITLE],
        textContent: CONNECTION_ERROR.TITLE,
    },
    {
        tag: 'p',
        id: DIALOG_IDs.ERROR_MESSAGE,
        classNames: [CSS_DIALOG.TEXT],
    },
    {
        tag: 'span',
        id: DIALOG_IDs.SPINNER_CONTAINER,
        classNames: [CSS_DIALOG.SPINNER_CONTAINER],
    },
];

export const loaderSpinnerParameters: ElementParameters = {
    tag: 'img',
    id: DIALOG_IDs.SPINNER,
    classNames: [CSS_DIALOG.SPINNER],
}
