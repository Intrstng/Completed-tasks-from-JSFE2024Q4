import './input-field.scss';

import type { ElementParameters, EventCallback } from '../../../types';
import { InputTypes } from '../../../types';
import CreatorElement from '../creator-element';

export default class InputFieldCreator extends CreatorElement {
    constructor(parameters: ElementParameters) {
        super(parameters);
    }

    public createElement(parameters: ElementParameters): void {
        this.element = document.createElement('input');
        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }
        if (parameters.id) {
            if (parameters.textContent) {
                this.setInputElementId(`${parameters.id}_${parameters.textContent}`);
            } else {
                this.setInputElementId(`${parameters.id}`);
            }
        }
        if (parameters.type) {
            this.setInputType(parameters.type);
        }

        if (parameters.type === InputTypes.NUMBER) {
            if (parameters.max) {
                this.setInputNumberMaxValue(parameters.max);
            }

            if (parameters.min) {
                this.setInputNumberMinValue(parameters.min);
            }
        }
        if (parameters.placeholder) {
            this.setInputPlaceholder(parameters.placeholder);
            this.setInputName(parameters.placeholder);
        }
        if (parameters.required) {
            this.setInputRequired(parameters.required);
        }
        if (parameters.callback) {
            this.setCallback(parameters.callback);
        }
    }

    public setCallback(callback: EventCallback = null): void {
        if (this.element && callback) {
            this.element.addEventListener('input', callback);
        }
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    public setValue(value: string | undefined): void {
        if (this.element && this.element instanceof HTMLInputElement && typeof value === 'string') {
            this.element.value = value;
        } else {
            console.error('Element is not initialized or is not an input element.');
        }
    }

    private setInputType(type: InputTypes): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('type', type);
        }
    }

    private setInputElementId(id: string = ''): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('id', id);
        }
    }

    private setInputRequired(required: boolean): void {
        if (this.element && 'setAttribute' in this.element) {
            if (required) {
                this.element.setAttribute('required', '');
            } else {
                this.element.removeAttribute('required');
            }
        }
    }

    private setInputPlaceholder(placeholder: string): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('placeholder', placeholder);
        }
    }

    private setInputName(name: string): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('name', name.split(' ')[0].toLowerCase());
        }
    }

    private setInputNumberMinValue(value: string): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('min', value);
        }
    }

    private setInputNumberMaxValue(value: string): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('max', value);
        }
    }
}
