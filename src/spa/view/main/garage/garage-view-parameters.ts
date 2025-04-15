import {
    ButtonParameters,
    ButtonsCollection,
    CssClasses,
    Description,
    DialogParameters,
    ElementParameters,
    InputTypes,
} from '../../../../types';
import { CSS_GARAGE } from './garage-classes';
import { CSS_DIALOG } from '../../../util/dialog/dialog-classes';
import { CSS_BUTTON } from '../../../util/button/button-classes';

export const garageParameters: ElementParameters = {
    tag: 'section',
    classNames: [CSS_GARAGE.GARAGE, CSS_GARAGE.GARAGE_CONTAINER],
};

export const garageSummaryParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.GARAGE_SUMMARY],
};

export const garageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.GARAGE,
    classNames: [CSS_GARAGE.GARAGE_CURRENT],
};

export const garagePageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.PAGE,
    classNames: [CSS_GARAGE.PAGE_CURRENT],
};

export const carCreationContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: ['creation-car'],
};

export const carCreationBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: ['creation-car__create'],
};

export const carUpdateBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: ['creation-car__update'],
};

export const inputsParameters: Array<ElementParameters> = [
    {
        id: 'inputBrand',
        tag: 'input',
        classNames: [CssClasses.INPUT, CssClasses.BRAND],
        type: InputTypes.TEXT,
        placeholder: Description.BRAND,
    },
    {
        id: 'inputColor',
        tag: 'input',
        classNames: [CssClasses.INPUT, CssClasses.COLOR],
        type: InputTypes.COLOR,
    },
];

export const labelParameters: ElementParameters = {
    tag: 'label',
    classNames: ['label'],
};

export const raceBoardParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.BOARD],
};

export const carBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.BLOCK],
};

export const carNameParameters: ElementParameters = {
    tag: 'h3',
    classNames: [CssClasses.NAME],
};

export const carRaceParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.RACE],
};

export const carRaceControlsParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.RACE_CONTROLS],
};

export const trackParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.TRACK],
};

export const finishParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.FINISH],
};

export const paginationGarageControlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.PAGINATION_GARAGE_CONTAINER],
};
