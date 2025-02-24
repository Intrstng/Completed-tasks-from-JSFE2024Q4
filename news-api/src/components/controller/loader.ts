import { LoaderOptions } from './appLoader';
import { Endpoint } from './controller';

class Loader implements LoaderInterface {
    constructor(
        private readonly baseLink: string,
        private readonly options: LoaderOptions
    ) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res) {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options, endpoint) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach(key => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method, endpoint, callback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then(res => res.json())
            .then(data => callback(data))
            .catch(err => console.error(err));
    }
}

export default Loader;


interface LoaderInterface {
    getResp(params: Params, callback: (data: any) => void): void;
    errorHandler(res: Response): Response;
    makeUrl(options: Options, endpoint: Endpoint): string;
    load(method: HttpMethod, endpoint: Endpoint, callback: (data: any) => void, options?: Options): void;
}


enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
}

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}

type Params = {
    endpoint: Endpoint;
    options?: Options
}

export type Options = {
    sources: string | null
}