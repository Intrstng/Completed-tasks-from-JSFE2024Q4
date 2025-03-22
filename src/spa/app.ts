import '../style.scss';
import LocalStorageState from './state/local-storage-state';
import type { Route, ViewCommon } from '../types';
import { Pages } from '../types';
import Router from './router/router';
import MainView from './view/main/main-view';
import LocalStorageSelector from './state/local-storage-selector';

export default class App {
    private readonly appName: string = 'Decision Making Tool';
    private readonly keyToRecordInLS: string;
    private readonly keyToRecordSelectorInLS: string;
    private readonly router: Router;
    private main: MainView | null;

    constructor() {
        this.main = null;
        this.keyToRecordInLS = 'decisionMakingTool';
        this.keyToRecordSelectorInLS = 'decisionMakingToolSelector';
        const state: LocalStorageState = new LocalStorageState(this.keyToRecordInLS);
        const selectorState: LocalStorageSelector = new LocalStorageSelector(this.keyToRecordSelectorInLS);

        const routes = this.createRoutes(state, selectorState);
        this.router = new Router(routes);

        this.router.setHashHandler();
        this.createView();
    }

    public createView(): void {
        this.main = new MainView();
        const element = this.main.getHtmlElement();
        if (element) {
            document.body.append(element);
        } else {
            console.error('Main view element is null and cannot be appended to the body.');
        }
    }

    public createRoutes(state: LocalStorageState, selectorState: LocalStorageSelector): Array<Route> {
        return [
            {
                path: ``,
                callback: async (): Promise<void> => {
                    const { default: IndexView } = await import('./view/main/index/index-view');
                    this.setContent(new IndexView(state, this.router));
                },
            },
            {
                path: `${Pages.INDEX}`,
                callback: async (): Promise<void> => {
                    const { default: IndexView } = await import('./view/main/index/index-view');
                    this.setContent(new IndexView(state, this.router));
                },
            },
            {
                path: `${Pages.SELECTOR}`,
                callback: async (): Promise<void> => {
                    const { default: SelectorView } = await import('./view/main/selector/selector-view');
                    this.setContent(new SelectorView(selectorState, state, this.router));
                },
            },
            {
                path: `${Pages.NOT_FOUND}`,
                callback: async (): Promise<void> => {
                    const { default: NotFoundView } = await import('./view/main/not-found/not-found-view');
                    this.setContent(new NotFoundView(this.router));
                },
            },
        ];
    }

    public setContent(view: ViewCommon): void {
        if (this.main instanceof MainView) {
            this.main.setContent(view);
        } else {
            console.error('Cannot set content: Main view is not initialized');
        }
    }

    public init(): void {
        console.log(`Application ${this.appName} initialized...`);
    }
}
