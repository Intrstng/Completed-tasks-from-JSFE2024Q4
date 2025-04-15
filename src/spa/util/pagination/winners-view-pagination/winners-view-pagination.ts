import { AppStateKeys, Callback, Description, ElementParameters, Operator } from '../../../../types';
import SessionStorageState from '../../../state/session-storage-state';
import { CONSTANTS } from '../../../state/initial-state';
import CreatorElement from '../../creator-element';
import { paginationWinControlsContainerParameters } from '../../../view/main/winners/winners-view-parameters';
import {
    nextButtonWinnersParameters,
    prevButtonWinnersParameters,
} from '../../button/button-parameters/winners-view-parameters/winners-view-button-parameters';
import Table from '../../table/table';

export class WinnersPaginationController {
    private readonly state: SessionStorageState;
    private prevButton: CreatorElement | null;
    private nextButton: CreatorElement | null;
    private winnersPage: CreatorElement | null;
    private paginationContainer: CreatorElement | null;
    private readonly getWinnersForCurrentPage: Callback | null;
    private readonly updateTableLayout: Callback | null;

    constructor(
        state: SessionStorageState,
        winnersPage: CreatorElement,
        container: CreatorElement,
        getWinnersForCurrentPageCB: Callback,
        updateTableLayoutCB: Callback
    ) {
        this.state = state;
        this.prevButton = null;
        this.nextButton = null;
        this.winnersPage = winnersPage;
        this.paginationContainer = container;
        this.getWinnersForCurrentPage = getWinnersForCurrentPageCB;
        this.updateTableLayout = updateTableLayoutCB;
    }

    public createControls(): void {
        const paginationControlsContainerCreator = new CreatorElement(paginationWinControlsContainerParameters);

        const prevButtonWinnersParametersWithCB: ElementParameters = {
            ...prevButtonWinnersParameters,
            callback: () => this.prevWinnersPage(),
        };

        const nextButtonWinnersParametersWithCB: ElementParameters = {
            ...nextButtonWinnersParameters,
            callback: () => this.nextWinnersPage(),
        };

        this.prevButton = new CreatorElement(prevButtonWinnersParametersWithCB);
        this.nextButton = new CreatorElement(nextButtonWinnersParametersWithCB);
        this.toggleDisabledForPaginationButtons();

        paginationControlsContainerCreator.addInnerElement(this.prevButton.getElement());
        paginationControlsContainerCreator.addInnerElement(this.nextButton.getElement());

        this.paginationContainer.addInnerElement(paginationControlsContainerCreator);
    }

    public async nextWinnersPage(): Promise<void> {
        const currentWinnersPage: number = this.state.getState()[AppStateKeys.WINNERS_PAGE];
        this.countWinnersPageValue(Description.INCREMENT, currentWinnersPage);

        this.winnersPage.setTextContent(`${Description.PAGE} ${this.state.getState()[AppStateKeys.WINNERS_PAGE]}`);

        await this.getWinnersForCurrentPage();
        this.updateTableLayout();
        this.toggleDisabledForPaginationButtons();
    }

    public async prevWinnersPage(): Promise<void> {
        const currentWinnersPage: number = this.state.getState()[AppStateKeys.WINNERS_PAGE];
        this.countWinnersPageValue(Description.DECREMENT, currentWinnersPage);

        this.winnersPage.setTextContent(`${Description.PAGE} ${this.state.getState()[AppStateKeys.WINNERS_PAGE]}`);

        await this.getWinnersForCurrentPage();
        this.updateTableLayout();
        this.toggleDisabledForPaginationButtons();
    }

    public toggleDisabledForPaginationButtons(): void {
        const currentWinnersPage: number = this.state.getState()[AppStateKeys.WINNERS_PAGE];
        const totalWinners: number = this.state.getState()[AppStateKeys.WINNERS_QUANTITY];

        if (currentWinnersPage === 1) {
            if (this.prevButton) {
                this.prevButton.setDisabled(true);
            }
        } else {
            if (this.prevButton) {
                this.prevButton.setDisabled(false);
            }
        }
        if (currentWinnersPage >= totalWinners / CONSTANTS.winnersOnPage) {
            this.nextButton.setDisabled(true);
        } else this.nextButton.setDisabled(false);
    }

    private countWinnersPageValue(operator: Operator, page: number): void {
        console.log(this.state.getState()[AppStateKeys.WINNERS_QUANTITY]);
        if (typeof page === 'number' && isFinite(page)) {
            const winnersQuantity = this.state.getState()[AppStateKeys.WINNERS_QUANTITY];
            if (operator === Description.INCREMENT && page < winnersQuantity / CONSTANTS.winnersOnPage) {
                this.state.updatePropertyInState(AppStateKeys.WINNERS_PAGE, ++page);
            } else if (operator === Description.DECREMENT && page > 1) {
                this.state.updatePropertyInState(AppStateKeys.WINNERS_PAGE, --page);
            }
        }
    }
}
