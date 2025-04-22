import './dialog.scss';
import type { DialogParameters, ElementParameters } from '../../../types';
import CreatorElement from '../creator-element';
import { CSS_DIALOG, DIALOG_IDs } from './dialog-classes';
import { loaderSpinnerParameters } from './dialog-view-parameters';
import { CONNECTION_ERROR } from './dialog-constants';
import { CONSTANTS_KEYS } from '../../api/types';
import { API_CONSTANTS } from '../../api/api-constants';
const spinnerLogo = require('../../../assets/spinner.gif');

export default class CreatorDialog {
    public dialog: HTMLDialogElement | null = null;
    private dialogTitle: HTMLElement | null = null;
    private dialogText: CreatorElement | null = null;
    private dialogSpinnerContainer: CreatorElement | null;

    constructor(parameters: DialogParameters, dialogContentParameters: Array<ElementParameters>) {
        this.createElement(parameters, dialogContentParameters);
    }

    public createElement(dialogParameters: DialogParameters, contentDialogParameters: Array<ElementParameters>): void {
        if (dialogParameters.tag) {
            this.dialog = document.createElement('dialog');
        }

        if (dialogParameters.id) {
            this.setElementId(dialogParameters.id);
        }

        if (dialogParameters.classNames && dialogParameters.classNames.length > 0) {
            this.setCssClasses(dialogParameters.classNames);
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

    public getElementId(): string {
        if (this.dialog) {
            return ('getAttribute' in this.dialog && this.dialog.getAttribute('id')) || '';
        } else {
            console.error('Cannot get id. Element is null.');
            return '';
        }
    }

    public setDialogTitleField(value: string): void {
        if (this.dialogTitle && 'textContent' in this.dialogTitle) {
            this.dialogTitle.textContent = value;
        }
    }

    public setDialogTextField(value: string): void {
        this.dialogText.setTextContent(value);
    }

    public addSpinner(): void {
        const spinnerCreator = new CreatorElement(loaderSpinnerParameters);
        spinnerCreator.getElement().setAttribute('src', spinnerLogo)
        this.dialogSpinnerContainer.addInnerElement(spinnerCreator);
    }

    public removeSpinner(): void {
        CreatorElement.deleteAllItemsInContainer(this.dialogSpinnerContainer);
    }

    public setContent(contentParameters: Array<ElementParameters>): void {
        if (contentParameters.length > 0) {
            const innerElements: Array<CreatorElement> = contentParameters.map(
                (itemParameters: ElementParameters) => {
                    const newElementCreator: CreatorElement = new CreatorElement(itemParameters);
                    if (itemParameters.id === DIALOG_IDs.SPINNER_CONTAINER) {
                        this.dialogSpinnerContainer = newElementCreator;
                    }
                    if (itemParameters.id === DIALOG_IDs.ERROR_MESSAGE) {
                        this.dialogText = newElementCreator;
                    }
                    return newElementCreator;
                }
            );

            innerElements.forEach(innerElement => {
                const elementToAppend = innerElement.getElement();
                const innerElementID: string = innerElement.getElementId();

                // if (innerElementID === String(Description.DIALOG_NAME)) {
                //     this.dialogName = elementToAppend;
                // } else if (innerElementID === String(Description.DIALOG_TIME)) {
                //     this.dialogTime = elementToAppend;
                // }

                if (elementToAppend) {
                    this.addInnerElement(elementToAppend);
                }
            });
        } else {
            console.error('Cannot set dialog content: element is null.');
        }
    }

    public showDialog = (message: string): void => {
        if (this.dialog instanceof HTMLDialogElement) {
            if (message === CONNECTION_ERROR.RECONNECT) {
                this.removeSpinner();
                this.addSpinner();
                this.setDialogTextField(message);
            } else {
                setTimeout(() => this.closeDialog(), API_CONSTANTS[CONSTANTS_KEYS.ERROR_MESSAGE_DELAY]);
            }

            this.dialog.showModal();
            this.setDialogTextField(message);
            this.dialog.classList.remove(CSS_DIALOG.HIDDEN);
        } else {
            console.error('Cannot call showModal: element is not a dialog');
        }
    }

    public closeDialog(): void {
        if (this.dialog instanceof HTMLDialogElement) {
            this.removeSpinner();
            this.dialog.classList.add(CSS_DIALOG.HIDDEN);
            this.resetDialogFieldsValues();
            this.dialog.close();
        } else {
            console.error('Cannot call closeModal: element is not a dialog');
        }
    }



    public resetDialogFieldsValues(): void {
        this.setDialogTextField('');
    }

    public closeDialogByTimeout(delay: number): void {
        setTimeout(() => {
            if (this.dialog instanceof HTMLDialogElement) {
                this.dialog.close();
                this.removeSpinner();
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
