import './button.scss';

import type { ElementParameters, EventCB } from '../../../types';
import CreatorElement from '../creator-element';
import { InputTypes } from '../../../types';

export default class ButtonCreator extends CreatorElement {
    public createElement(parameters: ElementParameters): void {
        if (parameters.tag) {
            this.element = document.createElement(parameters.tag);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }

        if (parameters.callback) {
            this.setCallback(parameters.callback);
        }

        if (parameters.type) {
            this.setButtonType(parameters.type);
        }

        if (parameters.textContent) {
            this.setTextContent(parameters.textContent);
        }
    }

    public setCallback(callback: EventCB = null): void {
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
