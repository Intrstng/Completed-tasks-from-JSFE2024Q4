import CreatorElement from '../creator-element';
import { CanvasParameters } from '../../../types';

export default class CreatorCanvas extends CreatorElement {
    constructor(parameters: CanvasParameters) {
        super(parameters);
    }

    public createElement(parameters: CanvasParameters): void {
        this.element = document.createElement('canvas');

        if (parameters.textContent) {
            this.setTextContent(parameters.textContent);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }

        if (parameters.width && parameters.height) {
            this.setCanvasSize(parameters);
        }
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    private setCanvasSize(parameters: CanvasParameters): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('width', parameters.width);
            this.element.setAttribute('height', parameters.height);
        }
    }
}
