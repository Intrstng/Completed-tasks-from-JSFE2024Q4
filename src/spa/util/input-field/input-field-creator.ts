import './input-field.scss';

import type { Callback, ElementParameters, InputTypes } from '../../../types';
import CreatorElement from '../creator-element';

export default class InputFieldCreator extends CreatorElement {
    private readonly maxValue: string = '100';
    private labelElement: HTMLLabelElement | null = null;
    private inputElement: HTMLInputElement | null = null;

    constructor(parameters: ElementParameters) {
        super(parameters);
    }

    public createElement(parameters: ElementParameters): void {
        const fragment = document.createDocumentFragment();
        if (parameters.hasLabel) {
            this.labelElement = document.createElement('label');
            this.setTextContent(parameters.textContent);
            this.setConnectionWithInput(parameters.id);
            fragment.append(this.labelElement);
        }

        this.inputElement = document.createElement('input');

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.inputElement) {
                    this.inputElement.classList.add(name);
                }
            });
        }

        if (parameters.id) {
            this.setInputElementId(parameters.id);
        }

        if (parameters.type === 'number') {
            this.setInputType(parameters.type);
            this.setInputNumberMaxValue(this.maxValue);
        }

        if (parameters.placeholder) {
            this.setInputPlaceholder(parameters.placeholder);
            this.setInputName(parameters.placeholder);
        }

        if (parameters.callback) {
            this.setCallback(parameters.callback);
        }
        fragment.append(this.inputElement);
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

    public setTextContent(text: string = ''): void {
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

    public setValue(value: string): void {
        if (this.inputElement) {
            this.inputElement.value = value;
        }
    }
}
