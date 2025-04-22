import './header.scss';
import View from '../view';
import CreatorElement from '../../util/creator-element';
import type { Callback, ElementParameters } from '../../../types';
import { AppStateKeys } from '../../../types';
import type Router from '../../router/router';
import {
    buttonNavLogoutParameters,
    headerParameters,
    navigationParameters,
    titleParameters,
    userContainerParameters,
    userNameParameters,
    userTitleParameters
} from './headers-view-parameters';
import { PagesNames } from './header-constants';
import SessionStorageState from '../../state/session-storage-state';
import ButtonCreator from '../../util/button/button-creator';
import { buttonAboutParameters } from '../login/login-view-parameters';
import { sliceNameLength } from '../../util/slice-name-string';
import ApiController from '../../api/api-controller';

export default class HeaderView extends View {
    private router: Router | null;
    private readonly state: SessionStorageState;
    private api: ApiController;
    private readonly userName: string = '';

    constructor(state: SessionStorageState, router: Router, api: ApiController) {
        super(headerParameters);
        this.router = router;
        this.state = state;
        this.api = api;
        this.userName = sliceNameLength(this.state.getState()[AppStateKeys.CURRENT_USER_NAME])
        this.configureView();
    }

    private configureView(): void {
        this.addHeaderTitle();
        this.addCurrentUserName();
        this.addNavigationBlock();
    }

    private addHeaderTitle(): void {
        const titleCreator = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(titleCreator);
    }

    private addCurrentUserName(): void {
        const currentUserContainerCreator = new CreatorElement(userContainerParameters);
        this.viewElementCreator.addInnerElement(currentUserContainerCreator);

        const currentUserTitleCreator = new CreatorElement(userTitleParameters);
        currentUserContainerCreator.addInnerElement(currentUserTitleCreator);

        const userNameParametersWithContent: ElementParameters = {
            ...userNameParameters,
            textContent: this.userName
        }

        const currentUserNameCreator = new CreatorElement(userNameParametersWithContent);
        currentUserContainerCreator.addInnerElement(currentUserNameCreator);
    }

    private addNavigationBlock(): void {
        const navCreator = new CreatorElement(navigationParameters);
        this.viewElementCreator.addInnerElement(navCreator);

        const aboutButtonCallback: Callback = () => this.router.navigate(PagesNames.ABOUT);
        const buttonAboutCreator = new ButtonCreator(buttonAboutParameters);
        buttonAboutCreator.setCallback(aboutButtonCallback);
        navCreator.addInnerElement(buttonAboutCreator);

        const buttonLogoutCreator = new ButtonCreator(buttonNavLogoutParameters);
        buttonLogoutCreator.setCallback(this.userLogOut);
        navCreator.addInnerElement(buttonLogoutCreator);
    }

    private userLogOut = (): void => {
      const { currentUserName, currentUserPass } = this.state.getState();

      this.api.logoutUser(currentUserName, currentUserPass);
    }
}
