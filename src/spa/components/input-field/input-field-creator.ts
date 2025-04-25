import './input-field.scss';

import type { ElementParameters, EventCB } from '../../../types';
import { Attributes, DOMEvents, InputTypes } from '../../../types';
import CreatorElement from '../creator-element';

export default class InputFieldCreator extends CreatorElement {
    public createElement(parameters: ElementParameters): void {
        this.element = document.createElement('input');
        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && Attributes.CLASS_LIST in this.element) {
                    this.element.classList.add(name);
                }
            });
        }
        if (parameters.id) {
            this.setInputElementId(`${parameters.id}`);
        }
        if (parameters.type === InputTypes.NUMBER) {
            if (parameters.max) {
                this.setInputType(parameters.type);
                this.setInputNumberMaxValue(parameters.max);
            }
            if (parameters.min) {
                this.setInputType(parameters.type);
                this.setInputNumberMinValue(parameters.min);
            }
        }
        if (parameters.type) {
            this.setInputType(parameters.type);
        }
        if (parameters.autocomplete) {
            this.setInputAutocomplete(parameters.autocomplete);
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

    public setCallback(callback: EventCB = null): void {
        if (this.element) {
            this.element.addEventListener(DOMEvents.KEYUP, (event: Event) => {
                if (callback) {
                    callback(event);
                }
            });
        }
    }

    public setTextContent(text = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    public getValue(): string {
        if (this.element && 'value' in this.element) {
            return this.element.value;
        }
        return '';
    }

    public setValue(value: string | undefined): void {
        if (this.element && this.element instanceof HTMLInputElement && typeof value === 'string') {
            this.element.value = value;
        } else {
            console.error('Element is not initialized or is not an input element.');
        }
    }

    private setInputType(type: InputTypes): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.TYPE, type);
        }
    }

    private setInputAutocomplete(value: string): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.AUTOCOMPLETE, value);
        }
    }

    private setInputElementId(id = ''): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.ID, id);
        }
    }

    private setInputRequired(required: boolean): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            if (required) {
                this.element.setAttribute(Attributes.REQUIRED, '');
            } else {
                this.element.removeAttribute(Attributes.REQUIRED);
            }
        }
    }

    private setInputPlaceholder(placeholder: string): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.PLACEHOLDER, placeholder);
        }
    }

    private setInputName(name: string): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.NAME, name.split(' ')[0].toLowerCase());
        }
    }

    private setInputNumberMinValue(value: string): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.MIN, value);
        }
    }

    private setInputNumberMaxValue(value: string): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.MAX, value);
        }
    }
}
