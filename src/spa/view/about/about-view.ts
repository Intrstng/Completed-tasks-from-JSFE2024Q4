import './about.scss';
import View from '../view';
import type SessionStorageState from '../../state/session-storage-state';
import type Router from '../../router/router';
import {
    aboutListItemParameters,
    aboutListItemTextParameters,
    aboutListParameters,
    aboutParameters,
    aboutSubtitleParameters,
    aboutTitleParameters,
    descriptionParameters,
    gitLinkParameters,
    navigationButtonParameters,
    socialLinksContainerParameters,
} from './about-view-parameters';
import CreatorElement from '../../components/creator-element';
import { aboutContent, aboutLinks } from '../../../constants/about-constants';
import type { ElementParameters } from '../../../types';
import ButtonCreator from '../../components/button/button-creator';
import { generateLogoLink } from '../../components/svg/create-svg';
import { gitSvgElements } from '../../components/svg/data';
import type { LinkCreatorCB } from '../../components/link/types';
import { createLink } from '../../components/link/link-creator';
import type { GenerateLogoLink } from '../../components/svg/types';

export default class AboutView extends View {
    public router: Router;
    private generateLogoLink: GenerateLogoLink = generateLogoLink;
    private createLink: LinkCreatorCB = createLink;

    constructor(state: SessionStorageState, router: Router) {
        super(aboutParameters);
        this.router = router;
        this.configureView();
    }

    private configureView(): void {
        this.addTitle();
        this.addSubtitle();
        this.addItemsList();
        this.addDescription();
        this.addPersonalLink();
        this.addNavigationButton();
    }

    private addTitle(): void {
        const titleCreator = new CreatorElement(aboutTitleParameters);
        this.viewElementCreator.addInnerElement(titleCreator);
    }

    private addSubtitle(): void {
        const subtitleCreator = new CreatorElement(aboutSubtitleParameters);
        this.viewElementCreator.addInnerElement(subtitleCreator);
    }

    private addItemsList(): void {
        const listCreator = new CreatorElement(aboutListParameters);

        aboutContent.DESCRIPTION_LIST.forEach(item => {
            const itemCreator = new CreatorElement(aboutListItemParameters);

            const aboutListItemTextParametersWithContent: ElementParameters = {
                ...aboutListItemTextParameters,
                textContent: item,
            };
            const listItemTextCreator = new CreatorElement(aboutListItemTextParametersWithContent);

            itemCreator.addInnerElement(listItemTextCreator);
            listCreator.addInnerElement(itemCreator);
        });
        this.viewElementCreator.addInnerElement(listCreator);
    }

    private addDescription(): void {
        const descriptionCreator = new CreatorElement(descriptionParameters);
        this.viewElementCreator.addInnerElement(descriptionCreator);
    }

    private addPersonalLink(): void {
        const socialLinksContainerCreator = new CreatorElement(socialLinksContainerParameters);

        this.generateLogoLink(
            gitLinkParameters,
            gitSvgElements,
            socialLinksContainerCreator,
            aboutLinks.GIT.link,
            aboutContent.LINK_COLOR,
            aboutContent.VIEW_BOX,
            aboutLinks.GIT.svgID
        );
        this.createLink(socialLinksContainerCreator);

        this.viewElementCreator.addInnerElement(socialLinksContainerCreator);
    }

    private addNavigationButton(): void {
        const navigationButtonParametersWithCB: ElementParameters = {
            ...navigationButtonParameters,
            callback: () => globalThis.history.back(),
        };
        const navigationButton = new ButtonCreator(navigationButtonParametersWithCB);
        this.viewElementCreator.addInnerElement(navigationButton);
    }
}
