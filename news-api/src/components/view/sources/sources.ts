import './sources.css';
import { SourceItem } from '../../../types';

class Sources {
    draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach(item => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
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

            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.sources');

            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', function () {
                    sidebar.classList.toggle('open');
                    sidebar.classList.toggle('closed');
                    menuToggle.classList.toggle('active');
                    menuToggle.textContent = sidebar.classList.contains('open') ? 'Hide menu' : 'Show menu';
                });
            }
        }
    }
}

export default Sources;
