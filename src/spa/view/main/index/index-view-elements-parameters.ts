import type { CanvasParameters, ElementParameters } from '../../../../types';
import { ButtonParameters, InputDescription, InputTypes } from '../../../../types';
import type { ButtonsCollection } from '../../../../types';
import { ButtonNames } from '../../../../types';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: ['title'],
    title: 'Decision Making Tool',
    textContent: 'Decision Making Tool',
};

export const listParameters: ElementParameters = {
    tag: 'ul',
    classNames: ['options-list'],
};

export const listItemParameters: ElementParameters = {
    tag: 'li',
    classNames: ['options-list-item'],
};

export const labelParameters: ElementParameters = {
    tag: 'label',
    classNames: ['label'],
};

export const formSelectorParameters: ElementParameters = {
    tag: 'form',
    classNames: ['form-selector'],
};

export const inputsParameters: Array<ElementParameters> = [
    {
        id: 'inputTitle',
        tag: 'input',
        classNames: ['input-class', 'input-title'],
        textContent: InputDescription.ID,
        type: InputTypes.TEXT,
        placeholder: InputDescription.TITLE,
    },
    {
        tag: 'input',
        classNames: ['input-class', 'input-weight'],
        type: InputTypes.NUMBER,
        max: '1000',
        min: '0',
        placeholder: InputDescription.WEIGHT,
    },
];

export const mainButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.ADD,
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.PASTE,
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.CLEAR,
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.SAVE,
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.LOAD,
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.START,
    },
];

export const deleteButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: ['button', 'button-delete'],
    textContent: ButtonNames.DELETE,
};

export const backToHomeButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: ['button', 'button-home'],
    textContent: ButtonNames.BACK,
};

export const selectorButtons: Array<ButtonParameters> = [
    { ...backToHomeButtonParameters },
    {
        tag: 'button',
        classNames: ['button', 'button-sound'],
        textContent: ButtonNames.SOUND_ON,
    },
];

export const labelDurationParameters: ButtonParameters = {
    tag: 'label',
    classNames: ['label-duration'],
};

export const inputDurationParameters: ElementParameters = {
    id: 'inputDuration',
    tag: 'input',
    classNames: ['input-class', 'input-duration'],
    type: InputTypes.NUMBER,
    placeholder: InputDescription.SEC,
    min: '5',
    value: '16',
};

export const selectorStartButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: ['button', 'button-selector-start'],
    textContent: ButtonNames.START,
};

export const selectorPickedOption: ButtonParameters = {
    tag: 'p',
    classNames: ['picked-option'],
    textContent: ButtonNames.START_SELECT,
};

export const canvasParameters: CanvasParameters = {
    id: 'canvas',
    tag: 'canvas',
    classNames: ['canvas-selector'],
    textContent: 'Decision Picker Wheel',
    width: '512',
    height: '512',
};
