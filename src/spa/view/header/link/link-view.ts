import './link.scss';
import View from '../../view';
import { LinkElements, PageParameters } from '../types';
import { linkParameters } from '../headers-view-parameters';
import { CSS_HEADER } from '../header-classes';

export default class LinkView extends View {
    private readonly linkElements: LinkElements;

    constructor(pageParam: PageParameters, linkElements: LinkElements) {
        super(linkParameters);
        this.linkElements = linkElements;
        this.configureView(pageParam);
    }

    public setNotSelectedStatus(): void {
        const element = this.viewElementCreator.getElement();
        element.classList.remove(CSS_HEADER.ITEM_SELECTED);
    }

    public setSelectedStatus(): void {
        this.linkElements.forEach(linkElement => linkElement.setNotSelectedStatus());

        const element = this.viewElementCreator.getElement();
        element.classList.add(CSS_HEADER.ITEM_SELECTED);
    }

    private configureView(pageParam: PageParameters): void {
        this.viewElementCreator.setTextContent(pageParam.name);
        this.viewElementCreator.setCallback(pageParam.callback);

        const element = this.viewElementCreator.getElement();
        element.addEventListener('click', this.setSelectedStatus.bind(this));
    }
}
