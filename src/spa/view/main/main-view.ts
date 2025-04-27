import View from '../view';
import type { ViewCommon } from '../../../types';

const CssClassesMainView = {
    MAIN: 'main',
};

const MainViewParameters = {
    tag: 'main',
    classNames: [CssClassesMainView.MAIN],
};

export default class MainView extends View {
    constructor() {
        super(MainViewParameters);
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
