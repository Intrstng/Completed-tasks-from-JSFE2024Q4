import './dialog.scss';

import type { DialogParameters, ElementParameters } from '../../../types';
import { Description } from '../../../types';
import CreatorElement from '../creator-element';
import { CSS_DIALOG } from './dialog-classes';

export default class CreatorDialog {
    public dialog: HTMLDialogElement | null;
    private dialogName: HTMLElement | null;
    private dialogTime: HTMLElement | null;

    constructor(parameters: DialogParameters, dialogContentParameters: Array<ElementParameters>) {
        this.dialog = null;
        this.createElement(parameters, dialogContentParameters);
    }

    public createElement(dialogParameters: DialogParameters, contentDialogParameters: Array<ElementParameters>): void {
        if (dialogParameters.tag) {
            this.dialog = document.createElement('dialog');
        }

        if (dialogParameters.id) {
            this.setElementId(dialogParameters.id);
        }

        if (dialogParameters.textContent) {
            this.setTextContent(dialogParameters.textContent);
        }

        if (dialogParameters.classNames && dialogParameters.classNames.length > 0) {
            this.setCssClasses(dialogParameters.classNames);
        }

        if (Description.OPEN in dialogParameters) {
            this.setOpenAttribute(dialogParameters.open);
        }

        this.setContent(contentDialogParameters);
    }

    public addInnerElement(element: HTMLElement | CreatorElement): void {
        if (this.dialog && element && element instanceof HTMLElement) {
            this.dialog.append(element);
        } else {
            console.error('Cannot append inner element, parent element is null.');
        }
    }

    public getElement(): HTMLElement | null {
        return this.dialog;
    }

    public setTextContent(text: string = ''): void {
        if (this.dialog) {
            this.dialog.textContent = text;
        } else {
            console.error('Cannot set dialog text content: element is null.');
        }
    }

    public getElementId(): string {
        if (this.dialog) {
            return ('getAttribute' in this.dialog && this.dialog.getAttribute('id')) || '';
        } else {
            console.error('Cannot get id. Element is null.');
            return '';
        }
    }

    public setDialogNameField(value: string): void {
        this.dialogName.textContent = value;
    }

    public setDialogTimeField(value: string): void {
        this.dialogTime.textContent = `${value} seconds`;
    }

    public setContent(contentParameters: Array<ElementParameters>): void {
        if (contentParameters.length > 0) {
            const innerElements: Array<CreatorElement> = contentParameters.map(
                (itemParameters: ElementParameters) => new CreatorElement(itemParameters)
            );

            innerElements.forEach(innerElement => {
                const elementToAppend = innerElement.getElement();
                const innerElementID: string = innerElement.getElementId();

                if (innerElementID === String(Description.DIALOG_NAME)) {
                    this.dialogName = elementToAppend;
                } else if (innerElementID === String(Description.DIALOG_TIME)) {
                    this.dialogTime = elementToAppend;
                }

                if (elementToAppend) {
                    this.addInnerElement(elementToAppend);
                }
            });
        } else {
            console.error('Cannot set dialog content: element is null.');
        }
    }

    public showDialog(): void {
        if (this.dialog instanceof HTMLDialogElement) {
            this.dialog.showModal();
            this.dialog.classList.remove(CSS_DIALOG.HIDDEN);
        } else {
            console.error('Cannot call showModal: element is not a dialog');
        }
    }

    public resetDialogFieldsValues(): void {
        this.setDialogNameField('');
        this.setDialogTimeField('');
    }

    public closeDialogByTimeout(delay: number): void {
        setTimeout(() => {
            if (this.dialog instanceof HTMLDialogElement) {
                this.dialog.close();
                this.dialog.classList.add(CSS_DIALOG.HIDDEN);
                this.resetDialogFieldsValues();
            }
        }, delay);
    }

    public setOpenAttribute(open: boolean): void {
        if (this.dialog && 'setAttribute' in this.dialog) {
            if (open) {
                this.dialog.setAttribute('open', '');
            } else {
                this.dialog.removeAttribute('open');
            }
        } else {
            console.error('Cannot set open attribute: element is null.');
        }
    }

    public setCssClasses(cssClasses: Array<string> = []): void {
        if (this.dialog === null) {
            console.warn('Cannot set CSS classes: element is null.');
        } else {
            cssClasses.forEach(cssClass => {
                if (this.dialog && 'classList' in this.dialog) {
                    this.dialog.classList.add(cssClass);
                }
            });
        }
    }
    public setElementId(id: string = ''): void {
        if (this.dialog && 'setAttribute' in this.dialog) {
            this.dialog.setAttribute('id', id);
        } else {
            console.error('Cannot set element id: element is null.');
        }
    }
}
