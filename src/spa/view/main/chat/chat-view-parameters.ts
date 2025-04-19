import type { ElementParameters } from '../../../../types';
import { CSS_CHAT } from './chat-classes';
import { PagesNames } from '../../header/header-constants';

export const garageParameters: ElementParameters = {
    tag: 'section',
    classNames: [CSS_CHAT.GARAGE, CSS_CHAT.GARAGE_CONTAINER],
};

export const garageSummaryParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.GARAGE_SUMMARY],
};

export const garageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: PagesNames.CHAT,
    classNames: [CSS_CHAT.GARAGE_CURRENT],
};


export const carCreationContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.CAR_CREATION],
};

export const carCreationBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.CAR_CREATION_CREATE],
};

export const carUpdateBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.CAR_CREATION_UPDATE],
};

export const raceBoardParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.BOARD],
};

export const carBlockParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.BLOCK],
};

export const carNameParameters: ElementParameters = {
    tag: 'h3',
    classNames: [CSS_CHAT.NAME],
};

export const carRaceParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.RACE],
};

export const carRaceControlsParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.RACE_CONTROLS],
};

export const trackParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.TRACK],
};

export const finishParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_CHAT.FINISH],
};
