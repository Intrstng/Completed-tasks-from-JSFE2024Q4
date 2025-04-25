import { CSS_BUTTON } from './button-classes';
import CreatorElement from '../creator-element';

export function toggleButtonActiveClass(button: CreatorElement): void {
    const buttonElement: HTMLElement | HTMLCanvasElement | null = button.getElement();
    if (buttonElement) {
        const isActive: boolean = CreatorElement.hasClasses(buttonElement, [CSS_BUTTON.ACTIVE]);
        if (isActive) {
            button.removeCssClasses([CSS_BUTTON.ACTIVE]);
            button.setCssClasses([CSS_BUTTON.INACTIVE]);
        } else {
            button.setCssClasses([CSS_BUTTON.ACTIVE]);
            button.removeCssClasses([CSS_BUTTON.INACTIVE]);
        }
    }
}
