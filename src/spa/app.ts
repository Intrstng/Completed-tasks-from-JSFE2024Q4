import '../style.scss';

import type { Route, ViewCommon } from '../types';
import { AppInfo, AppStateKeys, Pages } from '../types';
import Router from './router/router';
import MainView from './view/main/main-view';
import LocalStorageState from './state/session-storage-state';
import HeaderView from './view/header/header-view';
import FooterView from './view/footer/footer-view';
import SessionStorageState from './state/session-storage-state';
// import ApiController from './api/api-controller';

export default class App {
    // public api: ApiController;
    private readonly appName: string = AppInfo.NAME;
    private readonly keyToRecordInLS: string = AppInfo.KEY_LS;
    private readonly router: Router;
    private header: HeaderView | null;
    private main: MainView | null;
    private footer: FooterView | null;
    private readonly state: SessionStorageState;
    private isLogged: boolean = true;

    constructor() {
        this.header = null;
        this.main = null;
        this.state = new SessionStorageState(this.keyToRecordInLS);
        // this.api = new ApiController(PATHS, this.state, CONSTANTS);
        const routes = this.createRoutes(this.state);
        this.router = new Router(routes);
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

    public createRoutes(state: LocalStorageState): Array<Route> {
        return [
            {
                path: ``,
                callback: async (): Promise<void> => {
                    this.isLogged = this.state.getState()[AppStateKeys.IS_LOGGED];
                    if (this.isLogged) {
                        await this.loadChatView(state);
                    } else {
                        this.router.navigate(Pages.LOGIN)
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
                        this.router.navigate(Pages.LOGIN)
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
                        this.router.navigate(Pages.CHAT)
                        //await this.loadChatView(state);
                    }
                },
            },
        ];
    }

    public setContent(page: Pages, view: ViewCommon): void {
        if (this.main instanceof MainView) {
            if (this.header instanceof HeaderView) {
                this.header.setSelectedItem(page);
            }
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
        this.setContent(Pages.LOGIN, new LoginView(state, this.router));
    }

    private createHeader(): void {
        if (!this.header) {
            this.header = new HeaderView(this.router);
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
