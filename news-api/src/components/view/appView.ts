import News from './news/news';
import Sources from './sources/sources';
import { AppViewInterface, ArticleItem, ArticleResponse, SourceItem, SourceResponse } from '../../types';

export class AppView implements AppViewInterface {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ArticleResponse): void {
        const values: ArticleItem[] = data?.articles || [];
        this.news.draw(values);
    }

    public drawSources(data: SourceResponse): void {
        const values: SourceItem[] = data?.sources || [];
        this.sources.draw(values);
    }

    public hideSourceMenu = (): void => {
        this.sources.hideSourcesMenu();
    };

    public toggleSourceMenu = (): void => {
        this.sources.toggleSourcesMenu();
    };
}

export default AppView;
