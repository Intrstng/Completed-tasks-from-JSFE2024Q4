import { ButtonParameters, CssClasses, Description, ElementParameters } from '../../../../types';

export const titleWinnersParameters: ElementParameters = {
    tag: 'h1',
    classNames: [CssClasses.TITLE],
    title: 'Async Race - Winners',
    textContent: 'Async Race - Winners',
};

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

export const prevButtonWinnersParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_PREV],
    textContent: Description.PREV,
};

export const nextButtonWinnersParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_NEXT],
    textContent: Description.NEXT,
};

export const ascButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_ASC],
    textContent: Description.ASC,
};

export const descButtonParameters: ButtonParameters = {
    tag: 'button',
    classNames: [CssClasses.BUTTON, CssClasses.BUTTON_DESC],
    textContent: Description.DESC,
};

export const spanParameters: ButtonParameters = {
    tag: 'span',
};

export const mockData = [
    {
        name: '2140',
        color: 'Охра',
        wins: 1,
        time: 10,
    },
    {
        name: '2138',
        color: 'Рубин',
        wins: 1,
        time: 3378,
    },
];

const carNames: Array<string> = [
    'Base',
    'Classic',
    'Performance',
    'Clubsport',
    'Club',
    'Sport',
    'Interceptor',
    'Cross',
    'Gran-Turismo',
    'Exclusive',
    'Track-Pack',
    'Premium',
    'Premium-Plus',
    'Luxury',
    'Speed-Line',
    'Turbo',
    'Bi-turbo',
    'Twin-scroll',
    'Compressor',
    'NOS',
    'Stage-1',
    'Stage-2',
    'Stage-3',
    '1.2',
    '1.4',
    '1.5',
    '1.6',
    '1.8',
    '2.0',
    '2.2',
    '2.3',
    '2.4',
    '2.5',
    '2.6',
    '2.7',
    '2.8',
    '2.9',
    '3.0',
];
