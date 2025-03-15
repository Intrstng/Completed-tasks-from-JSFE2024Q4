export type LocalStorageItem = {
    [key: string]: any;
};

export type AppState = {
    isTurning: boolean;
    mute: boolean;
    list: Array<DecisionItem>;
    lastId: string;
};

export type JsonData = Pick<AppState, 'list' | 'lastId'>;

export type DecisionItem = {
    id: string;
    title: string;
    weight: string;
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

export type LoadDataCB = (data: JsonData) => void;
