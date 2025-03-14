export type LocalStorageItem = {
    [key: string]: any;
};

export type AppState = {
    isTurning: boolean;
    mute: boolean;
    list: [{ id: string; title: string; weight: string }];
    lastId: string;
};

export type InputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export type ElementParams = {
    tag?: string;
    id?: string;
    classNames?: Array<string>;
    textContent?: string;
    callback?: () => void;
    hasLabel?: boolean;
    type?: InputTypes;
    placeholder?: string;
    max?: string;
};

export type Callback = ((event: Event) => void) | null;
