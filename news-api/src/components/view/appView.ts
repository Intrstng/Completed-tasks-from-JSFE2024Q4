import News from './news/news';
import Sources from './sources/sources';
import { ArticleItem, ArticleResponse, SourceItem, SourceResponse } from '../controller/loader';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ArticleResponse): void {
        const values: ArticleItem[] = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: SourceResponse): void {
        const values: SourceItem[] = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
