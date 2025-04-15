import './winners.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import { AppStateKeys, Description, ToggleActiveButtonCallback } from '../../../../types';
import {
    winnersCurrentParameters,
    winnersPageCurrentParameters,
    winnersParameters,
    winnersSummaryParameters,
} from './winners-view-parameters';
import SessionStorageState from '../../../state/session-storage-state';
import ApiController from '../../../api/api-controller';
import { toggleButtonActiveClass } from '../../../util/button/button-disable-toggle';
import { WinnersPaginationController } from '../../../util/pagination/winners-view-pagination/winners-view-pagination';
import Table from '../../../util/table/table';

export default class WinnersView extends View {
    public router: Router;
    private readonly winnersState: SessionStorageState;
    private winnersQuantity: CreatorElement | null;
    private readonly winnersPage: CreatorElement | null;
    private table: Table | null;
    private prevButton: CreatorElement | null;
    private nextButton: CreatorElement | null;
    private ascWinButton: CreatorElement | null;
    private descWinButton: CreatorElement | null;
    private ascTimeButton: CreatorElement | null;
    private descTimeButton: CreatorElement | null;
    private readonly toggleButtonActiveClass: ToggleActiveButtonCallback;
    private paginationController: WinnersPaginationController | null;
    public api: ApiController;

    constructor(state: SessionStorageState, router: Router, api: ApiController) {
        super(winnersParameters);
        this.winnersQuantity = null;
        this.prevButton = null;
        this.nextButton = null;
        this.ascWinButton = null;
        this.descWinButton = null;
        this.ascTimeButton = null;
        this.descTimeButton = null;
        this.router = router;
        this.api = api;
        this.winnersState = state;
        this.winnersPage = new CreatorElement(winnersPageCurrentParameters);
        this.toggleButtonActiveClass = toggleButtonActiveClass;

        this.paginationController = new WinnersPaginationController(
            state,
            this.winnersPage,
            this.viewElementCreator,
            this.getWinnersForCurrentPage.bind(this),
            this.updateTableLayout.bind(this)
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
        this.paginationController.createControls();
        this.table.addScoreTable(true);
    }

    private async getWinnersForCurrentPage(): Promise<void> {
        const currentSortType = this.winnersState.getState()[AppStateKeys.SORT_TYPE];
        const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
        let currentSortOrderTime: string;

        if (currentSortType === Description.SORT_WINS) {
            currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_WINS];
        } else if (currentSortType === Description.SORT_TIME) {
            currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_TIME];
        }

        if (typeof currentWinnersPage === 'number' && isFinite(currentWinnersPage)) {
            await this.api.getAllWinners(currentSortType, currentSortOrderTime, currentWinnersPage);
        }
    }

    private addSummary(): void {
        const winnersQuantity: number = this.winnersState.getState()[AppStateKeys.WINNERS_QUANTITY] || 0;
        const winnersQuantityText: string = winnersQuantity === 0 ? '' : ` (${winnersQuantity})`;
        const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];

        const summaryCreator = new CreatorElement(winnersSummaryParameters);

        this.winnersQuantity = new CreatorElement(winnersCurrentParameters);
        this.winnersQuantity.setTextContent(`${Description.WINNERS}${winnersQuantityText}`);

        this.winnersPage.setTextContent(`${Description.PAGE} ${currentWinnersPage}`);

        summaryCreator.addInnerElement(this.winnersQuantity);
        summaryCreator.addInnerElement(this.winnersPage);

        this.viewElementCreator.addInnerElement(summaryCreator);
    }

    private updateTableLayout(): void {
        this.deleteAllItemsInContainer(this.table.getTableCreator());
        this.table.addScoreTable();
    }
}
