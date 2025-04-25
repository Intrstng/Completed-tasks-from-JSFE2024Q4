import CreatorElement from '../creator-element';
import { personalLinkParameters } from '../../view/about/about-view-parameters';
import { footerLinks } from '../../../constants/footer-constants';

export function createLink(container: CreatorElement): void {
    const creatorLink = new CreatorElement(personalLinkParameters);
    const linkElement: HTMLElement | HTMLCanvasElement | null = creatorLink.getElement();
    if (linkElement && linkElement instanceof HTMLElement) {
        linkElement.setAttribute('href', footerLinks.GIT.link);
        linkElement.setAttribute('target', '_blank');
    }
    container.addInnerElement(creatorLink);
}
