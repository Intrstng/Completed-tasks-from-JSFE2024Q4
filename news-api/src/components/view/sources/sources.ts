import './sources.css';

class Sources {
    draw(data: any[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach(item => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
                const itemNameElement = sourceClone.querySelector<HTMLElement>('.source__item-name');
                const sourceItemElement = sourceClone.querySelector<HTMLElement>('.source__item');
                if (itemNameElement) {
                    itemNameElement.textContent = item.name;
                }
                if (sourceItemElement) {
                    sourceItemElement.setAttribute('data-source-id', item.id);
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
}

export default Sources;
