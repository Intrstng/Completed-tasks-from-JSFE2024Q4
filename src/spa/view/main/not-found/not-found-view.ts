import View from '../../view';
import './not-found.scss';
import type { ElementParameters } from '../../../../types';

const CssClasses = {
    ERROR: 'not-found',
};

export default class NotFoundView extends View {
    private notFoundMessage: string = 'Error 404. Page is not found.';

    constructor() {
        const parameters: ElementParameters = {
            tag: 'section',
            classNames: [CssClasses.ERROR],
        };
        super(parameters);
        this.configureView();
    }

    public configureView(): void {
        this.viewElementCreator.setTextContent(this.notFoundMessage);
    }
}
