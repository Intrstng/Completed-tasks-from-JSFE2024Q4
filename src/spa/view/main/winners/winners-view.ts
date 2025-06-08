import './winners.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import type { ToggleActiveButtonCB } from '../../../../types';
import { AppStateKeys, Description } from '../../../../types';
import {
    winnersCurrentParameters,
    winnersPageCurrentParameters,
    winnersParameters,
    winnersSummaryParameters,
} from './winners-view-parameters';
import type SessionStorageState from '../../../state/session-storage-state';
import type ApiController from '../../../api/api-controller';
import { toggleButtonActiveClass } from '../../../util/button/button-disable-toggle';
import Table from '../../../util/table/table';
import { CONSTANTS } from '../../../state/initial-state';
import {
    pageWinnersStateKeys,
    paginationWinnersParameters,
} from '../../../util/pagination/winners-view-pagination/winners-view-pagination-parameters';
import { PaginationController } from '../../../util/pagination/pagination-controller';
import { PagesNames } from '../../header/header-constants';

export default class WinnersView extends View {
    public router: Router;
    public api: ApiController;
    private readonly winnersState: SessionStorageState;
    private winnersQuantity: CreatorElement | null = null;
    private readonly winnersPage: CreatorElement | null = null;
    private readonly table: Table | null;
    private readonly toggleButtonActiveClass: ToggleActiveButtonCB;
    private readonly paginationController: PaginationController | null;

    constructor(state: SessionStorageState, router: Router, api: ApiController) {
        super(winnersParameters);
        this.router = router;
        this.winnersState = state;
        this.api = api;
        this.winnersPage = new CreatorElement(winnersPageCurrentParameters);
        this.toggleButtonActiveClass = toggleButtonActiveClass;

        this.paginationController = new PaginationController(
            state,
            this.winnersPage,
            this.viewElementCreator,
            this.getWinnersForCurrentPage.bind(this),
            this.updateTableLayout.bind(this),
            paginationWinnersParameters,
            pageWinnersStateKeys,
            CONSTANTS.winnersOnPage
        );

        this.table = new Table(
            state,
            this.winnersPage,
            this.viewElementCreator,
            this.getWinnersForCurrentPage.bind(this),
            this.updateTableLayout.bind(this)
        );

        this.configureView();
    }

    private async configureView(): Promise<void> {
        await this.getWinnersForCurrentPage();
        this.addSummary();
        if (this.paginationController instanceof PaginationController) {
            this.paginationController.createControls();
        }
        if (this.table instanceof Table) {
            this.table.addScoreTable(true);
        }
    }

    private async getWinnersForCurrentPage(): Promise<void> {
        const currentSortType = this.winnersState.getState()[AppStateKeys.SORT_TYPE];
        const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
        let currentSortOrderTime: string | undefined;

        if (currentSortType === Description.SORT_WINS) {
            currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_WINS];
        } else if (currentSortType === Description.SORT_TIME) {
            currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_TIME];
        }

        if (Number.isFinite(currentWinnersPage) && currentSortOrderTime) {
            await this.api.getAllWinners(currentSortType, currentSortOrderTime, currentWinnersPage);
        }
    }

    private addSummary(): void {
        const winnersQuantity: number = this.winnersState.getState()[AppStateKeys.WINNERS_QUANTITY] || 0;
        const winnersQuantityText: string = winnersQuantity === 0 ? '' : ` (${winnersQuantity})`;
        const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];

        const summaryCreator = new CreatorElement(winnersSummaryParameters);

        this.winnersQuantity = new CreatorElement(winnersCurrentParameters);
        this.winnersQuantity.setTextContent(`${PagesNames.WINNERS}${winnersQuantityText}`);

        if (this.winnersPage instanceof CreatorElement) {
            this.winnersPage.setTextContent(`${Description.PAGE} ${currentWinnersPage}`);
        }

        summaryCreator.addInnerElement(this.winnersQuantity);
        summaryCreator.addInnerElement(this.winnersPage);

        this.viewElementCreator.addInnerElement(summaryCreator);
    }

    private updateTableLayout(): void {
        if (this.table instanceof Table) {
            View.deleteAllItemsInContainer(this.table.getTableCreator());
            this.table.addScoreTable();
        }
    }
}
