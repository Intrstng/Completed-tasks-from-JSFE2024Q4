import '../style.scss';

import type { ViewCommon } from '../types';
import { AppInfo, AppStateKeys, Pages } from '../types';
import Router from './router/router';
import MainView from './view/main/main-view';
import type LocalStorageState from './state/session-storage-state';
import SessionStorageState from './state/session-storage-state';
import HeaderView from './view/header/header-view';
import FooterView from './view/footer/footer-view';
import { PagesNames } from '../constants/header-constants';
import ApiController from './api/api-controller';
import CreatorDialog from './components/dialog/dialog-creator';
import { dialogContentParameters, dialogParameters } from './components/dialog/dialog-view-parameters';
import { API_CONSTANTS } from '../constants/api-constants';
import type { AuthedPathRoute, Route } from './router/types';

export default class App {
    public api: ApiController;
    private readonly appName: string = AppInfo.NAME;
    private readonly keyToRecordInLS: string = AppInfo.KEY_LS;
    private readonly router: Router;
    private header: HeaderView | null = null;
    private main: MainView | null = null;
    private footer: FooterView | null = null;
    private readonly dialog: CreatorDialog = new CreatorDialog(dialogParameters, dialogContentParameters);
    private readonly state: SessionStorageState = new SessionStorageState(this.keyToRecordInLS);
    private isLogged = true;

    constructor() {
        this.dialog.addDialogToLayout();
        const routes = this.createRoutes();
        this.router = new Router(routes);
        this.api = new ApiController(this.state, this.router, this.dialog, API_CONSTANTS);
        this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
        this.router.setHashHandler();
        this.createView();

        this.init();
    }

    public createView(): void {
        this.createHeader();

        this.main = new MainView();
        const mainElement: HTMLElement | null = this.main.getHtmlElement();

        if (mainElement) {
            document.body.append(mainElement);
        } else {
            console.error('Main view element is null and cannot be appended to the body.');
        }

        this.createFooter();
    }

    public createRoutes(): Route[] {
        return [
            this.getRouteForAuthedPath(Pages.EMPTY),
            this.getRouteForAuthedPath(Pages.CHAT),
            {
                path: `${Pages.ABOUT}`,
                callback: async (): Promise<void> => {
                    await this.loadAboutView(this.state);
                },
            },
            {
                path: `${Pages.LOGIN}`,
                callback: async (): Promise<void> => {
                    this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
                    if (this.isLogged) {
                        this.router.navigate(PagesNames.CHAT);
                    } else {
                        await this.loadLoginView(this.state);
                    }
                },
            },
        ];
    }

    public getRouteForAuthedPath(path: Pages): AuthedPathRoute {
        return {
            path: `${path}`,
            callback: async (): Promise<void> => {
                this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
                if (this.isLogged) {
                    await this.loadChatView(this.state);
                } else {
                    this.router.navigate(PagesNames.LOGIN);
                }
            },
        };
    }

    public setContent(page: Pages, view: ViewCommon): void {
        if (this.main instanceof MainView) {
            this.main.setContent(view);
        } else {
            console.error('Cannot set content: Main view is not initialized');
        }
    }

    private async loadChatView(state: LocalStorageState): Promise<void> {
        const { default: ChatView } = await import('./view/main/chat/chat-view');
        this.createHeader();
        this.setContent(Pages.CHAT, new ChatView(state, this.router, this.api));
        this.createFooter();
    }

    private async loadAboutView(state: LocalStorageState): Promise<void> {
        const { default: AboutView } = await import('./view/about/about-view');
        this.removeHeader();
        this.removeFooter();
        this.setContent(Pages.ABOUT, new AboutView(state, this.router));
    }

    private async loadLoginView(state: LocalStorageState): Promise<void> {
        const { default: LoginView } = await import('./view/login/login-view');
        this.removeHeader();
        this.removeFooter();
        this.setContent(Pages.LOGIN, new LoginView(state, this.router, this.api));
    }

    private createHeader(): void {
        if (!this.header) {
            this.header = new HeaderView(this.state, this.router, this.api);
            const headerElement: HTMLElement | null = this.header.getHtmlElement();
            if (headerElement) {
                document.body.prepend(headerElement);
            } else {
                console.error('Header view element is null and cannot be appended to the body.');
            }
        }
    }

    private removeHeader(): void {
        if (this.header) {
            const headerElement = this.header.getHtmlElement();
            if (headerElement) {
                headerElement.remove();
            }
            this.header = null;
        }
    }

    private createFooter(): void {
        if (!this.footer) {
            this.footer = new FooterView();
            const footerElement: HTMLElement | null = this.footer.getHtmlElement();
            if (footerElement) {
                document.body.append(footerElement);
            } else {
                console.error('Footer view element is null and cannot be appended to the body.');
            }
        }
    }

    private removeFooter(): void {
        if (this.footer) {
            const footerElement = this.footer.getHtmlElement();
            if (footerElement) {
                footerElement.remove();
            }
            this.footer = null;
        }
    }

    private init(): void {
        console.log(`Application ${this.appName} initialized...`);
    }
}
