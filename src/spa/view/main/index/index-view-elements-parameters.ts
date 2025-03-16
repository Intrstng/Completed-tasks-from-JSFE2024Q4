import type { ElementParameters } from '../../../../types';
import { Button, InputDescription, InputTypes } from '../../../../types';
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

export const inputsParameters: Array<ElementParameters> = [
    {
        id: 'inputTitle',
        tag: 'input',
        classNames: ['input-class', 'title-input'],
        hasLabel: true,
        textContent: InputDescription.ID,
        type: InputTypes.TEXT,
        placeholder: InputDescription.TITLE,
    },
    {
        tag: 'input',
        classNames: ['input-class', 'weight-input'],
        type: InputTypes.NUMBER,
        placeholder: InputDescription.WEIGHT,
    },
];

export const buttonsParameters: ButtonsCollection = [
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

export const deleteButtonParameters: Button = {
    tag: 'button',
    classNames: ['button', 'button-delete'],
    textContent: ButtonNames.DELETE,
};
