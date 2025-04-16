import { CSS_BUTTON } from './button-classes';
import CreatorElement from '../creator-element';

export function toggleDisabledAllCarButtons(id: number, isDisabled: boolean): void {
    const carStartButtonID = `${CSS_BUTTON.BUTTON_START}-${id}`;
    const carSelectButtonID = `${CSS_BUTTON.BUTTON_SELECT}-${id}`;
    const carRemoveButtonID = `${CSS_BUTTON.BUTTON_REMOVE}-${id}`;
    const carBackButtonID = `${CSS_BUTTON.BUTTON_BACK}-${id}`;
    [carStartButtonID, carSelectButtonID, carRemoveButtonID, carBackButtonID].forEach(buttonID => {
        carButtonToggleDisable(buttonID, isDisabled);
    });
}

export function toggleDisabledDragRaceControlButtons(isDisabled: boolean): void {
    const buttons = document.getElementsByClassName(CSS_BUTTON.BUTTON_CONTROLS);
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            if (button instanceof HTMLButtonElement && !button.classList.contains(CSS_BUTTON.BUTTON_RACE)) {
                button.disabled = isDisabled;
            }
        });
    }
}

export function toggleDisabledManageCarButtons(isDisabled: boolean): void {
    const createCarButton: Element = document.getElementsByClassName(CSS_BUTTON.BUTTON_CREATE)[0];
    const updateCarButton: Element = document.getElementsByClassName(CSS_BUTTON.BUTTON_UPDATE)[0];
    let buttons: HTMLButtonElement[] = [];
    if (createCarButton instanceof HTMLButtonElement && updateCarButton instanceof HTMLButtonElement) {
        buttons = [createCarButton, updateCarButton];
    }
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            if (button instanceof HTMLButtonElement) {
                button.disabled = isDisabled;
            }
        });
    }
}

export function raceButtonToggleDisable(isDisabled: boolean): void {
    const buttons = document.getElementsByClassName(CSS_BUTTON.BUTTON_RACE);
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            console.log(button);
            if (button instanceof HTMLButtonElement) {
                button.disabled = isDisabled;
            }
        });
    }
}

export function togglePaginationButtons(isDisabled: boolean): void {
    const prevPageButton: Element = document.getElementsByClassName(CSS_BUTTON.BUTTON_PREV)[0];
    const nextPageButton: Element = document.getElementsByClassName(CSS_BUTTON.BUTTON_NEXT)[0];
    let buttons: HTMLButtonElement[] = [];
    if (prevPageButton instanceof HTMLButtonElement && nextPageButton instanceof HTMLButtonElement) {
        buttons = [prevPageButton, nextPageButton];
    }
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            if (button instanceof HTMLButtonElement) {
                button.disabled = isDisabled;
            }
        });
    }
}

export function carButtonToggleDisable(buttonID: string, isDisabled: boolean): void {
    const button = document.getElementById(buttonID);
    if (button instanceof HTMLButtonElement) {
        button.disabled = isDisabled;
    }
}

export function allGarageButtonsToggleDisable(isDisabled: boolean): void {
    const buttons = document.getElementsByClassName(CSS_BUTTON.BUTTON);
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            if (button instanceof HTMLButtonElement) {
                button.disabled = isDisabled;
            }
        });
    }
}

export function toggleButtonActiveClass(button: CreatorElement): void {
    const buttonElement: HTMLElement = button.getElement();
    const isActive: boolean = CreatorElement.hasClasses(buttonElement, [CSS_BUTTON.ACTIVE]);
    if (isActive) {
        buttonElement.classList.remove(CSS_BUTTON.ACTIVE);
        buttonElement.classList.add(CSS_BUTTON.INACTIVE);
    } else {
        buttonElement.classList.add(CSS_BUTTON.ACTIVE);
        buttonElement.classList.remove(CSS_BUTTON.INACTIVE);
    }
}
