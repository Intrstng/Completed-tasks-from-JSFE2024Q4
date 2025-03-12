import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { AppInterface } from '../../types';

class App implements AppInterface {
    private controller: AppController;
    private view: AppView;
    private readonly menuToggle: HTMLElement | null;
    private readonly sidebar: HTMLElement | null;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.menuToggle = document.querySelector('.menu-toggle');
        this.sidebar = document.querySelector('.sources');
    }

    public start = (): void => {
        if (this.sidebar) {
            this.sidebar.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, data => this.view.drawNews(data));
                this.controller.handlerMenu(this.view.hideSourceMenu);
            });
        } else {
            console.error("Element with class 'sources' not found.");
        }

        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.controller.toggleMenu(this.view.toggleSourceMenu));
        }

        this.controller.getSources(data => this.view.drawSources(data));
    };
}

export default App;
