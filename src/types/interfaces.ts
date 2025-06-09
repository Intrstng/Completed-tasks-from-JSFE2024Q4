import type { InputTypes } from './enums';
import type { EventCB } from './types';

export interface ElementParameters {
    tag?: string;
    id?: string;
    classNames?: string[];
    textContent?: string;
    callback?: EventCB | null;
    type?: InputTypes | InputTypes.COLOR;
    placeholder?: string;
    title?: string;
    min?: string;
    max?: string;
    value?: string;
    required?: boolean;
    rows?: string;
    cols?: string;
    name?: string;
    autocomplete?: string;
}

export interface DialogParameters extends ElementParameters {
    open: boolean;
}
