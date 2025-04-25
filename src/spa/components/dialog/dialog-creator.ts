import './dialog.scss';
import type { DialogParameters, ElementParameters } from '../../../types';
import CreatorElement from '../creator-element';
import { CSS_DIALOG, DIALOG_IDs } from './dialog-classes';
import { loaderSpinnerParameters } from './dialog-view-parameters';
import { CONNECTION_ERROR } from '../../../constants/dialog-constants';
import { CONSTANTS_KEYS } from '../../api/types';
import { API_CONSTANTS } from '../../../constants/api-constants';
import spinnerLogo from '../../../assets/spinner.gif';
import { Attributes } from '../../../types';

export default class CreatorDialog {
    public dialog: HTMLDialogElement | null = null;
    private dialogTitle: HTMLElement | null = null;
    private dialogText: CreatorElement | null = null;
    private dialogSpinnerContainer: CreatorElement | null = null;

    constructor(parameters: DialogParameters, dialogContentParameters: ElementParameters[]) {
        this.createElement(parameters, dialogContentParameters);
    }

    public createElement(dialogParameters: DialogParameters, contentDialogParameters: ElementParameters[]): void {
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
            return (Attributes.GET_ATTRIBUTE in this.dialog && this.dialog.getAttribute(Attributes.ID)) || '';
        } else {
            console.error('Cannot get id. Element is null.');
            return '';
        }
    }

    public setDialogTitleField(value: string): void {
        if (this.dialogTitle && Attributes.TEXT_CONTENT in this.dialogTitle) {
            this.dialogTitle.textContent = value;
        }
    }

    public setDialogTextField(value: string): void {
        if (this.dialogText) {
            this.dialogText.setTextContent(value);
        }
    }

    public addSpinner(): void {
        const spinnerCreator = new CreatorElement(loaderSpinnerParameters);
        const spinnerElement: HTMLElement | HTMLCanvasElement | null = spinnerCreator.getElement();
        if (spinnerElement) {
            spinnerElement.setAttribute(Attributes.SRC, spinnerLogo);
        }
        if (this.dialogSpinnerContainer instanceof CreatorElement) {
            this.dialogSpinnerContainer.addInnerElement(spinnerCreator);
        }
    }

    public removeSpinner(): void {
        CreatorElement.deleteAllItemsInContainer(this.dialogSpinnerContainer);
    }

    public setContent(contentParameters: ElementParameters[]): void {
        if (contentParameters.length > 0) {
            const innerElements: CreatorElement[] = contentParameters.map((itemParameters: ElementParameters) => {
                const newElementCreator: CreatorElement = new CreatorElement(itemParameters);
                if (itemParameters.id === DIALOG_IDs.SPINNER_CONTAINER) {
                    this.dialogSpinnerContainer = newElementCreator;
                }
                if (itemParameters.id === DIALOG_IDs.ERROR_MESSAGE) {
                    this.dialogText = newElementCreator;
                }
                return newElementCreator;
            });

            innerElements.forEach(innerElement => {
                const elementToAppend = innerElement.getElement();

                if (elementToAppend) {
                    this.addInnerElement(elementToAppend);
                }
            });
        } else {
            console.error('Cannot set dialog content: element is null.');
        }
    }

    public addDialogToLayout(): void {
        if (this.dialog) {
            document.body.append(this.dialog);
        } else {
            console.error('Dialog element is null and cannot be appended to the body.');
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
    };

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
        if (this.dialog && Attributes.SET_ATTRIBUTE in this.dialog) {
            if (open) {
                this.dialog.setAttribute(Attributes.OPEN, '');
            } else {
                this.dialog.removeAttribute(Attributes.OPEN);
            }
        } else {
            console.error('Cannot set open attribute: element is null.');
        }
    }

    public setCssClasses(cssClasses: string[] = []): void {
        if (this.dialog === null) {
            console.warn('Cannot set CSS classes: element is null.');
        } else {
            cssClasses.forEach(cssClass => {
                if (this.dialog && Attributes.CLASS_LIST in this.dialog) {
                    this.dialog.classList.add(cssClass);
                }
            });
        }
    }

    public setElementId(id = ''): void {
        if (this.dialog && Attributes.SET_ATTRIBUTE in this.dialog) {
            this.dialog.setAttribute(Attributes.ID, id);
        } else {
            console.error('Cannot set element id: element is null.');
        }
    }
}
