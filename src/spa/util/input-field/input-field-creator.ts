import './input-field.scss';

import type { Callback, ElementParameters, InputTypes } from '../../../types';
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
            this.setInputElementId(`${parameters.id}_${parameters.textContent}`);
        }

        if (parameters.type === 'number') {
            this.setInputType(parameters.type);
            this.setInputNumberMaxValue('100');
        }

        if (parameters.placeholder) {
            this.setInputPlaceholder(parameters.placeholder);
            this.setInputName(parameters.placeholder);
        }

        if (parameters.callback) {
            this.setCallback(parameters.callback);
        }
    }

    protected setCallback(callback: Callback = null): void {
        if (this.element) {
            this.element.addEventListener('keyup', (event: Event) => {
                if (callback) {
                    callback(event);
                }
            });
        }
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    private setInputElementId(id: string = ''): void {
        if (this.element) {
            if ('setAttribute' in this.element) {
                this.element.setAttribute('id', id);
            }
        }
    }

    private setInputPlaceholder(placeholder: string): void {
        if (this.element) {
            if ('setAttribute' in this.element) {
                this.element.setAttribute('placeholder', placeholder);
            }
        }
    }

    private setInputName(name: string): void {
        if (this.element) {
            if ('setAttribute' in this.element) {
                this.element.setAttribute('name', name.split(' ')[0].toLowerCase());
            }
        }
    }

    private setInputType(type: InputTypes): void {
        if (this.element) {
            if ('setAttribute' in this.element) {
                this.element.setAttribute('type', type);
            }
        }
    }

    private setInputNumberMaxValue(value: string): void {
        if (this.element) {
            if ('setAttribute' in this.element) {
                this.element.setAttribute('max', value);
            }
        }
    }

    public setValue(value: any): void {
        if (this.element && this.element instanceof HTMLInputElement) {
            this.element.value = value;
        } else {
            console.error('Element is not initialized or is not an input element.');
        }
    }
}
