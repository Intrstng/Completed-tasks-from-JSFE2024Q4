import './selector.scss';
import View from '../../view';
import type LocalStorageState from '../../../state/local-storage-state';
import type Router from '../../../router/router';

const CssClasses = {
    PRODUCT: 'product',
};

export default class SelectorView extends View {
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
            classNames: [CssClasses.PRODUCT],
        };
        super(parameters);
        //
        // if (id) {
        //   this.addLargeCardToView(router, id);
        // } else {
        //   this.addSmallCardsToView(router);
        // }
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
    //
    // /**
    //  * @param {import('../../../router/router').default} router
    //  * @param {string} id
    //  */
    // addLargeCardToView(router, id) {
    //   const selectedCard = cardsInfo.find((card) => card.id === id);
    //   const largeCardComponent = new CardDetailView(selectedCard, router);
    //   this.viewElementCreator.addInnerElement(largeCardComponent.getHtmlElement());
    // }
}
