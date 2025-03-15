import View from '../view';
import type Router from '../../router/router';
import type { ViewCommon } from '../../../types';

const CssClasses = {
    MAIN: 'main',
};

export default class MainView extends View {
    constructor(router: Router) {
        /**
         * @type {import('../view').ViewParams}
         */
        const parameters = {
            tag: 'main',
            classNames: [CssClasses.MAIN],
        };
        super(parameters);
    }

    /**
     * @param {View} content
     */
    public setContent(content: ViewCommon): void {
        // const htmlElement = this.viewElementCreator.getElement();
        // while (htmlElement.firstElementChild) {
        //   htmlElement.firstElementChild.remove();
        // }
        // this.viewElementCreator.addInnerElement(content.getHtmlElement());
    }
}
