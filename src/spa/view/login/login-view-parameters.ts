import type { ElementParameters } from '../../../types';
import { CSS_LOGIN } from './login-classes';

export const loginParameters: ElementParameters = {
    tag: 'section',
    classNames: [CSS_LOGIN.LOGIN],
};

export const loginTitleParameters: ElementParameters = {
    tag: 'h2',
    textContent: 'Login',
    classNames: ['Login__title'],
};

// export const winnersSummaryParameters: ElementParameters = {
//     tag: 'div',
//     classNames: [CSS_WINNERS.WINNERS_SUMMARY],
// };
//
// export const winnersCurrentParameters: ElementParameters = {
//     tag: 'h2',
//     textContent: PagesNames.WINNERS,
//     classNames: [CSS_WINNERS.WINNERS_CURRENT],
// };

// export const winnersPageCurrentParameters: ElementParameters = {
//     tag: 'h2',
//     textContent: Description.PAGE,
//     classNames: [CSS_WINNERS.WINNERS_CURRENT],
// };
