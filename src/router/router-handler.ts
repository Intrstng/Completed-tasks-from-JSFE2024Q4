import { Location, LocationEvent } from '../types';

export default class RouterHandler {
    private params: any;
    private readonly callback: (any) => void;
    private readonly handler: any;
    private readonly locationEvent: LocationEvent;

    constructor(callback, location: Location = Location.PATHNAME) {
        this.locationEvent = location === Location.PATHNAME ? LocationEvent.POPSTATE : LocationEvent.HASHCHANGE;
        this.callback = callback;
        this.handler = this.navigate.bind(this);

        this.params = {
            nameEvent: this.locationEvent,
            locationField: location,
        };

        window.addEventListener(this.params.nameEvent, this.handler);
    }

    disable(): void {
        window.removeEventListener(this.params.nameEvent, this.handler);
    }

    navigate(url) {
        if (typeof url === 'string') {
            this.setHistory(url);
        }
        const urlString = window.location[this.params.locationField].slice(1);
        const pathSegments = urlString.split('/');

        const result = {
            path: pathSegments[0] || '',
        };

        this.callback(result);
    }

    private setHistory(url: string): void {
        if (this.params.locationField === Location.PATHNAME) {
            window.history.pushState(null, null, `/${url}`);
        } else {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;
        }
    }
}
