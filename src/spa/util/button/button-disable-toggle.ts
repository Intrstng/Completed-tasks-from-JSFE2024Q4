import { CssClasses } from '../../../types';

export function toggleDisabledAllCarButtons(id: number, isDisabled: boolean): void {
    const carStartButtonID = `${CssClasses.BUTTON_START}-${id}`;
    const carSelectButtonID = `${CssClasses.BUTTON_SELECT}-${id}`;
    const carRemoveButtonID = `${CssClasses.BUTTON_REMOVE}-${id}`;
    const carBackButtonID = `${CssClasses.BUTTON_BACK}-${id}`;
    [carStartButtonID, carSelectButtonID, carRemoveButtonID, carBackButtonID].forEach(buttonID => {
        carButtonToggleDisable(buttonID, isDisabled);
    });
}

export function toggleDisabledDragRaceControlButtons(isDisabled: boolean): void {
    const buttons = document.getElementsByClassName(CssClasses.BUTTON_CONTROLS);
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            if (button instanceof HTMLButtonElement && !button.classList.contains(CssClasses.BUTTON_RACE)) {
                button.disabled = isDisabled;
            }
        });
    }
}

export function toggleDisabledManageCarButtons(isDisabled: boolean): void {
    const createCarButton: Element = document.getElementsByClassName(CssClasses.BUTTON_CREATE)[0];
    const updateCarButton: Element = document.getElementsByClassName(CssClasses.BUTTON_UPDATE)[0];
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
    const buttons = document.getElementsByClassName(CssClasses.BUTTON_RACE);
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
    const prevPageButton: Element = document.getElementsByClassName(CssClasses.BUTTON_PREV)[0];
    const nextPageButton: Element = document.getElementsByClassName(CssClasses.BUTTON_NEXT)[0];
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
    const buttons = document.getElementsByClassName(CssClasses.BUTTON);
    if (buttons.length > 0) {
        Array.from(buttons).forEach(button => {
            if (button instanceof HTMLButtonElement) {
                button.disabled = isDisabled;
            }
        });
    }
}
