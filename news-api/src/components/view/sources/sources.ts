import './sources.css';
import { SourceItem, SourcesInterface } from '../../../types';

class Sources implements SourcesInterface {
    private readonly menuToggle: HTMLElement | null;
    private readonly sidebar: HTMLElement | null;

    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.sidebar = document.querySelector('.sources');
    }

    public draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach(item => {
                const sourceClone = sourceItemTemp.content.cloneNode(true);

                if (!(sourceClone instanceof DocumentFragment)) {
                    return;
                }

                const itemNameElement = sourceClone.querySelector<HTMLElement>('.source__item-name');
                const sourceItemElement = sourceClone.querySelector<HTMLElement>('.source__item');
                if (itemNameElement) {
                    itemNameElement.textContent = item.name || '';
                }
                if (sourceItemElement) {
                    sourceItemElement.setAttribute('data-source-id', item.id || 'default-id');
                }

                fragment.append(sourceClone);
            });

            const sourcesContainer = document.querySelector<HTMLElement>('.sources');
            if (sourcesContainer) {
                sourcesContainer.append(fragment);
            } else {
                console.error("Element with class 'sources' not found");
            }
        }
    }

    public toggleSourcesMenu = (): void => {
        if (this.menuToggle && this.sidebar) {
            this.sidebar.classList.toggle('open');
            this.sidebar.classList.toggle('closed');
            this.menuToggle.classList.toggle('active');
            this.menuToggle.textContent = this.sidebar.classList.contains('open') ? 'Hide menu' : 'Show menu';
        }
    };

    public hideSourcesMenu = (): void => {
        if (this.menuToggle && this.sidebar) {
            this.sidebar.classList.remove('open');
            this.sidebar.classList.add('closed');
            this.menuToggle.classList.toggle('active');
            this.menuToggle.textContent = 'Show menu';
        }
    };
}

export default Sources;
