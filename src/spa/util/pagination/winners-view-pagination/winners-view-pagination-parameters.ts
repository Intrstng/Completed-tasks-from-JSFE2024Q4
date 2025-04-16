import { AppStateKeys, ElementParameters, PageStateKeys, PaginationParameters } from '../../../../types';
import { CSS_PAGINATION_WIN } from './winners-pagination-classes';
import {
    nextButtonGarageParameters,
    prevButtonGarageParameters,
} from '../../button/button-parameters/garage-view-buttons/garage-view-button-parameters';
import { paginationGarageControlsContainerParameters } from '../garage-view-pagination/garage-view-pagination-parameters';
import {
    nextButtonWinnersParameters,
    prevButtonWinnersParameters,
} from '../../button/button-parameters/winners-view-parameters/winners-view-button-parameters';

export const paginationWinControlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_PAGINATION_WIN.PAGINATION_WIN_CONTAINER],
};

export const paginationWinnersParameters: PaginationParameters = {
    container: paginationWinControlsContainerParameters,
    prevBtn: prevButtonWinnersParameters,
    nextBtn: nextButtonWinnersParameters,
};

export const pageWinnersStateKeys: PageStateKeys = {
    currentPage: AppStateKeys.WINNERS_PAGE,
    itemsTotal: AppStateKeys.WINNERS_QUANTITY,
};
