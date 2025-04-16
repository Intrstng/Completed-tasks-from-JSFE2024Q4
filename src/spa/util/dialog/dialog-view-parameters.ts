import type { DialogParameters, ElementParameters } from '../../../types';
import { Description } from '../../../types';
import { CSS_DIALOG } from './dialog-classes';

export const dialogParameters: DialogParameters = {
    tag: 'dialog',
    classNames: [CSS_DIALOG.DIALOG, CSS_DIALOG.HIDDEN],
    open: false,
};

export const dialogContentParameters: Array<ElementParameters> = [
    {
        tag: 'p',
        classNames: [CSS_DIALOG.NAME_TITLE],
        textContent: Description.FINISHED,
    },
    {
        tag: 'p',
        id: Description.DIALOG_NAME,
        classNames: [CSS_DIALOG.NAME],
    },
    {
        tag: 'p',
        classNames: [CSS_DIALOG.TIME_TITLE],
        textContent: Description.WINNER_TIME,
    },
    {
        tag: 'p',
        id: Description.DIALOG_TIME,
        classNames: [CSS_DIALOG.TIME],
    },
];
