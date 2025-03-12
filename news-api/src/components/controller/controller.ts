import AppLoader from './appLoader';
import { AppControllerInterface, Endpoint, GetNewsCB, GetSourcesCB } from '../../types';

class AppController extends AppLoader implements AppControllerInterface {
    public getSources(callback: GetSourcesCB): void {
        super.getResp(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: GetNewsCB): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

        if (!(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) {
            return;
        }

        let currentTarget: EventTarget | null = target;

        while (currentTarget && currentTarget !== newsContainer) {
            if (currentTarget instanceof HTMLElement && currentTarget.classList.contains('source__item')) {
                const sourceId = currentTarget.getAttribute('data-source-id');
                if (sourceId && sourceId.trim() !== '' && newsContainer.getAttribute('data-source') !== sourceId) {
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
            if (currentTarget instanceof Node) {
                currentTarget = currentTarget.parentNode;
            } else {
                break;
            }
        }
    }

    public handlerMenu(callback: () => void): void {
        callback();
    }

    public toggleMenu(callback: () => void): void {
        callback();
    }
}

export default AppController;
