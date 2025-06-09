import './link.scss';
import View from '../../view';
import type { LinkElements } from '../types';
import { linkParameters } from '../headers-view-parameters';
import { CSS_HEADER } from '../header-classes';
import type { PageParameters } from '../../../../types';

export default class LinkView extends View {
    private readonly linkElements: LinkElements;

    constructor(pageParameter: PageParameters, linkElements: LinkElements) {
        super(linkParameters);
        this.linkElements = linkElements;
        this.configureView(pageParameter);
    }

    public setNotSelectedStatus(): void {
        const element = this.viewElementCreator.getElement();
        if (element && 'classList' in element) {
            element.classList.remove(CSS_HEADER.ITEM_SELECTED);
        }
    }

    public setSelectedStatus(): void {
        this.linkElements.forEach(linkElement => linkElement.setNotSelectedStatus());

        const element = this.viewElementCreator.getElement();
        if (element && 'classList' in element) {
            element.classList.add(CSS_HEADER.ITEM_SELECTED);
        }
    }

    private configureView(pageParameter: PageParameters): void {
        this.viewElementCreator.setTextContent(pageParameter.name);
        this.viewElementCreator.setCallback(pageParameter.callback);

        const element = this.viewElementCreator.getElement();
        if (element && 'addEventListener' in element) {
            element.addEventListener('click', this.setSelectedStatus.bind(this));
        }
    }
}
