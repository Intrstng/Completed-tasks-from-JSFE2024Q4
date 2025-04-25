import type CreatorElement from '../../components/creator-element';
import { CSS_LOGIN } from '../../view/login/login-classes';

export function toggleShowErrorMessage(errorElement: CreatorElement, isShown: boolean): void {
    if (isShown) {
        errorElement.removeCssClasses([CSS_LOGIN.HIDDEN]);
    } else {
        errorElement.setCssClasses([CSS_LOGIN.HIDDEN]);
    }
}
