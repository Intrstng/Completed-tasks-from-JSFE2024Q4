import '../style.scss';

import type { Route, ViewCommon } from '../types';
import { AppInfo, AppStateKeys, Pages } from '../types';
import Router from './router/router';
import MainView from './view/main/main-view';
import LocalStorageState from './state/session-storage-state';
import HeaderView from './view/header/header-view';
import FooterView from './view/footer/footer-view';
import SessionStorageState from './state/session-storage-state';
import { PagesNames } from './view/header/header-constants';
import ApiController from './api/api-controller';
import CreatorDialog from './util/dialog/dialog-creator';
import { dialogContentParameters, dialogParameters } from './util/dialog/dialog-view-parameters';
import { CONNECTION_ERROR } from './util/dialog/dialog-constants';
import { API_CONSTANTS } from './api/api-constants';

export default class App {
    public api: ApiController;
    private readonly appName: string = AppInfo.NAME;
    private readonly keyToRecordInLS: string = AppInfo.KEY_LS;
    private readonly router: Router;
    private header: HeaderView | null = null;
    private main: MainView | null = null;
    private footer: FooterView | null = null;
    private dialog: CreatorDialog | null = null;
    private readonly state: SessionStorageState;
    private isLogged: boolean = true;

    constructor() {
        this.state = new SessionStorageState(this.keyToRecordInLS);
        this.dialog = new CreatorDialog(dialogParameters, dialogContentParameters)
        this.createDialog(this.dialog);

        const routes = this.createRoutes(this.state);
        this.router = new Router(routes);
        this.api = new ApiController(this.state, this.router, this.dialog, API_CONSTANTS);
        this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
        this.router.setHashHandler();
        this.createView();
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

    public createDialog(dialog: CreatorDialog): void {
        const dialogElement: HTMLElement | null = dialog.getElement();
        if (dialogElement) {
            document.body.append(dialogElement);
        } else {
            console.error('Dialog element is null and cannot be appended to the body.');
        }
    }

    public createRoutes(state: LocalStorageState): Array<Route> {
        return [
            {
                path: `${Pages.EMPTY}`,
                callback: async (): Promise<void> => {
                    this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
                    if (this.isLogged) {
                        await this.loadChatView(state);
                    } else {
                        this.router.navigate(PagesNames.LOGIN)
                        //await this.loadLoginView(state);
                    }
                },
            },
            {
                path: `${Pages.CHAT}`,
                callback: async (): Promise<void> => {
                    this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
                    if (this.isLogged) {
                        await this.loadChatView(state);
                    } else {
                        this.router.navigate(PagesNames.LOGIN)
                        //await this.loadLoginView(state);
                    }
                },
            },
            {
                path: `${Pages.ABOUT}`,
                callback: async (): Promise<void> => {
                    await this.loadAboutView(state);
                },
            },
            {
                path: `${Pages.LOGIN}`,
                callback: async (): Promise<void> => {
                    this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
                    if (!this.isLogged) {
                        await this.loadLoginView(state);
                    } else {
                        this.router.navigate(PagesNames.CHAT)
                        //await this.loadChatView(state);
                    }
                },
            },
        ];
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
        this.setContent(Pages.CHAT, new ChatView(state, this.router));
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

    public init(): void {
        console.log(`Application ${this.appName} initialized...`);
    }
}
