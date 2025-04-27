import type { ElementParameters } from '../../types';
import CreatorElement from '../util/creator-element';

const DefaultElementParameters: ElementParameters = { tag: 'section', classNames: [] };

export default class View {
    protected viewElementCreator: CreatorElement;

    constructor(parameters?: ElementParameters) {
        this.viewElementCreator = this.createView(parameters || DefaultElementParameters);
    }

    public getHtmlElement(): HTMLElement | DocumentFragment | null {
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
