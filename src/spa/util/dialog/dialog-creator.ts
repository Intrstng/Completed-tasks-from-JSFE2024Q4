import './dialog.scss';

import type {
    AppState,
    CallbackDialogSubmit,
    DialogContentParameters,
    DialogInnerElement,
    DialogParameters,
    EventCallback,
    SaveToFileData,
} from '../../../types';
import { ButtonNames, IndexViewItemPrefixes } from '../../../types';
import CreatorElement from '../creator-element';
import type LocalStorageState from '../../state/local-storage-state';

const CssClassesDialogButton: { [key: string]: string } = {
    CLOSE: 'button-dialog-close',
    CONFIRM: 'button-dialog-confirm',
};

export default class CreatorDialog {
    public element: HTMLDialogElement | null = null;
    public dialogContentContainer: HTMLElement | null = null;
    private readonly callbackDialogSubmit: CallbackDialogSubmit;
    private temporaryInputValue: string = '';
    private appState: AppState;

    constructor(
        dialogParameters: DialogParameters,
        contentDialogParameters: Array<DialogContentParameters>,
        appState: LocalStorageState,
        callback?: CallbackDialogSubmit
    ) {
        this.appState = appState.getState();
        this.callbackDialogSubmit = callback;
        this.callbackDialogSubmit = callback || ((): void => {});
        this.createElement(dialogParameters, contentDialogParameters);
    }

    public createElement(
        dialogParameters: DialogParameters,
        contentDialogParameters: Array<DialogContentParameters>
    ): void {
        if (dialogParameters.tag) {
            this.element = document.createElement('dialog');
        }

        if (dialogParameters.id) {
            this.setElementId(dialogParameters.id);
        }

        if (dialogParameters.classNames && dialogParameters.classNames.length > 0) {
            this.setCssClasses(dialogParameters.classNames);
        }

        if (dialogParameters.open) {
            this.setOpenAttribute(dialogParameters.open);
        }

        this.setContent(contentDialogParameters);
    }

    public addInnerElement(element: HTMLElement | CreatorElement): void {
        if (this.element) {
            let elementToAppend: HTMLElement | null;
            if (element instanceof HTMLElement && element.tagName.toLowerCase() === 'div') {
                this.dialogContentContainer = element;
                elementToAppend = null;
            } else if (element instanceof HTMLElement) {
                elementToAppend = element;
            } else {
                elementToAppend = null;
            }

            if (elementToAppend) {
                if (this.dialogContentContainer) {
                    this.dialogContentContainer.append(elementToAppend);
                    this.element.append(this.dialogContentContainer);
                } else {
                    this.element.append(elementToAppend);
                }
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

    public setContent(contentParameters: Array<DialogContentParameters>): void {
        if (contentParameters.length > 0) {
            const innerElements: Array<DialogInnerElement> = contentParameters.map(
                (itemParameters: DialogContentParameters) => new CreatorElement(itemParameters)
            );

            innerElements.forEach(innerElement => {
                const elementToAppend = innerElement.getElement();

                if (elementToAppend) {
                    if (
                        elementToAppend.textContent === ButtonNames.CLOSE ||
                        elementToAppend.textContent === ButtonNames.CANCEL
                    ) {
                        this.setOnClickHandler(this.closeDialog.bind(this));
                    }

                    if (elementToAppend.textContent === ButtonNames.CONFIRM) {
                        this.setOnClickHandler(this.confirmPasteListInput.bind(this));
                    }

                    if (elementToAppend.tagName.toLowerCase() === 'textarea') {
                        this.setKeyupHandler(this.setTemporaryInputValue.bind(this));
                    }

                    this.addInnerElement(elementToAppend);
                }
            });
        } else {
            console.error('Cannot set dialog content: element is null.');
        }
    }

    public showDialog(): void {
        if (this.element instanceof HTMLDialogElement) {
            this.element.showModal();
        } else {
            console.error('Cannot call showModal: element is not a dialog');
        }
    }

    public closeDialog(event: Event): void {
        const currentTarget = event.currentTarget;
        const target = event.target;

        if (!(currentTarget instanceof HTMLElement) || !(target instanceof HTMLElement)) {
            return;
        }

        const isCloseButton = target instanceof HTMLElement && target.classList.contains(CssClassesDialogButton.CLOSE);
        const isClickedOnBackdrop: boolean = target === currentTarget;

        if (this.element instanceof HTMLDialogElement && (isClickedOnBackdrop || isCloseButton)) {
            this.element.close();
            this.element.remove();
        }
    }

    public closeDialogByConfirmButton(event: Event): void {
        const target = event.target;

        const isCloseButton =
            target instanceof HTMLElement && target.classList.contains(CssClassesDialogButton.CONFIRM);

        if (this.element instanceof HTMLDialogElement && isCloseButton) {
            this.element.close();
            this.element.remove();
        }
    }

    public setOpenAttribute(open: boolean): void {
        if (this.element && 'setAttribute' in this.element) {
            if (open) {
                this.element.setAttribute('open', '');
            } else {
                this.element.removeAttribute('open');
            }
        } else {
            console.error('Cannot set open attribute: element is null.');
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

    public setElementId(id: string = ''): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('id', id);
        } else {
            console.error('Cannot set element id: element is null.');
        }
    }

    private confirmPasteListInput(event: Event): void {
        const currentTarget = event.currentTarget;
        const target = event.target;

        if (!(currentTarget instanceof HTMLElement) || !(target instanceof HTMLElement)) {
            return;
        }
        const isInputConfirmButton =
            target instanceof HTMLElement && target.classList.contains(CssClassesDialogButton.CONFIRM);
        if (isInputConfirmButton) {
            const parsedInput: SaveToFileData = this.parseInputToObject(this.temporaryInputValue);

            if (typeof this.callbackDialogSubmit === 'function') {
                this.callbackDialogSubmit(parsedInput);
            }
        }

        this.closeDialogByConfirmButton(event);
    }

    private parseInputToObject(input: string): SaveToFileData {
        const lines = input.trim().split('\n');

        const { list, lastId } = lines.reduce<SaveToFileData>(
            (acc, line) => {
                const pattern = /^\s*(.+?)\s*,\s*(\d+)\s*$/;
                const match = line.match(pattern);

                if (match) {
                    const title = match[1].trim();
                    const weight = match[2].trim();

                    acc.lastId += 1;
                    acc.list.push({
                        id: `${IndexViewItemPrefixes.HASH}${acc.lastId}`,
                        title,
                        weight,
                    });
                } else {
                    console.error(`Invalid line format: "${line}"`);
                }

                return acc;
            },
            {
                list: [],
                lastId: this.appState.lastId,
            }
        );

        return { list, lastId };
    }

    private setTemporaryInputValue(event: Event): void {
        const target = event.target;

        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            this.temporaryInputValue = target.value;
        } else {
            console.error('Event target is not an input or textarea.');
        }
    }

    private setOnClickHandler(callback: EventCallback = null): void {
        if (this.element && typeof callback === 'function') {
            this.element.addEventListener('click', (event: Event) => callback(event));
        } else if (!this.element) {
            console.error('Cannot set event listener: element is null.');
        }
    }

    private setKeyupHandler(callback: EventCallback = null): void {
        if (this.element && typeof callback === 'function') {
            this.element.addEventListener('keyup', (event: Event) => callback(event));
        } else if (!this.element) {
            console.error('Cannot set event listener: element is null.');
        }
    }
}
