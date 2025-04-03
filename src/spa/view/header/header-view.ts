import './header.scss';
import View from '../view';
import LinkView from './link/link-view';
import CreatorElement from '../../util/creator-element';
import { Pages } from '../../../types';
import Router from '../../router/router';
import {
    titleParameters,
    headerParameters,
    navigationParameters,
    LinkNames,
    PagesNames,
} from './headers-view-parameters';
import { LinkElements, PageParameters } from './types';

export default class HeaderView extends View {
    public headerLinkElements: LinkElements;

    constructor(router: Router) {
        super(headerParameters);

        this.headerLinkElements = new Map();
        this.configureView(router);
    }

    public setSelectedItem(namePage: Pages): void {
        const linkItem = this.headerLinkElements.get(namePage);
        if (linkItem instanceof LinkView) {
            linkItem.setSelectedStatus();
        }
    }

    private configureView(router: Router): void {
        const creatorTitle = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);

        const creatorNav = new CreatorElement(navigationParameters);
        this.viewElementCreator.addInnerElement(creatorNav);

        Object.keys(LinkNames).forEach(key => {
            const pageParam: PageParameters = {
                name: LinkNames[key],
                callback: () => router.navigate(PagesNames[key]),
            };
            const linkElement = new LinkView(pageParam, this.headerLinkElements);
            creatorNav.addInnerElement(linkElement.getHtmlElement());
            this.headerLinkElements.set(PagesNames[key], linkElement);
        });

        this.viewElementCreator.addInnerElement(creatorNav);
    }
}
