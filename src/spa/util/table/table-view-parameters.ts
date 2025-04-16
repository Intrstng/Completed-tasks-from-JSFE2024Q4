import type { ButtonParameters, ElementParameters } from '../../../types';
import { Description } from '../../../types';
import { CSS_TABLE } from './table-classes';

export const scoreTableContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_TABLE.TABLE_CONTAINER],
};

export const scoreTableParameters: ElementParameters = {
    tag: 'table',
    classNames: [CSS_TABLE.WINNERS_TABLE, CSS_TABLE.TABLE],
};

export const theadButtonsContainer: ButtonParameters = {
    tag: 'div',
    classNames: [CSS_TABLE.HEAD],
};

export const tableHeadParameters: ElementParameters = {
    tag: 'thead',
    classNames: [CSS_TABLE.TABLE_HEAD],
};

export const tableBodyParameters: ElementParameters = {
    tag: 'tbody',
    classNames: [CSS_TABLE.TABLE_BODY],
};

export const tableRowParameters: ElementParameters = {
    tag: 'tr',
    classNames: [CSS_TABLE.TABLE_ROW],
};

export const tableHeadCellParameters: ElementParameters = {
    tag: 'th',
    classNames: [CSS_TABLE.TABLE_HEAD_CELL],
};

export const tableRowCellParameters: ElementParameters = {
    tag: 'td',
    classNames: [CSS_TABLE.TABLE_ROW_CELL],
};

export const tableHeadColumnsNames: Array<Description> = [
    Description.NUMBER,
    Description.CAR,
    Description.NAME,
    Description.WINS,
    Description.TIME,
];

export const spanParameters: ButtonParameters = {
    tag: 'span',
};
