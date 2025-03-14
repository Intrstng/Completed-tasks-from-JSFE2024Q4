import RouterHandler from './router-handler';
import { Location, Pages } from '../types';

export default class Router {
    private routes;
    private handler;

    constructor(routes) {
        this.routes = routes;

        this.handler = new RouterHandler(this.urlChangedHandler.bind(this), Location.PATHNAME);

        document.addEventListener('DOMContentLoaded', () => {
            this.handler.navigate(null);
        });
    }

    setHashHandler(): void {
        this.handler.disable();
        this.handler = new RouterHandler(this.urlChangedHandler.bind(this), Location.HASH);
    }

    navigate(url): void {
        this.handler.navigate(url);
    }

    urlChangedHandler(requestParams): void {
        // Check
        const [path] = requestParams;
        const routeIndex = this.routes.findIndex(item => item.path === path);

        if (routeIndex === -1) {
            this.redirectToNotFoundPage();
            return;
        }

        this.routes[routeIndex].callback(requestParams.resource); //this.routes[routeIndex].callback()
    }

    redirectToNotFoundPage(): void {
        const notFoundPageIndex = this.routes.findIndex(item => item.path === Pages.NOT_FOUND);

        if (notFoundPageIndex !== -1) {
            this.navigate(this.routes[notFoundPageIndex].path);
        }
    }
}
