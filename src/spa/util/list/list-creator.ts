import './list.scss';
import type { ElementParameters } from '../../../types';
import CreatorElement from '../creator-element';

export default class ListCreator extends CreatorElement {
    public createElement({ tag, classNames }: ElementParameters): void {
        if (tag) {
            this.element = document.createElement(tag);
        }

        if (classNames && classNames.length > 0) {
            classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }
    }
}
