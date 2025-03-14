import { Callback, ElementParams } from '../types';

export default class CreatorElement {
    element: HTMLElement | DocumentFragment | null;
    constructor(params: ElementParams) {
        this.element = null;
        this.createElement(params);
    }

    addInnerElement(element: HTMLElement | CreatorElement): void {
        if (this.element) {
            const elementToAppend = element instanceof CreatorElement ? element.getElement() : element;

            if (elementToAppend) {
                this.element.append(elementToAppend);
            } else {
                console.error('Element to append is null.');
            }
        } else {
            console.error('Cannot append inner element, parent element is null.');
        }
    }

    getElement(): HTMLElement | DocumentFragment | null {
        return this.element;
    }

    createElement({ tag, classNames, textContent, callback, id }: ElementParams): void {
        if (tag) {
            this.element = document.createElement(tag);
        }

        if (id) {
            this.setElementId(id);
        }

        if (classNames && classNames.length > 0) {
            this.setCssClasses(classNames);
        }

        if (textContent) {
            this.setTextContent(textContent);
        }

        if (callback) {
            this.setCallback(callback);
        }
    }

    private setCssClasses(cssClasses: Array<string> = []): void {
        if (this.element !== null) {
            cssClasses.forEach(cssClass => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(cssClass);
                }
            });
        } else {
            console.warn('Cannot set CSS classes: element is null.');
        }
    }

    private setElementId(id: string = ''): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('id', id);
        } else {
            console.error('Cannot set element id: element is null.');
        }
    }

    protected setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        } else {
            console.error('Cannot set element text content: element is null.');
        }
    }

    protected setCallback(callback: Callback = null): void {
        if (this.element && typeof callback === 'function') {
            this.element.addEventListener('click', (event: Event) => callback(event));
        } else if (!this.element) {
            console.error('Cannot set event listener: element is null.');
        }
    }
}
