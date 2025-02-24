import {
    Endpoint,
    HttpMethod,
    HttpStatus,
    LoaderOptions,
    MergedOptions,
    Options,
    Params,
    ResponseCommon,
} from '../../types';

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: LoaderOptions
    ) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Params,
        callback: (data: ResponseCommon) => void = (data: ResponseCommon) => {
            console.error('No callback for GET response', data.message);
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options | object, endpoint: Endpoint): string {
        const urlOptions: MergedOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof MergedOptions>).forEach(key => {
            if (urlOptions[key] !== null && urlOptions[key] !== undefined) {
                url += `${key}=${urlOptions[key]}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: (data: ResponseCommon) => void,
        options: Options | object = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<ResponseCommon>)
            .then((data: ResponseCommon) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
