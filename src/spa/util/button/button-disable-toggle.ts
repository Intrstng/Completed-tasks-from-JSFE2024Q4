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
    const buttons = document.querySelectorAll(`.${CSS_BUTTON.BUTTON_CONTROLS}`);
    buttons.forEach(button => {
        if (button instanceof HTMLButtonElement && !button.classList.contains(CSS_BUTTON.BUTTON_RACE)) {
            button.disabled = isDisabled;
        }
    });
}

export function toggleDisabledManageCarButtons(isDisabled: boolean): void {
    const createCarButton = document.querySelector(`.${CSS_BUTTON.BUTTON_CREATE}`);
    const updateCarButton = document.querySelector(`.${CSS_BUTTON.BUTTON_UPDATE}`);

    const buttons: HTMLButtonElement[] = [];

    if (createCarButton instanceof HTMLButtonElement) {
        buttons.push(createCarButton);
    }
    if (updateCarButton instanceof HTMLButtonElement) {
        buttons.push(updateCarButton);
    }

    buttons.forEach(button => {
        button.disabled = isDisabled;
    });
}

export function raceButtonToggleDisable(isDisabled: boolean): void {
    const buttons = document.querySelectorAll(`.${CSS_BUTTON.BUTTON_RACE}`);
    buttons.forEach(button => {
        if (button instanceof HTMLButtonElement) {
            button.disabled = isDisabled;
        }
    });
}

export function togglePaginationButtons(isDisabled: boolean): void {
    const previousPageButton = document.querySelector(`.${CSS_BUTTON.BUTTON_PREV}`);
    const nextPageButton = document.querySelector(`.${CSS_BUTTON.BUTTON_NEXT}`);

    const buttons: HTMLButtonElement[] = [];

    if (previousPageButton instanceof HTMLButtonElement) {
        buttons.push(previousPageButton);
    }
    if (nextPageButton instanceof HTMLButtonElement) {
        buttons.push(nextPageButton);
    }

    buttons.forEach(button => {
        button.disabled = isDisabled;
    });
}

export function carButtonToggleDisable(buttonID: string, isDisabled: boolean): void {
    const button = document.querySelector<HTMLButtonElement>(`#${buttonID}`);
    if (button instanceof HTMLButtonElement) {
        button.disabled = isDisabled;
    }
}

export function allGarageButtonsToggleDisable(isDisabled: boolean): void {
    const buttons = document.querySelectorAll(`.${CSS_BUTTON.BUTTON}`);
    buttons.forEach(button => {
        if (button instanceof HTMLButtonElement) {
            button.disabled = isDisabled;
        }
    });
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
