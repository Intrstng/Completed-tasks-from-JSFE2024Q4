import type { ButtonParameters } from '../../../../../types';
import { Description } from '../../../../../types';
import { CSS_BUTTON } from '../../button-classes';

export const previousButtonWinnersParameters: ButtonParameters = {
    tag: 'button',
    id: 'prevBtn',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_PREV],
    textContent: Description.PREV,
};

export const nextButtonWinnersParameters: ButtonParameters = {
    tag: 'button',
    id: 'nextBtn',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_NEXT],
    textContent: Description.NEXT,
};

export const ascWinsButtonParameters: ButtonParameters = {
    tag: 'button',
    id: 'ascWin',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_ASC, CSS_BUTTON.BUTTON_WINS, CSS_BUTTON.INACTIVE],
    textContent: Description.ASC,
};

export const descWinsButtonParameters: ButtonParameters = {
    tag: 'button',
    id: 'descWin',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_DESC, CSS_BUTTON.BUTTON_WINS, CSS_BUTTON.INACTIVE],
    textContent: Description.DESC,
};

export const ascTimeButtonParameters: ButtonParameters = {
    tag: 'button',
    id: 'ascTime',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_ASC, CSS_BUTTON.BUTTON_TIME, CSS_BUTTON.INACTIVE],
    textContent: Description.ASC,
};

export const descTimeButtonParameters: ButtonParameters = {
    tag: 'button',
    id: 'descTime',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_DESC, CSS_BUTTON.BUTTON_TIME, CSS_BUTTON.INACTIVE],
    textContent: Description.DESC,
};
