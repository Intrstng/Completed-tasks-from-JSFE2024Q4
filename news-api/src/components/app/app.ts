import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, data => this.view.drawNews(data))
                const menuToggle = document.querySelector('.menu-toggle');
                const sidebar = document.querySelector('.sources');
                if (menuToggle && sidebar) {
                    sidebar.classList.remove('open');
                    sidebar.classList.add('closed');
                    menuToggle.classList.toggle('active');
                }
            }
            );
        } else {
            console.error("Element with class 'sources' not found.");
        }
        this.controller.getSources(data => this.view.drawSources(data));
    }
}

export default App;
