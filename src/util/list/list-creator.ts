import './list.scss';

import { Callback, ElementParams, InputTypes } from '../../types';
import CreatorElement from '../creator-element';

export default class ListCreator extends CreatorElement {
    createElement({ tag, classNames }: ElementParams): void {
        this.element = document.createElement('ul');

        if (classNames && classNames.length > 0) {
            classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }
    }
}
