import AppLoader from './appLoader';

class AppController extends AppLoader implements AppControllerInterface {
    public getSources(callback) {
        super.getResp(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e, callback) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;

interface AppControllerInterface {
    getSources(callback: GetSourcesCB): void;
    getNews(e: MouseEvent, callback: GetNewsCB): void;
}

type GetNewsCB = () => void;
type GetSourcesCB = () => void;

enum Endpoint {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}