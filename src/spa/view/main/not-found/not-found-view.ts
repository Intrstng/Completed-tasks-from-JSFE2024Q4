import View from '../../view';
import './not-found.scss';
import type { ElementParameters } from '../../../../types';
import { Pages } from '../../../../types';
import type Router from '../../../router/router';
import ButtonCreator from '../../../util/button/button-creator';
import { backToHomeButtonParameters, notFoundTitleParameters } from '../index/index-view-elements-parameters';
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
        creatorButton.setCallback(this.handleBackToHome);

        this.viewElementCreator.addInnerElement(creatorButton);
    }

    private handleBackToHome = (): void => {
        this.router.navigate(Pages.INDEX);
    };
}
