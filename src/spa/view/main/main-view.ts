import View from '../view';
import type Router from '../../router/router';
import type { ViewCommon } from '../../../types';
import NotFoundView from './not-found/not-found-view';

const CssClasses = {
    MAIN: 'main',
};

export default class MainView extends View {
    constructor() {
        const parameters = {
            tag: 'main',
            classNames: [CssClasses.MAIN],
        };
        super(parameters);
    }

    public setContent(content: ViewCommon): void {
        const htmlElement = this.viewElementCreator.getElement();

        if (htmlElement instanceof HTMLElement) {
            while (htmlElement.firstElementChild) {
                htmlElement.firstElementChild.remove();
            }

            const contentElement = content.getHtmlElement();
            if (contentElement instanceof HTMLElement) {
                this.viewElementCreator.addInnerElement(contentElement);
            } else {
                console.error('Content element is null or undefined.');
            }
        } else {
            console.error('HTML element is null or undefined or not an HTMLElement.');
        }
    }
}
