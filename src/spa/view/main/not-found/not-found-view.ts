import View from '../../view';
import './not-found.scss';
import type { ElementParameters } from '../../../../types';
import type Router from '../../../router/router';
import ButtonCreator from '../../../util/button/button-creator';
import { backToHomeButtonParameters } from '../index/index-view-elements-parameters';
import { Pages } from '../../../../types';

const CssClasses = {
    ERROR: 'not-found',
};

export default class NotFoundView extends View {
    private notFoundMessage: string = 'Error 404. Page is not found.';
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
        this.viewElementCreator.setTextContent(this.notFoundMessage);

        const creatorButton = new ButtonCreator(backToHomeButtonParameters);
        const callback = (): void => this.router.navigate(Pages.INDEX);
        creatorButton.setCallback(callback);
        this.viewElementCreator.addInnerElement(creatorButton);
    }
}
