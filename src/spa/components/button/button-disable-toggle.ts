import { CSS_BUTTON } from './button-classes';
import CreatorElement from '../creator-element';

export function toggleButtonActiveClass(button: CreatorElement): void {
    const buttonElement: HTMLElement | HTMLCanvasElement | null = button.getElement();
    if (buttonElement) {
        const isActive: boolean = CreatorElement.hasClasses(buttonElement, [CSS_BUTTON.ACTIVE]);
        if (isActive && 'classList' in buttonElement) {
            buttonElement.classList.remove(CSS_BUTTON.ACTIVE);
            buttonElement.classList.add(CSS_BUTTON.INACTIVE);
        } else if ('classList' in buttonElement) {
            buttonElement.classList.add(CSS_BUTTON.ACTIVE);
            buttonElement.classList.remove(CSS_BUTTON.INACTIVE);
        }
    }
}
