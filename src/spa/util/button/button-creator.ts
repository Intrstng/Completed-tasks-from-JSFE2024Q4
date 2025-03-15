import './button.scss';

import type { Callback, ElementParameters, InputTypes } from '../../../types';
import CreatorElement from '../creator-element';

export default class ButtonCreator extends CreatorElement {
    public createElement({ tag, classNames, textContent, callback, type }: ElementParameters): void {
        if (tag) {
            this.element = document.createElement(tag);
        }

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

    public setCallback(callback: Callback = null): void {
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

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    private setButtonType(type: InputTypes): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('type', type);
        }
    }
}
