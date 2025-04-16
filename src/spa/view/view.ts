import type { ElementParameters } from '../../types';
import CreatorElement from '../util/creator-element';

export default class View {
    protected viewElementCreator: CreatorElement;

    constructor(parameters?: ElementParameters) {
        const defaultElementParameters: ElementParameters = { tag: 'section', classNames: [] };

        this.viewElementCreator = this.createView(parameters || defaultElementParameters);
    }

    public static deleteAllItemsInContainer(container: CreatorElement): void {
        const containerElement = container.getElement();
        if (containerElement) {
            while (containerElement.firstElementChild) {
                containerElement.firstElementChild.remove();
            }
        }
    }

    public getHtmlElement(): HTMLElement | null {
        return this.viewElementCreator.getElement();
    }

    public createView({ tag, classNames }: ElementParameters): CreatorElement {
        const elementParameters = {
            tag,
            classNames,
            textContent: '',
            callback: null,
        };
        this.viewElementCreator = new CreatorElement(elementParameters);
        return this.viewElementCreator;
    }
}
