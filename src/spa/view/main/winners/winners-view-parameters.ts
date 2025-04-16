import type { ElementParameters } from '../../../../types';
import { Description } from '../../../../types';
import { CSS_WINNERS } from './winners-classes';

export const winnersParameters: ElementParameters = {
    tag: 'section',
    classNames: [CSS_WINNERS.WINNERS],
};

export const winnersSummaryParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_WINNERS.WINNERS_SUMMARY],
};

export const winnersCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.WINNERS,
    classNames: [CSS_WINNERS.WINNERS_CURRENT],
};

export const winnersPageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.PAGE,
    classNames: [CSS_WINNERS.WINNERS_CURRENT],
};
