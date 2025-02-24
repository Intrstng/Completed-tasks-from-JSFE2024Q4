export type Options = {
  sources: string | null
}

export type LoaderOptions = {
  apiKey: string | undefined;
}

export type MergedOptions = Partial<Options & LoaderOptions>;

export type GetSourcesCB = (data: SourceResponse) => void;
export type GetNewsCB = (data: ArticleResponse) => void;

export interface AppControllerInterface {
  getSources(callback: GetSourcesCB): void;
  getNews(e: Event, callback: GetNewsCB): void;
}

export enum Endpoint {
  SOURCES = 'sources',
  EVERYTHING = 'everything',
}

export enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export type Country = 'ae' | 'ar' | 'at' | 'au' | 'be' | 'bg' | 'br' | 'ca' | 'ch' | 'cn' | 'co' | 'cu' | 'cz' | 'de' | 'eg' | 'fr' | 'gb' | 'gr' | 'hk' | 'hu' | 'id' | 'ie' | 'il' | 'in' | 'it' | 'jp' | 'kr' | 'lt' | 'lv' | 'ma' | 'mx' | 'my' | 'ng' | 'nl' | 'no' | 'nz' | 'ph' | 'pl' | 'pt' | 'ro' | 'rs' | 'ru' | 'sa' | 'se' | 'sg' | 'si' | 'sk' | 'th' | 'tr' | 'tw' | 'ua' | 'us' | 've' | 'za';

export type Language = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';

export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type ErrorCode = 'apiKeyDisabled' | 'apiKeyExhausted' | 'apiKeyInvalid' | 'apiKeyMissing' | 'parameterInvalid' | 'parametersMissing' | 'rateLimited' | 'sourcesTooMany' | 'sourceDoesNotExist' | 'unexpectedError';

export type Status = 'ok' | 'error';

export type Params = {
  endpoint: Endpoint;
  options?: Options | {};
}

export type SourceItem = {
  id: string | null,
  name: string | null,
  description: string | null,
  url: string | null,
  category: Category | null,
  language: Language | null,
  country: Country | null,
}

export type ArticleSource = Pick<SourceItem, 'id' | 'name'>;

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
