import type { ButtonParameters, ButtonsCollection, ElementParameters } from '../../../../../types';
import { Description } from '../../../../../types';
import { CSS_BUTTON } from '../../button-classes';
import { BUTTON_CONSTANTS } from '../button-constants';

export const mainButtonsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_BUTTON.BUTTON_CONTROLS_CONTAINER],
};

export const mainControlsButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CONTROLS, CSS_BUTTON.BUTTON_RACE],
        textContent: BUTTON_CONSTANTS.buttonRace,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CONTROLS, CSS_BUTTON.BUTTON_RESET],
        textContent: BUTTON_CONSTANTS.buttonReset,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CONTROLS, CSS_BUTTON.BUTTON_GENERATE],
        textContent: BUTTON_CONSTANTS.buttonGenerate,
    },
];

export const carControlsButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_START],
        textContent: BUTTON_CONSTANTS.buttonStart,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_BACK],
        textContent: BUTTON_CONSTANTS.buttonBack,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_SELECT],
        textContent: BUTTON_CONSTANTS.buttonSelect,
    },
    {
        tag: 'button',
        classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_REMOVE],
        textContent: BUTTON_CONSTANTS.buttonRemove,
    },
];

export const createButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_CREATE],
    textContent: BUTTON_CONSTANTS.buttonCreate,
};

export const updateButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CSS_BUTTON.BUTTON, CSS_BUTTON.BUTTON_UPDATE],
    textContent: BUTTON_CONSTANTS.buttonUpdate,
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
