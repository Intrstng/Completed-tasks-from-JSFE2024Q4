import RouterHandler from './router-handler';
import { Location, Pages } from '../../types';
import type { RequestParameters, Route } from './types';

export default class Router {
    private routes: Route[];
    private handler: RouterHandler;

    constructor(routes: Route[]) {
        this.routes = routes;

        this.handler = new RouterHandler(this.urlChangedHandler.bind(this), Location.PATHNAME);

        document.addEventListener('DOMContentLoaded', () => {
            this.handler.navigate(null);
        });
    }

    public setHashHandler(): void {
        this.handler.disable();
        this.handler = new RouterHandler(this.urlChangedHandler.bind(this), Location.HASH);
    }

    public navigate(url: string): void {
        this.handler.navigate(url);
    }

    public urlChangedHandler(requestParameters: RequestParameters): void {
        const { path } = requestParameters;
        const routeIndex = this.routes.findIndex(item => item.path === path);

        if (routeIndex === -1) {
            this.redirectToMainPage();
            return;
        }

        this.routes[routeIndex]
            .callback()
            .then(() => {
                console.log(`Redirected to route: ${this.routes[routeIndex].path}`);
            })
            .catch(error => {
                console.error('Error in route callback:', error);
                this.redirectToMainPage();
            });
    }

    public redirectToMainPage(): void {
        const notFoundPageIndex = this.routes.findIndex(item => item.path === `${Pages.CHAT}`);

        if (notFoundPageIndex !== -1) {
            this.navigate(this.routes[notFoundPageIndex].path);
        }
    }
}
