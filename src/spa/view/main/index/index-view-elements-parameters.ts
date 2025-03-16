import type { ElementParameters } from '../../../../types';
import { InputDescription, InputTypes } from '../../../../types';
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

export const inputs: Array<ElementParameters> = [
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
        type: InputTypes.TEXT,
        placeholder: InputDescription.WEIGHT,
    },
];

export const buttons: ButtonsCollection = [
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.ADD,
        callback: () => {},
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.PASTE,
        callback: (event: Event) => {
            console.log('Button clicked', event);
        },
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.CLEAR,
        callback: () => {},
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.SAVE,
        callback: () => {},
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.LOAD,
        callback: () => {},
    },
    {
        tag: 'button',
        classNames: ['button'],
        textContent: ButtonNames.START,
        callback: () => {},
    },
];
