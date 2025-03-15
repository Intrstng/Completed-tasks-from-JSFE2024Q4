import type { Callback, ElementParameters } from '../../types';

export default class CreatorElement {
    public element: HTMLElement | DocumentFragment | null;
    constructor(parameters: ElementParameters) {
        this.element = null;
        this.createElement(parameters);
    }

    public addInnerElement(element: HTMLElement | CreatorElement): void {
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

    public getElement(): HTMLElement | DocumentFragment | null {
        return this.element;
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        } else {
            console.error('Cannot set element text content: element is null.');
        }
    }

    public createElement({ tag, classNames, textContent, callback, id }: ElementParameters): void {
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

    protected setCallback(callback: Callback = null): void {
        if (this.element && typeof callback === 'function') {
            this.element.addEventListener('click', (event: Event) => callback(event));
        } else if (!this.element) {
            console.error('Cannot set event listener: element is null.');
        }
    }

    private setCssClasses(cssClasses: Array<string> = []): void {
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

    private setElementId(id: string = ''): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('id', id);
        } else {
            console.error('Cannot set element id: element is null.');
        }
    }
}
