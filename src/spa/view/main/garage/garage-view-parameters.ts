import {
    ButtonParameters,
    ButtonsCollection,
    CssClasses,
    Description,
    ElementParameters,
    InputTypes,
    InputUse,
} from '../../../../types';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: ['title'],
    title: 'Async Race - Garage',
    textContent: 'Async Race - Garage',
};

export const garageParameters: ElementParameters = {
    tag: 'section',
    classNames: [CssClasses.GARAGE],
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
    classNames: [CssClasses.GARAGE_CURRENT],
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
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CONTROLS],
        textContent: Description.RACE,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CONTROLS],
        textContent: Description.RESET,
    },
    {
        tag: 'button',
        classNames: [CssClasses.BUTTON, CssClasses.BUTTON_CONTROLS],
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
