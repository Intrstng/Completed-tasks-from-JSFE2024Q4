import './header.scss';
import View from '../view';
import LinkView from './link/link-view';
import CreatorElement from '../../util/creator-element';
import type { Pages } from '../../../types';
import type Router from '../../router/router';
import { headerParameters, navigationParameters, titleParameters } from './headers-view-parameters';
import type { LinkElements, PageParameters } from './types';
import { isValidPage } from '../../util/assertion-functions/assertion-functions';
import { LinkNames, PagesNames } from './header-constants';

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
            const keyLinkNames: unknown = LinkNames[key];

            if (!isValidPage(keyLinkNames)) {
                console.log(keyLinkNames)
                throw new Error(`Invalid key: ${key}`);
            }

            const pageParameter: PageParameters = {
                name: keyLinkNames,
                callback: (): void => router.navigate(PagesNames[key]),
            };

            const linkElementCreator = new LinkView(pageParameter, this.headerLinkElements);
            const linkElement: HTMLElement | null = linkElementCreator.getHtmlElement();

            if (linkElement) {
                creatorNav.addInnerElement(linkElement);
            }

            this.headerLinkElements.set(PagesNames[key], linkElementCreator);
        });

        this.viewElementCreator.addInnerElement(creatorNav);
    }
}
