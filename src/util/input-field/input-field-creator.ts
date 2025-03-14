import './input-field.scss';

import { Callback, ElementParams, InputTypes } from '../../types';
import CreatorElement from '../creator-element';

export default class InputFieldCreator extends CreatorElement {
    private readonly maxValue: string = '100';
    private labelElement: HTMLLabelElement | null = null;
    private inputElement: HTMLInputElement | null = null;

    constructor(params: ElementParams) {
        super(params);
    }

    createElement({
        tag,
        classNames,
        textContent,
        callback,
        hasLabel = true,
        id,
        placeholder,
        type,
        max,
    }: ElementParams): void {
        const fragment = document.createDocumentFragment();
        if (hasLabel) {
            this.labelElement = document.createElement('label');
            this.setTextContent(textContent);
            this.setConnectionWithInput(id);
            fragment.append(this.labelElement);
        }
        this.inputElement = document.createElement('input');

        if (classNames && classNames.length > 0) {
            classNames.forEach(name => {
                if (this.inputElement) {
                    this.inputElement.classList.add(name);
                }
            });
        }

        if (id) {
            this.setInputElementId(id);
        }

        if (type === 'number') {
            this.setInputType(type);
            this.setInputNumberMaxValue(this.maxValue);
        }

        if (placeholder) {
            this.setInputPlaceholder(placeholder);
            this.setInputName(placeholder);
        }

        if (callback) {
            this.setCallback(callback);
        }
        fragment.appendChild(this.inputElement);
        this.element = fragment;
    }

    protected setCallback(callback: Callback = null): void {
        if (this.inputElement) {
            this.inputElement.addEventListener('keyup', (event: Event) => {
                if (callback) {
                    callback(event);
                }
            });
        }
    }

    protected setTextContent(text: string = ''): void {
        if (this.labelElement) {
            this.labelElement.textContent = text;
        }
    }

    private setConnectionWithInput(id: string = ''): void {
        if (this.labelElement) {
            this.labelElement.setAttribute('for', id);
        }
    }

    private setInputElementId(id: string = ''): void {
        if (this.inputElement) {
            this.inputElement.setAttribute('id', id);
        }
    }

    private setInputPlaceholder(placeholder: string): void {
        if (this.inputElement) {
            this.inputElement.setAttribute('placeholder', placeholder);
        }
    }

    private setInputName(name: string): void {
        if (this.inputElement) {
            this.inputElement.setAttribute('name', name.split(' ')[0].toLowerCase());
        }
    }

    private setInputType(type: InputTypes): void {
        if (this.inputElement) {
            this.inputElement.setAttribute('type', type);
        }
    }

    private setInputNumberMaxValue(value: string): void {
        if (this.inputElement) {
            this.inputElement.setAttribute('max', value);
        }
    }

    setValue(value: string): void {
        if (this.inputElement) {
            this.inputElement.value = value;
        }
    }
}
