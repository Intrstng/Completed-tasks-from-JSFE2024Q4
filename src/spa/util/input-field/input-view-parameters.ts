import type { ElementParameters } from '../../../types';
import { InputTypes } from '../../../types';
import { CSS_INPUT } from './input-classes';

export const inputsParameters: Array<ElementParameters> = [
    {
        id: 'inputBrand',
        tag: 'input',
        classNames: [CSS_INPUT.INPUT, CSS_INPUT.BRAND],
        type: InputTypes.TEXT,
        placeholder: 'brand',
    },
    {
        id: 'inputColor',
        tag: 'input',
        classNames: [CSS_INPUT.INPUT, CSS_INPUT.COLOR],
        type: InputTypes.COLOR,
    },
];
