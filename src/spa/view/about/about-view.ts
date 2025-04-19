import './about.scss';
import View from '../view';
import SessionStorageState from '../../state/session-storage-state';
import Router from '../../router/router';
import {
  aboutListItemParameters,
  aboutListItemTextParameters,
  aboutListParameters,
  aboutParameters,
  aboutSubtitleParameters,
  aboutTitleParameters,
  descriptionParameters,
  navigationButtonParameters, personalLinkParameters
} from './about-view-parameters';
import CreatorElement from '../../util/creator-element';
import { aboutContent } from './about-constants';
import { Callback, ElementParameters } from '../../../types';
import ButtonCreator from '../../util/button/button-creator';
import { generateLogoLink } from '../../util/create-svg/create-svg';
import { gitLinkParameters } from '../footer/footer-view-parameters';
import { gitSvgElements } from '../../util/create-svg/data';
import { footerLinks } from '../footer/footer-constants';

export default class AboutView extends View {
  public router: Router;
  private generateLogoLink = generateLogoLink;
  private readonly state: SessionStorageState;


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
    const titleCreator = new CreatorElement(aboutTitleParameters)
    this.viewElementCreator.addInnerElement(titleCreator)
  }

  private addSubtitle(): void {
    const subtitleCreator = new CreatorElement(aboutSubtitleParameters)
    this.viewElementCreator.addInnerElement(subtitleCreator)
  }

  private addItemsList(): void {
    const listCreator = new CreatorElement(aboutListParameters)

    aboutContent.DESCRIPTION_LIST.forEach(item => {
      const itemCreator = new CreatorElement(aboutListItemParameters)

      const aboutListItemTextParametersWithContent: ElementParameters = {
        ...aboutListItemTextParameters,
        textContent: item
      }
      const listItemTextCreator = new CreatorElement(aboutListItemTextParametersWithContent)

      itemCreator.addInnerElement(listItemTextCreator);
      listCreator.addInnerElement(itemCreator)
    })
    this.viewElementCreator.addInnerElement(listCreator)
  }

  private addDescription(): void {
    const descriptionCreator = new CreatorElement(descriptionParameters)
    this.viewElementCreator.addInnerElement(descriptionCreator)
  }

  private addPersonalLink(): void {
    this.generateLogoLink(gitLinkParameters, gitSvgElements, this.viewElementCreator, footerLinks.GIT.link, aboutContent.LINK_COLOR, aboutContent.VIEWBOX, footerLinks.GIT.svgID);
    this.addLink();
  }

  private addLink(): void {
    const creatorLink = new CreatorElement(personalLinkParameters);
    creatorLink.getElement().setAttribute('href', footerLinks.GIT.link);
    creatorLink.getElement().setAttribute('target', '_blank');
    this.viewElementCreator.addInnerElement(creatorLink);
  }

  private addNavigationButton(): void {
    const callback: Callback = this.navigateToPrevPage;
    const navigationButtonParametersWithCB: ElementParameters = {
      ...navigationButtonParameters,
      callback
    }
    const navigationButton = new ButtonCreator(navigationButtonParametersWithCB)
    this.viewElementCreator.addInnerElement(navigationButton)
  }

  private navigateToPrevPage = (): void => {
    globalThis.history.back();
  }
}
