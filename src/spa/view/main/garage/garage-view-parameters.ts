import {
    ButtonParameters,
    ButtonsCollection,
    CssClasses,
    Description,
    DialogParameters,
    ElementParameters,
    InputTypes,
} from '../../../../types';

export const garageParameters: ElementParameters = {
    tag: 'section',
    classNames: [CssClasses.GARAGE, CssClasses.GARAGE_CONTAINER],
};

export const garageSummaryParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.GARAGE_SUMMARY],
};

export const garageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.GARAGE,
    classNames: [CssClasses.GARAGE_CURRENT],
};

export const garagePageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.PAGE,
    classNames: [CssClasses.PAGE_CURRENT],
};

export const carCreationContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: ['creation-car'],
};

export const carCreationBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: ['creation-car__create'],
};

export const carUpdateBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: ['creation-car__update'],
};

export const mainButtonsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: ['controls-btn-container'],
};

export const mainControlsButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CONTROLS, CssClasses.BUTTON_RACE],
        textContent: Description.RACE,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CONTROLS, CssClasses.BUTTON_RESET],
        textContent: Description.RESET,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CONTROLS, CssClasses.BUTTON_GENERATE],
        textContent: Description.GENERATE,
    },
];

export const carControlsButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_START],
        textContent: Description.START,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_BACK],
        textContent: Description.BACK,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_SELECT],
        textContent: Description.SELECT,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_REMOVE],
        textContent: Description.REMOVE,
    },
];

export const createButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CREATE],
    textContent: Description.CREATE,
};

export const updateButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_UPDATE],
    textContent: Description.UPDATE,
};

export const inputsParameters: Array<ElementParameters> = [
    {
        id: 'inputBrand',
        tag: 'input',
        classNames: [CssClasses.INPUT, CssClasses.BRAND],
        type: InputTypes.TEXT,
        placeholder: Description.BRAND,
    },
    {
        id: 'inputColor',
        tag: 'input',
        classNames: [CssClasses.INPUT, CssClasses.COLOR],
        type: InputTypes.COLOR,
    },
];

export const labelParameters: ElementParameters = {
    tag: 'label',
    classNames: ['label'],
};

export const raceBoardParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.BOARD],
};

export const carBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.BLOCK],
};

export const carNameParameters: ElementParameters = {
    tag: 'h3',
    classNames: [CssClasses.NAME],
};

export const carRaceParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.RACE],
};

export const carRaceControlsParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.RACE_CONTROLS],
};

export const trackParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.TRACK],
};

export const finishParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.FINISH],
};

export const paginationGarageControlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.PAGINATION_GARAGE_CONTAINER],
};

export const prevButtonGarageParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_PREV],
    textContent: Description.PREV,
};

export const nextButtonGarageParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_NEXT],
    textContent: Description.NEXT,
};

export const dialogParameters: DialogParameters = {
    tag: 'dialog',
    classNames: ['dialog', 'dialog-hidden'],
    open: false,
};

export const dialogContentParameters: Array<ElementParameters> = [
    {
        tag: 'p',
        classNames: ['dialog__name-title'],
        textContent: Description.FINISHED,
    },
    {
        tag: 'p',
        id: Description.DIALOG_NAME,
        classNames: ['dialog__name'],
    },
    {
        tag: 'p',
        classNames: ['dialog__time-title'],
        textContent: Description.WINNER_TIME,
    },
    {
        tag: 'p',
        id: Description.DIALOG_TIME,
        classNames: ['dialog__time'],
    },
];
