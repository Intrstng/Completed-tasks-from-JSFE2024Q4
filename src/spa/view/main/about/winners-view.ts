import './winners.scss';
import View from '../../view';

export default class WinnersView extends View {
    // public router: Router;
    // public api: ApiController;
    // private readonly winnersState: SessionStorageState;
    // private winnersQuantity: CreatorElement | null;
    // private readonly winnersPage: CreatorElement | null;
    // private readonly table: Table | null;
    // private prevButton: CreatorElement | null;
    // private nextButton: CreatorElement | null;
    // private ascWinButton: CreatorElement | null;
    // private descWinButton: CreatorElement | null;
    // private ascTimeButton: CreatorElement | null;
    // private descTimeButton: CreatorElement | null;
    // private readonly toggleButtonActiveClass: ToggleActiveButtonCB;
    // private readonly paginationController: PaginationController | null;
    //
    // constructor(state: SessionStorageState, router: Router, api: ApiController) {
    //     super(winnersParameters);
    //     this.winnersQuantity = null;
    //     this.prevButton = null;
    //     this.nextButton = null;
    //     this.ascWinButton = null;
    //     this.descWinButton = null;
    //     this.ascTimeButton = null;
    //     this.descTimeButton = null;
    //     this.router = router;
    //     this.winnersState = state;
    //     this.api = api;
    //     this.winnersPage = new CreatorElement(winnersPageCurrentParameters);
    //     this.toggleButtonActiveClass = toggleButtonActiveClass;
    //
    //     this.paginationController = new PaginationController(
    //         state,
    //         this.winnersPage,
    //         this.viewElementCreator,
    //         this.getWinnersForCurrentPage.bind(this),
    //         this.updateTableLayout.bind(this),
    //         paginationWinnersParameters,
    //         pageWinnersStateKeys,
    //         CONSTANTS.winnersOnPage
    //     );
    //
    //     this.table = new Table(
    //         state,
    //         this.winnersPage,
    //         this.viewElementCreator,
    //         this.getWinnersForCurrentPage.bind(this),
    //         this.updateTableLayout.bind(this)
    //     );
    //
    //     this.configureView();
    // }
    //
    // private async configureView(): Promise<void> {
    //     await this.getWinnersForCurrentPage();
    //     this.addSummary();
    //     if (this.paginationController instanceof PaginationController) {
    //         this.paginationController.createControls();
    //     }
    //     if (this.table instanceof Table) {
    //         this.table.addScoreTable(true);
    //     }
    // }
    //
    // private async getWinnersForCurrentPage(): Promise<void> {
    //     const currentSortType = this.winnersState.getState()[AppStateKeys.SORT_TYPE];
    //     const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
    //     let currentSortOrderTime: string | undefined;
    //
    //     if (currentSortType === Description.SORT_WINS) {
    //         currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_WINS];
    //     } else if (currentSortType === Description.SORT_TIME) {
    //         currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_TIME];
    //     }
    //
    //     if (Number.isFinite(currentWinnersPage) && currentSortOrderTime) {
    //         await this.api.getAllWinners(currentSortType, currentSortOrderTime, currentWinnersPage);
    //     }
    // }
    //
    // private addSummary(): void {
    //     const winnersQuantity: number = this.winnersState.getState()[AppStateKeys.WINNERS_QUANTITY] || 0;
    //     const winnersQuantityText: string = winnersQuantity === 0 ? '' : ` (${winnersQuantity})`;
    //     const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
    //
    //     const summaryCreator = new CreatorElement(winnersSummaryParameters);
    //
    //     this.winnersQuantity = new CreatorElement(winnersCurrentParameters);
    //     this.winnersQuantity.setTextContent(`${PagesNames.WINNERS}${winnersQuantityText}`);
    //
    //     if (this.winnersPage instanceof CreatorElement) {
    //         this.winnersPage.setTextContent(`${Description.PAGE} ${currentWinnersPage}`);
    //     }
    //
    //     summaryCreator.addInnerElement(this.winnersQuantity);
    //     summaryCreator.addInnerElement(this.winnersPage);
    //
    //     this.viewElementCreator.addInnerElement(summaryCreator);
    // }
    //
    // private updateTableLayout(): void {
    //     if (this.table instanceof Table) {
    //         View.deleteAllItemsInContainer(this.table.getTableCreator());
    //         this.table.addScoreTable();
    //     }
    // }
}
