import View from '../../view';
import './not-found.scss';
import type { ElementParameters } from '../../../../types';
import type Router from '../../../router/router';
import ButtonCreator from '../../../util/button/button-creator';
import { backToHomeButtonParameters, notFoundTitleParameters } from '../index/index-view-elements-parameters';
import { ButtonNames, Pages } from '../../../../types';
import CreatorElement from '../../../util/creator-element';

const CssClasses = {
    ERROR: 'not-found',
};

export default class NotFoundView extends View {
    public router: Router;

    constructor(router: Router) {
        const parameters: ElementParameters = {
            tag: 'section',
            classNames: [CssClasses.ERROR],
        };
        super(parameters);
        this.router = router;
        this.configureView();
    }

    public configureView(): void {
        const creatorTitle = new CreatorElement(notFoundTitleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);

        const creatorButton = new ButtonCreator(backToHomeButtonParameters);
        const callback = (): void => this.router.navigate(Pages.INDEX);
        creatorButton.setCallback(callback);

        this.viewElementCreator.addInnerElement(creatorButton);
    }
}
