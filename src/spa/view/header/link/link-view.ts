import './link.scss';
import View from '../../view';
import { LinkElements, PageParameters } from '../types';
import { linkParameters } from '../headers-view-parameters';
import { CssClasses } from '../../../../types';

export default class LinkView extends View {
    private readonly linkElements: LinkElements;

    constructor(pageParam: PageParameters, linkElements: LinkElements) {
        super(linkParameters);
        this.linkElements = linkElements;
        this.configureView(pageParam);
    }

    public setNotSelectedStatus(): void {
        const element = this.viewElementCreator.getElement();
        element.classList.remove(CssClasses.ITEM_SELECTED);
    }

    public setSelectedStatus(): void {
        this.linkElements.forEach(linkElement => linkElement.setNotSelectedStatus());

        const element = this.viewElementCreator.getElement();
        element.classList.add(CssClasses.ITEM_SELECTED);
    }

    private configureView(pageParam: PageParameters): void {
        this.viewElementCreator.setTextContent(pageParam.name);
        this.viewElementCreator.setCallback(pageParam.callback);

        const element = this.viewElementCreator.getElement();
        element.addEventListener('click', this.setSelectedStatus.bind(this));
    }
}
