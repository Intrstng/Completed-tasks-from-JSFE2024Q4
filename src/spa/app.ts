import '../style.scss';

import type { Route, ViewCommon } from '../types';
import { AppInfo, Pages } from '../types';
import Router from './router/router';
import MainView from './view/main/main-view';
import LocalStorageState from './state/session-storage-state';
import HeaderView from './view/header/header-view';
import FooterView from './view/footer/footer-view';
// import ApiController from './api/api-controller';

export default class App {
    // public api: ApiController;
    private readonly appName: string = AppInfo.NAME;
    private readonly keyToRecordInLS: string = AppInfo.KEY_LS;
    private readonly router: Router;
    private header: HeaderView | null;
    private main: MainView | null;
    private footer: FooterView | null;
    private readonly state: LocalStorageState;

    constructor() {
        this.header = null;
        this.main = null;
        this.state = new LocalStorageState(this.keyToRecordInLS);
        // this.api = new ApiController(PATHS, this.state, CONSTANTS);
        const routes = this.createRoutes(this.state);
        this.router = new Router(routes);

        this.router.setHashHandler();
        this.createView();
    }

    public createView(): void {
        this.header = new HeaderView(this.router);
        this.main = new MainView();
        this.footer = new FooterView();
        // console.log(this.header)
        const headerElement: HTMLElement | null = this.header.getHtmlElement();
        const mainElement: HTMLElement | null = this.main.getHtmlElement();
        const footerElement: HTMLElement | null = this.footer.getHtmlElement();
        if (headerElement && mainElement && footerElement) {
            document.body.append(headerElement, mainElement, footerElement);
            // document.body.append(mainElement);
        } else {
            console.error('Header / Main / Footer view element is null and cannot be appended to the body.');
        }
    }

    public createRoutes(state: LocalStorageState): Array<Route> {
        return [
            {
                path: ``,
                callback: async (): Promise<void> => {
                    const { default: ChatView } = await import('./view/main/chat/chat-view');
                    // this.setContent(Pages.CHAT, new GarageView(state, this.router, this.api));
                    this.setContent(Pages.CHAT, new ChatView(state, this.router));
                },
            },
            {
                path: `${Pages.CHAT}`,
                callback: async (): Promise<void> => {
                    const { default: ChatView } = await import('./view/main/chat/chat-view');
                    // this.setContent(Pages.CHAT, new GarageView(state, this.router, this.api));
                    this.setContent(Pages.CHAT, new ChatView(state, this.router));
                },
            },
            {
                path: `${Pages.ABOUT}`,
                callback: async (): Promise<void> => {
                    const { default: AboutView } = await import('./view/about/about-view');
                    // this.setContent(Pages.WINNERS, new LoginView(state, this.router, this.api));
                    this.setContent(Pages.ABOUT, new AboutView(state, this.router));
                },
            },
            {
                path: `${Pages.LOGIN}`,
                callback: async (): Promise<void> => {
                    const { default: LoginView } = await import('./view/login/login-view');
                    // this.setContent(Pages.WINNERS, new LoginView(state, this.router, this.api));
                    this.setContent(Pages.LOGIN, new LoginView(state, this.router));
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

    public init(): void {
        console.log(`Application ${this.appName} initialized...`);
    }
}
