import { LoaderOptions, MergedOptions } from './appLoader';
import { Endpoint } from './controller';

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

    private makeUrl(options: Options | {}, endpoint: Endpoint): string {
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
        options: Options | {} = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then(res => res.json())
            .then(data => callback(data))
            .catch(err => console.error(err));
    }
}

export default Loader;

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
    options?: Options | {}
}

export type Options = {
    sources: string | null
}

type Country = 'ae' | 'ar' | 'at' | 'au' | 'be' | 'bg' | 'br' | 'ca' | 'ch' | 'cn' | 'co' | 'cu' | 'cz' | 'de' | 'eg' | 'fr' | 'gb' | 'gr' | 'hk' | 'hu' | 'id' | 'ie' | 'il' | 'in' | 'it' | 'jp' | 'kr' | 'lt' | 'lv' | 'ma' | 'mx' | 'my' | 'ng' | 'nl' | 'no' | 'nz' | 'ph' | 'pl' | 'pt' | 'ro' | 'rs' | 'ru' | 'sa' | 'se' | 'sg' | 'si' | 'sk' | 'th' | 'tr' | 'tw' | 'ua' | 'us' | 've' | 'za';

type Language = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';

type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

type ErrorCode = 'apiKeyDisabled' | 'apiKeyExhausted' | 'apiKeyInvalid' | 'apiKeyMissing' | 'parameterInvalid' | 'parametersMissing' | 'rateLimited' | 'sourcesTooMany' | 'sourceDoesNotExist' | 'unexpectedError';

type Status = 'ok' | 'error';

export type SourceItem = {
    id: string | null,
    name: string | null,
    description: string | null,
    url: string | null,
    category: Category | null,
    language: Language | null,
    country: Country | null,
}

export type ArticleItem = {
    source: ArticleSource
    author: string | null,
    title: string | null,
    description: string | null,
    url: string | null,
    urlToImage: string | null,
    publishedAt: string | null,
    content: string | null,
}

type ArticleSource = Pick<SourceItem, 'id' | 'name'>;

export type ResponseType<T extends string, D> = {
    status: Status,
    code?: ErrorCode;
    message?: string;
} & {
    [key in T]?: D[];
} & (T extends 'articles' ? { totalResults?: number } : {});

export type SourceResponse = ResponseType<'sources', SourceItem>;
export type ArticleResponse = ResponseType<'articles', ArticleItem>;

export type ResponseCommon = SourceResponse | ArticleResponse;