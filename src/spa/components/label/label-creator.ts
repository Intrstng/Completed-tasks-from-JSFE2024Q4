import './label.scss';
import type { ElementParameters } from '../../../types';
import CreatorElement from '../creator-element';
import { Attributes } from '../../../types';

export default class LabelCreator extends CreatorElement {
    public createElement(parameters: ElementParameters): void {
        this.element = document.createElement('label');
        this.setTextContent(parameters.textContent);
        if (parameters.textContent) {
            this.setConnectionWithInput(`input${parameters.textContent}`);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && Attributes.CLASS_LIST in this.element) {
                    this.element.classList.add(name);
                }
            });
        }
    }

    public setTextContent(text = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    private setConnectionWithInput(id = ''): void {
        if (this.element && Attributes.SET_ATTRIBUTE in this.element) {
            this.element.setAttribute(Attributes.FOR, id);
        }
    }
}
