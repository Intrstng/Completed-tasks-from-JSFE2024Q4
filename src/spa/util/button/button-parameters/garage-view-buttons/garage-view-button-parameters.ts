import type { ButtonParameters, ButtonsCollection, ElementParameters } from '../../../../../types';
import { Description } from '../../../../../types';
import { CSS_BUTTON } from '../../button-classes';

export const mainButtonsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_BUTTON.BUTTON_CONTROLS_CONTAINER],
};

export const mainControlsButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CONTROLS, CSS_BUTTON.BUTTON_RACE],
        textContent: Description.RACE,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CONTROLS, CSS_BUTTON.BUTTON_RESET],
        textContent: Description.RESET,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CONTROLS, CSS_BUTTON.BUTTON_GENERATE],
        textContent: Description.GENERATE,
    },
];

export const carControlsButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_START],
        textContent: Description.START,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_BACK],
        textContent: Description.BACK,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_SELECT],
        textContent: Description.SELECT,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_REMOVE],
        textContent: Description.REMOVE,
    },
];

export const createButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CREATE],
    textContent: Description.CREATE,
};

export const updateButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_UPDATE],
    textContent: Description.UPDATE,
};

export const previousButtonGarageParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_PREV],
    textContent: Description.PREV,
};

export const nextButtonGarageParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_NEXT],
    textContent: Description.NEXT,
};
