import './button.scss';

import { Callback, ElementParams, InputTypes } from '../../types';
import CreatorElement from '../creator-element';

export default class ButtonCreator extends CreatorElement {
    createElement({ tag, classNames, textContent, callback, type }: ElementParams): void {
        this.element = document.createElement('button');

        if (classNames && classNames.length > 0) {
            classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }

        if (callback) {
            this.setCallback(callback);
        }

        if (type === 'button') {
            this.setButtonType(type);
        }

        if (textContent) {
            this.setTextContent(textContent);
        }
    }

    setCallback(callback: Callback = null): void {
        if (this.element) {
            this.element.addEventListener('click', (event: Event) => {
                if (callback) {
                    callback(event);
                }
            });
        } else {
            console.error('Cannot set callback: element is null.');
        }
    }

    private setButtonType(type: InputTypes): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('type', type);
        }
    }

    protected setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }
}
