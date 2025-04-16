import {
    AppStateKeys,
    CurrentPage,
    ElementParameters,
    ItemsTotal,
    PageStateKeys,
    PaginationParameters,
} from '../../../../types';
import { CSS_PAGINATION_GARAGE } from './garage-pagination-classes';
import {
    nextButtonGarageParameters,
    prevButtonGarageParameters,
} from '../../button/button-parameters/garage-view-buttons/garage-view-button-parameters';

export const paginationGarageControlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_PAGINATION_GARAGE.PAGINATION_GARAGE_CONTAINER],
};

export const paginationGarageParameters: PaginationParameters = {
    container: paginationGarageControlsContainerParameters,
    prevBtn: prevButtonGarageParameters,
    nextBtn: nextButtonGarageParameters,
};

export const pageGarageStateKeys: PageStateKeys = {
    currentPage: AppStateKeys.GARAGE_PAGE,
    itemsTotal: AppStateKeys.CARS_QUANTITY,
};
