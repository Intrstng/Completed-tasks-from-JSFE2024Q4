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
        textContent: 'finished',
    },
    {
        tag: 'p',
        id: 'dialogName',
        classNames: [CSS_DIALOG.NAME],
    },
    {
        tag: 'p',
        classNames: [CSS_DIALOG.TIME_TITLE],
        textContent: 'WINNER_TIME',
    },
    {
        tag: 'p',
        id: 'dialogTime',
        classNames: [CSS_DIALOG.TIME],
    },
];
