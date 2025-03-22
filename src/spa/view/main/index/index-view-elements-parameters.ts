import type {
    CanvasParameters,
    ElementParameters,
    ButtonParameters,
    DialogContentParameters,
    DialogParameters,
} from '../../../../types';
import { InputDescription, InputTypes } from '../../../../types';
import type { ButtonsCollection } from '../../../../types';
import { ButtonNames } from '../../../../types';

export const titleParameters: ElementParameters = {
    tag: 'h1',
    classNames: ['title'],
    title: 'Decision Making Tool',
    textContent: 'Decision Making Tool',
};

export const notFoundTitleParameters: ElementParameters = {
    tag: 'h1',
    classNames: ['not-found-title'],
    textContent: ButtonNames.ERROR,
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

export const mainButtonsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: ['button-controls-container'],
};

export const mainButtonsParameters: ButtonsCollection = [
    {
        tag: 'button',
        classNames: ['button', 'button-controls'],
        textContent: ButtonNames.ADD,
    },
    {
        tag: 'button',
        classNames: ['button', 'button-controls'],
        textContent: ButtonNames.PASTE,
    },
    {
        tag: 'button',
        classNames: ['button', 'button-controls'],
        textContent: ButtonNames.CLEAR,
    },
    {
        tag: 'button',
        classNames: ['button', 'button-controls'],
        textContent: ButtonNames.SAVE,
    },
    {
        tag: 'button',
        classNames: ['button', 'button-controls'],
        textContent: ButtonNames.LOAD,
    },
    {
        tag: 'button',
        classNames: ['button', 'button-controls'],
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
    max: '30',
    required: true,
    value: '16',
};

export const tooltipDurationParameters: ButtonParameters = {
    id: 'tooltipDuration',
    tag: 'p',
    classNames: ['tooltip', 'tooltip-hidden'],
    textContent: ButtonNames.TOOLTIP_DURATION,
};

export const selectorStartButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: ['button', 'button-selector-start'],
    textContent: ButtonNames.START,
};

export const selectorPickedParameters: ButtonParameters = {
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

export const dialogParameters: DialogParameters = {
    tag: 'dialog',
    classNames: ['dialog', 'dialog-hidden'],
};

export const dialogCloseButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: ['button', 'button-dialog-close'],
    textContent: ButtonNames.CLOSE,
};

export const dialogPasteListContentParameters: Array<DialogContentParameters> = [
    {
        tag: 'div',
        classNames: ['dialog-container-paste'],
    },
    {
        tag: 'textarea',
        classNames: ['dialog-paste-text'],
        placeholder:
            'Paste a list of new options in a CSV-like format:\n' +
            '\n' +
            'title,1                 -> | title                 | 1 |\n' +
            'title with whitespace,2 -> | title with whitespace | 2 |\n' +
            'title , with , commas,3 -> | title , with , commas | 3 |\n' +
            'title with "quotes",4   -> | title with "quotes"   | 4 |',
        rows: '10',
        cols: '62',
    },
    {
        tag: 'button',
        classNames: ['button', 'button-dialog-close'],
        textContent: ButtonNames.CANCEL,
    },
    {
        tag: 'button',
        classNames: ['button', 'button-dialog-confirm'],
        textContent: ButtonNames.CONFIRM,
    },
];

export const dialogStartContentParameters: Array<DialogContentParameters> = [
    {
        tag: 'div',
        classNames: ['dialog-container-start'],
    },
    {
        tag: 'p',
        classNames: ['dialog-text-start'],
        textContent:
            'Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0.',
    },
    {
        tag: 'button',
        classNames: ['button', 'button-dialog-close', 'button-dialog-close-start'],
        textContent: ButtonNames.CLOSE,
    },
];
