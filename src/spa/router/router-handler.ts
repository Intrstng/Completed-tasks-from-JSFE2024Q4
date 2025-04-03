import type { RouterCB, RouterParameters } from '../../types';
import { Location, LocationEvent } from '../../types';
import { isValidState } from '../util/assertion-functions/assertion-functions';

export default class RouterHandler {
    private params: RouterParameters;
    private readonly callback: RouterCB;
    private readonly handler: (event: Event) => void;
    private readonly locationEvent: LocationEvent;

    constructor(callback: RouterCB, location: Location = Location.PATHNAME) {
        this.locationEvent = location === Location.PATHNAME ? LocationEvent.POPSTATE : LocationEvent.HASHCHANGE;
        this.callback = callback;
        this.handler = this.onEvent.bind(this);

        this.params = {
            nameEvent: this.locationEvent,
            locationField: location,
        };

        globalThis.addEventListener(this.params.nameEvent, this.handler);
    }

    public disable(): void {
        globalThis.removeEventListener(this.params.nameEvent, this.handler);
    }

    public navigate(url: string | null): void {
        if (typeof url === 'string') {
            this.setHistory(url);
        }
        const urlString = globalThis.location[this.params.locationField].slice(1);
        const pathSegments = urlString.split('/');

        const result = {
            path: pathSegments[0] || '',
        };

        this.callback(result);
    }

    private onEvent(event: Event): void {
        let url: string | null = null;

        if (this.params.locationField === Location.PATHNAME) {
            if (event instanceof PopStateEvent && isValidState(event.state)) {
                url = event.state.url || null;
            }
        } else {
            const hash = globalThis.location.hash;
            url = hash ? hash.slice(1) : null;
        }

        this.navigate(url);
    }

    private setHistory(url: string): void {
        const formattedUrl = `/${url}`.replaceAll(/\/+/g, '/');
        if (this.params.locationField === Location.PATHNAME) {
            globalThis.history.pushState(null, '', formattedUrl);
        } else {
            globalThis.location.href = `${globalThis.location.href.replace(/#(.*)$/, '')}#${url}`;
        }
    }
}
