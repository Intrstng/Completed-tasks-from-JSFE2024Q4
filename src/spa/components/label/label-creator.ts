import './label.scss';
import type { ElementParameters } from '../../../types';
import CreatorElement from '../creator-element';

export default class LabelCreator extends CreatorElement {
    public createElement(parameters: ElementParameters): void {
        this.element = document.createElement('label');
        this.setTextContent(parameters.textContent);
        if (parameters.textContent) {
            this.setConnectionWithInput(`input${parameters.textContent}`);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
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
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('for', id);
        }
    }
}
