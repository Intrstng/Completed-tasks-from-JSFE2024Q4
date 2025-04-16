import type { ElementParameters, PageStateKeys, PaginationParameters } from '../../../../types';
import { AppStateKeys } from '../../../../types';
import { CSS_PAGINATION_WIN } from './winners-pagination-classes';
import {
    nextButtonWinnersParameters,
    previousButtonWinnersParameters,
} from '../../button/button-parameters/winners-view-parameters/winners-view-button-parameters';

export const paginationWinControlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_PAGINATION_WIN.PAGINATION_WIN_CONTAINER],
};

export const paginationWinnersParameters: PaginationParameters = {
    container: paginationWinControlsContainerParameters,
    prevBtn: previousButtonWinnersParameters,
    nextBtn: nextButtonWinnersParameters,
};

export const pageWinnersStateKeys: PageStateKeys = {
    currentPage: AppStateKeys.WINNERS_PAGE,
    itemsTotal: AppStateKeys.WINNERS_QUANTITY,
};
