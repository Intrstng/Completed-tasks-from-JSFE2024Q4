import { ArticleResponse, GetNewsCB, GetSourcesCB, Params, ResponseCommon, SourceItem, SourceResponse } from './types';

export interface AppControllerInterface {
  getSources(callback: GetSourcesCB): void;
  getNews(e: Event, callback: GetNewsCB): void;
}

export interface AppInterface {
  start(): void;
}

export interface LoaderInterface {
  getResp(params: Params, callback: (data: ResponseCommon) => void): void;
}

export interface AppViewInterface {
  drawNews(data: ArticleResponse): void;
  drawSources(data: SourceResponse): void;
  hideSourceMenu(): void;
  toggleSourceMenu(): void;
}

export interface SourcesInterface {
  draw(data: SourceItem[]): void;
  toggleSourcesMenu(): void;
  hideSourcesMenu(): void;
}