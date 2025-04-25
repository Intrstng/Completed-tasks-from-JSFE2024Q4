import CreatorElement from '../creator-element';
import { personalLinkParameters } from '../../view/about/about-view-parameters';
import { footerLinks } from '../../../constants/footer-constants';
import { Attributes } from '../../../types';

export function createLink(container: CreatorElement): void {
    const creatorLink = new CreatorElement(personalLinkParameters);
    const linkElement: HTMLElement | HTMLCanvasElement | null = creatorLink.getElement();
    if (linkElement && linkElement instanceof HTMLElement) {
        linkElement.setAttribute(Attributes.HREF, footerLinks.GIT.link);
        linkElement.setAttribute(Attributes.TARGET, Attributes.BLANK);
    }
    container.addInnerElement(creatorLink);
}
