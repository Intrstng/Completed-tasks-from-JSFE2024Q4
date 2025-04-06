import '../style.scss';

import type { Route, ViewCommon } from '../types';
import { AppInfo, AppStateKeys, Constants, Pages, Paths } from '../types';
import Router from './router/router';
import MainView from './view/main/main-view';
import LocalStorageState from './state/local-storage-state';
import HeaderView from './view/header/header-view';

export default class App {
    private readonly appName: string = AppInfo.NAME;
    private readonly keyToRecordInLS: string = AppInfo.KEY_LS;
    private readonly router: Router;
    private header: HeaderView | null;
    private main: MainView | null;
    private readonly state: LocalStorageState;

    constructor() {
        this.header = null;
        this.main = null;
        this.state = new LocalStorageState(this.keyToRecordInLS);
        const routes = this.createRoutes(this.state);
        this.router = new Router(routes);

        this.router.setHashHandler();
        this.createView();
    }

    public createView(): void {
        this.header = new HeaderView(this.router);
        this.main = new MainView();

        const headerElement: HTMLElement = this.header.getHtmlElement();
        const mainElement: HTMLElement = this.main.getHtmlElement();
        if (headerElement && mainElement) {
            document.body.append(headerElement, mainElement);
        } else {
            console.error('Main view element is null and cannot be appended to the body.');
        }
    }

    public createRoutes(state: LocalStorageState): Array<Route> {
        return [
            {
                path: ``,
                callback: async (): Promise<void> => {
                    const { default: GarageView } = await import('./view/main/garage/garage-view');
                    this.setContent(Pages.GARAGE, new GarageView(state, this.router));
                },
            },
            {
                path: `${Pages.GARAGE}`,
                callback: async (): Promise<void> => {
                    const { default: GarageView } = await import('./view/main/garage/garage-view');
                    this.setContent(Pages.GARAGE, new GarageView(state, this.router));
                },
            },
            {
                path: `${Pages.WINNERS}`,
                callback: async (): Promise<void> => {
                    const { default: WinnersView } = await import('./view/main/winners/winners-view');
                    this.setContent(Pages.WINNERS, new WinnersView(state, this.router));
                },
            },
        ];
    }

    public setContent(page: Pages, view: ViewCommon): void {
        if (this.main instanceof MainView) {
            this.header.setSelectedItem(page);
            this.main.setContent(view);
        } else {
            console.error('Cannot set content: Main view is not initialized');
        }
    }

    public init(): void {
        console.log(`Application ${this.appName} initialized...`);
    }
}
