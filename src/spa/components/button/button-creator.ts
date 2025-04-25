import './button.scss';

import type { ElementParameters, EventCB } from '../../../types';
import type { InputTypes } from '../../../types';
import CreatorElement from '../creator-element';
import { Attributes, DOMEvents } from '../../../types';

export default class ButtonCreator extends CreatorElement {
    public createElement(parameters: ElementParameters): void {
        if (parameters.tag) {
            this.element = document.createElement(parameters.tag);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && Attributes.CLASS_LIST in this.element) {
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
            this.element.addEventListener(DOMEvents.CLICK, (event: Event) => {
                if (callback) {
                    callback(event);
                }
            });
        } else {
            console.error('Cannot set callback: element is null.');
        }
    }

    public setTextContent(text = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    private setButtonType(type: InputTypes): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.TYPE, type);
        }
    }
}
