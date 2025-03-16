import './selector.scss';
import View from '../../view';
import type LocalStorageState from '../../../state/local-storage-state';
import type Router from '../../../router/router';

const CssClasses = {
    SELECTOR: 'selector',
};

export default class SelectorView extends View {
    public router: Router;
    // /**
    //  * @param {string} id
    //  * @param {import('../../../router/router').default} router
    //  */
    constructor(state: LocalStorageState, router: Router) {
        /**
         * @type {import('../../view').ViewParams}
         */
        const parameters = {
            tag: 'section',
            classNames: [CssClasses.SELECTOR],
        };
        super(parameters);
        this.router = router;
        //
        // if (id) {
        //   this.addLargeCardToView(router, id);
        // } else {
        //   this.addSmallCardsToView(router);
        // }
        this.viewElementCreator.setTextContent('Selector');
    }
    //
    // /**
    //  * @param {import('../../../router/router').default} router
    //  */
    // addSmallCardsToView(router) {
    //   cardsInfo.forEach((card) => {
    //     const smallCardComponent = new CardView(card, router);
    //     this.viewElementCreator.addInnerElement(smallCardComponent.getHtmlElement());
    //   });
    // }
}
