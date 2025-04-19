import './footer.scss';
import View from '../view';
import CreatorElement from '../../util/creator-element';
import { copyrightParameters, footerParameters, gitLinkParameters, rsLinkParameters } from './footer-view-parameters';
import { generateLogoLink } from '../../util/create-svg/create-svg';
import { footerLinks } from './footer-constants';
import { gitSvgElements, rsSvgElements } from '../../util/create-svg/data';


export default class FooterView extends View {
    private generateLogoLink = generateLogoLink;
    constructor() {
        super(footerParameters);
        this.configureView();
    }

    private configureView(): void {
        this.generateCopyrightTitle();

        this.generateLogoLink(gitLinkParameters, gitSvgElements, footerLinks.GIT.link, footerLinks.GIT.color, footerLinks.GIT.viewBox, footerLinks.GIT.svgID);

        this.generateLogoLink(rsLinkParameters, rsSvgElements, footerLinks.RS.link, footerLinks.RS.color, footerLinks.RS.viewBox, footerLinks.RS.svgID);
    }

    private generateCopyrightTitle(): void {
        const creatorCopyrightTitle = new CreatorElement(copyrightParameters);
        this.viewElementCreator.addInnerElement(creatorCopyrightTitle);
    }
}
