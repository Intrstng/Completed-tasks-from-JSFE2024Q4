import { Description, ElementParameters } from '../../../../types';
import { CSS_GARAGE } from './garage-classes';

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
    classNames: [CSS_GARAGE.CAR_CREATION],
};

export const carCreationBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.CAR_CREATION_CREATE],
};

export const carUpdateBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.CAR_CREATION_UPDATE],
};

export const raceBoardParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.BOARD],
};

export const carBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.BLOCK],
};

export const carNameParameters: ElementParameters = {
    tag: 'h3',
    classNames: [CSS_GARAGE.NAME],
};

export const carRaceParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.RACE],
};

export const carRaceControlsParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.RACE_CONTROLS],
};

export const trackParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.TRACK],
};

export const finishParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_GARAGE.FINISH],
};
