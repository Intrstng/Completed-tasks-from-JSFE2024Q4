import type { EventCallback, ElementParameters } from '../../types';
import { CssClasses } from '../../types';
//import CreatorDialog from './dialog/dialog-creator';

export default class CreatorElement {
    public element: HTMLElement | HTMLCanvasElement | HTMLDialogElement | null;
    constructor(parameters: ElementParameters) {
        this.element = null;
        this.createElement(parameters);
    }

    //public addInnerElement(element: HTMLElement | CreatorElement | SVGSVGElement | CreatorDialog): void {
    public addInnerElement(element: HTMLElement | CreatorElement | SVGElement): void {
        if (this.element) {
            const elementToAppend =
                // element instanceof CreatorElement || element instanceof CreatorDialog ? element.getElement() : element;
                element instanceof CreatorElement ? element.getElement() : element;

            if (elementToAppend) {
                this.element.append(elementToAppend);
            } else {
                console.error('Element to append is null.');
            }
        } else {
            console.error('Cannot append inner element, parent element is null.');
        }
    }

    public getElement(): HTMLElement | HTMLCanvasElement | null {
        return this.element;
    }

    public getElementId(): string {
        if (this.element) {
            return ('getAttribute' in this.element && this.element.getAttribute('id')) || '';
        } else {
            console.error('Cannot get id. Element is null.');
            return '';
        }
    }

    public getElementTag(): string {
        if (this.element) {
            return this.element.tagName.toLowerCase();
        } else {
            console.error('Cannot get id. Element is null.');
            return '';
        }
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        } else {
            console.error('Cannot set element text content: element is null.');
        }
    }

    public createElement(parameters: ElementParameters): void {
        if (parameters.tag) {
            this.element = document.createElement(parameters.tag);
        }

        if (parameters.id) {
            this.setElementId(parameters.id);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            this.setCssClasses(parameters.classNames);
        }

        if (parameters.textContent) {
            this.setTextContent(parameters.textContent);
        }

        if (parameters.title) {
            this.setElementTitle(parameters.title);
        }

        if (parameters.tag === 'textarea') {
            this.setTextareaSize(parameters);
            if (parameters.placeholder) {
                this.setPlaceholder(parameters.placeholder);
            }
        }

        if (parameters.callback) {
            this.setCallback(parameters.callback);
        }
    }

    public setCssClasses(cssClasses: Array<string> = []): void {
        if (this.element === null) {
            console.warn('Cannot set CSS classes: element is null.');
        } else {
            cssClasses.forEach(cssClass => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(cssClass);
                }
            });
        }
    }

    public setDataAttribute(datasetKey: string = 'key', datasetValue: string): void {
        if (this.element && 'dataset' in this.element) {
            this.element.dataset[datasetKey] = datasetValue;
        } else {
            console.error('Cannot set element dataset attribute: element is null.');
        }
    }

    public setDisabled(value: boolean): void {
        if (this.element instanceof HTMLButtonElement || this.element instanceof HTMLInputElement) {
            this.element.disabled = value;
        } else {
            console.error('Cannot set element disabled attribute: element is null.');
        }
    }

    public setElementId(id: string = ''): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('id', id);
        } else {
            console.error('Cannot set element id: element is null.');
        }
    }

    public setCallback(callback: EventCallback = null): void {
        if (this.element && typeof callback === 'function') {
            this.element.addEventListener('click', (event: Event) => callback(event));
        } else if (!this.element) {
            console.error('Cannot set event listener: element is null.');
        }
    }

    static hasClasses(element: HTMLElement, classes: Array<CssClasses>): boolean {
        return classes.every(cls => element.classList.contains(cls));
    }

    private setTextareaSize(parameters: ElementParameters): void {
        if (this.element && 'setAttribute' in this.element) {
            const rows = parameters.rows === undefined ? '4' : parameters.rows;
            const cols = parameters.cols === undefined ? '20' : parameters.cols;

            this.element.setAttribute('rows', rows);
            this.element.setAttribute('cols', cols);
        } else {
            console.error('Cannot set textarea size: element is null.');
        }
    }

    private setPlaceholder(placeholder: string): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('placeholder', placeholder);
        } else {
            console.error('Cannot set placeholder: element is null.');
        }
    }

    private setElementTitle(title: string): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('title', title);
        } else {
            console.error('Cannot set element title: element is null.');
        }
    }
}
