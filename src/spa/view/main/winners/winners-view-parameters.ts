import { ButtonParameters, CssClasses, Description, ElementParameters } from '../../../../types';
import { CSS_BUTTON } from '../../../util/button/button-classes';

export const winnersParameters: ElementParameters = {
    tag: 'section',
    classNames: [CssClasses.WINNERS],
};

export const winnersSummaryParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.WINNERS_SUMMARY],
};

export const winnersCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.WINNERS,
    classNames: [CssClasses.WINNERS_CURRENT],
};

export const winnersPageCurrentParameters: ElementParameters = {
    tag: 'h2',
    textContent: Description.PAGE,
    classNames: [CssClasses.WINNERS_CURRENT],
};

export const scoreTableContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.TABLE_CONTAINER],
};

export const scoreTableParameters: ElementParameters = {
    tag: 'table',
    classNames: [CssClasses.WINNERS_TABLE, CssClasses.TABLE],
};

export const theadButtonsContainer: ButtonParameters = {
    tag: 'div',
    classNames: [CssClasses.HEAD],
};

export const tableHeadParameters: ElementParameters = {
    tag: 'thead',
    classNames: [CssClasses.TABLE_HEAD],
};

export const tableBodyParameters: ElementParameters = {
    tag: 'tbody',
    classNames: [CssClasses.TABLE_BODY],
};

export const tableRowParameters: ElementParameters = {
    tag: 'tr',
    classNames: [CssClasses.TABLE_ROW],
};

export const tableHeadCellParameters: ElementParameters = {
    tag: 'th',
    classNames: [CssClasses.TABLE_HEAD_CELL],
};

export const tableRowCellParameters: ElementParameters = {
    tag: 'td',
    classNames: [CssClasses.TABLE_ROW_CELL],
};

export const tableHeadColumnsNames: Array<Description> = [
    Description.NUMBER,
    Description.CAR,
    Description.NAME,
    Description.WINS,
    Description.TIME,
];

export const paginationWinControlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CssClasses.PAGINATION_WIN_CONTAINER],
};

export const spanParameters: ButtonParameters = {
    tag: 'span',
};
