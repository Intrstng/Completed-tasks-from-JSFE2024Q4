import './winners.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import type { AppState, ElementParameters } from '../../../../types';
import {
    AppStateKeys,
    Car,
    COLORS,
    Description,
    Operator,
    OrderButtonParametersWithCB,
    Pages,
    TableRecord,
    Winner,
} from '../../../../types';
import {
    ascButtonParameters,
    descButtonParameters,
    nextButtonWinnersParameters,
    paginationWinControlsContainerParameters,
    prevButtonWinnersParameters,
    scoreTableContainerParameters,
    scoreTableParameters,
    spanParameters,
    tableBodyParameters,
    tableHeadCellParameters,
    tableHeadColumnsNames,
    tableHeadParameters,
    tableRowCellParameters,
    tableRowParameters,
    winnersCurrentParameters,
    winnersPageCurrentParameters,
    winnersParameters,
    winnersSummaryParameters,
} from './winners-view-parameters';
import LocalStorageState from '../../../state/local-storage-state';
import { CONSTANTS } from '../../../state/initial-state';
import ApiController from '../../../api/api-controller';
import { createSVG } from '../../../util/createSvg/createSvg';
import { svgElements } from '../../../util/createSvg/data';
import { raceBoardParameters } from '../garage/garage-view-parameters';

export default class WinnersView extends View {
    public router: Router;
    private readonly winnersState: LocalStorageState;
    private winnersQuantity: CreatorElement | null;
    private winnersPage: CreatorElement | null;
    private tableContainer: CreatorElement | null;
    private table: CreatorElement | null;
    public api: ApiController;

    constructor(state: LocalStorageState, router: Router, api: ApiController) {
        super(winnersParameters);
        this.winnersQuantity = null;
        this.winnersPage = null;
        this.tableContainer = null;
        this.table = null;
        this.router = router;
        this.winnersState = state;
        this.api = api;
        this.configureView();
    }

    private configureView(): void {
        this.getWinnersForCurrentPage();
        console.log('Page');
        // this.createControls();
        // this.addPickedOption();
        this.addSummary();
        this.createControls();
        this.addScoreTable(true); // Add argument
    }

    private async getWinnersForCurrentPage(): Promise<void> {
        const currentSortType = this.winnersState.getState()[AppStateKeys.SORT_TYPE];
        const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
        const currentSortOrderTime = this.winnersState.getState()[AppStateKeys.ORDER_TIME];

        if (typeof currentWinnersPage === 'number' && isFinite(currentWinnersPage)) {
            await this.api.getAllWinners(currentSortType, currentSortOrderTime, currentWinnersPage);
        }
        console.log(this.winnersState.getState());
    }

    private addSummary(): void {
        const winnersQuantity: number = this.winnersState.getState()[AppStateKeys.WINNERS_QUANTITY] || 0;
        const winnersQuantityText: string = winnersQuantity === 0 ? '' : ` (${winnersQuantity})`;
        const currentWinnersPage = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];

        const summaryCreator = new CreatorElement(winnersSummaryParameters);

        this.winnersQuantity = new CreatorElement(winnersCurrentParameters);
        this.winnersQuantity.setTextContent(`${Description.WINNERS}${winnersQuantityText}`);

        this.winnersPage = new CreatorElement(winnersPageCurrentParameters);
        this.winnersPage.setTextContent(`${Description.PAGE} ${currentWinnersPage}`);

        summaryCreator.addInnerElement(this.winnersQuantity);
        summaryCreator.addInnerElement(this.winnersPage);

        this.viewElementCreator.addInnerElement(summaryCreator);
    }

    private addOrderBtnCallbacksToParameters(columnName: Description): OrderButtonParametersWithCB {
        let ascButtonParametersWithCB: ElementParameters | null = null;
        let descButtonParametersWithCB: ElementParameters | null = null;
        if (columnName === Description.WINS) {
            ascButtonParametersWithCB = {
                ...ascButtonParameters,
                callback: () => console.log('asc win'),
            };
            descButtonParametersWithCB = {
                ...descButtonParameters,
                callback: () => console.log('desc win'),
            };
        }

        if (columnName === Description.TIME) {
            ascButtonParametersWithCB = {
                ...ascButtonParameters,
                callback: () => console.log('asc time'),
            };
            descButtonParametersWithCB = {
                ...descButtonParameters,
                callback: () => console.log('desc time'),
            };
        }

        return { ascButtonParametersWithCB, descButtonParametersWithCB };
    }

    private generateTableHead(): void {
        const theadCreator = new CreatorElement(tableHeadParameters);
        const theadRowCreator = new CreatorElement(tableRowParameters);

        tableHeadColumnsNames.forEach(columnName => {
            const headCellCreator = new CreatorElement(tableHeadCellParameters);

            if (columnName === Description.WINS || columnName === Description.TIME) {
                const { ascButtonParametersWithCB, descButtonParametersWithCB } =
                    this.addOrderBtnCallbacksToParameters(columnName);

                const ascBtnCreator = new CreatorElement(ascButtonParametersWithCB);

                const textContentCreator = new CreatorElement(spanParameters);
                textContentCreator.setTextContent(columnName);

                const descBtnCreator = new CreatorElement(descButtonParametersWithCB);

                headCellCreator.addInnerElement(ascBtnCreator.getElement());
                headCellCreator.addInnerElement(textContentCreator.getElement());
                headCellCreator.addInnerElement(descBtnCreator.getElement());
            } else {
                headCellCreator.setTextContent(columnName);
            }

            theadRowCreator.addInnerElement(headCellCreator.getElement());
        });

        theadCreator.addInnerElement(theadRowCreator.getElement());
        this.table.addInnerElement(theadCreator.getElement());
    }

    private createTableRecords(cars: Array<Car>, winners: Array<Winner>): Array<TableRecord> {
        return winners.map(winner => {
            const car = cars.find(car => car && car.id === winner.id);
            return {
                wins: winner.wins,
                time: winner.time / 1000,
                name: car ? car.name : 'Unknown winners name',
                color: car ? car.color : COLORS.BLACK,
            };
        });
    }

    private generateTableBody(): void {
        const tbodyCreator = new CreatorElement(tableBodyParameters);
        const winnersDataCollection: Array<Car> = this.winnersState.getState()[AppStateKeys.WINNERS_DATA];
        const winnersCollection: Array<Winner> = this.winnersState.getState()[AppStateKeys.WINNERS];

        const scoreRecords: Array<TableRecord> = this.createTableRecords(winnersDataCollection, winnersCollection);

        scoreRecords.forEach((record, index) => {
            const rowCreator = new CreatorElement(tableRowParameters);

            const numberCellCreator = new CreatorElement(tableRowCellParameters);
            numberCellCreator.setTextContent(String(++index));

            const carCellCreator = new CreatorElement(tableRowCellParameters);
            const carTableLogo = createSVG(svgElements, record.color, Description.TABLE);
            carCellCreator.addInnerElement(carTableLogo);

            const nameCellCreator = new CreatorElement(tableRowCellParameters);
            nameCellCreator.setTextContent(record.name);

            const winsCellCreator = new CreatorElement(tableRowCellParameters);
            winsCellCreator.setTextContent(String(record.wins));

            const timeCellCreator = new CreatorElement(tableRowCellParameters);
            timeCellCreator.setTextContent(String(record.time));

            rowCreator.addInnerElement(numberCellCreator.getElement());
            rowCreator.addInnerElement(carCellCreator.getElement());
            rowCreator.addInnerElement(nameCellCreator.getElement());
            rowCreator.addInnerElement(winsCellCreator.getElement());
            rowCreator.addInnerElement(timeCellCreator.getElement());
            tbodyCreator.addInnerElement(rowCreator.getElement());
        });

        this.table.addInnerElement(tbodyCreator.getElement());
    }

    private addScoreTable(isInitCall?: boolean): void {
        if (isInitCall) {
            this.tableContainer = new CreatorElement(raceBoardParameters);
            this.viewElementCreator.addInnerElement(this.tableContainer.getElement());
        }
        this.table = new CreatorElement(scoreTableParameters);

        this.generateTableHead();
        this.generateTableBody();

        this.tableContainer.addInnerElement(this.table.getElement());
        this.viewElementCreator.addInnerElement(this.tableContainer);
    }

    private updateTableLayout(): void {
        this.deleteAllItemsInContainer(this.table);
        this.addScoreTable();
    }

    public deleteAllItemsInContainer(container: CreatorElement): void {
        const containerElement = container.getElement();
        if (containerElement) {
            while (containerElement.firstElementChild) {
                containerElement.firstElementChild.remove();
            }
        }
    }

    // private createRaceBoard(carsData: Array<Car>, isInitCall?: boolean): void {
    //     if (isInitCall) {
    //         this.raceBoard = new CreatorElement(raceBoardParameters);
    //         this.viewElementCreator.addInnerElement(this.raceBoard.getElement());
    //     }
    //
    //     carsData.forEach(car => {
    //         this.createCarBlock(car, this.raceBoard);
    //     });
    //
    //     this.viewElementCreator.addInnerElement(this.raceBoard.getElement());
    // }

    private createControls(): void {
        const paginationControlsContainerCreator = new CreatorElement(paginationWinControlsContainerParameters);

        const prevButtonWinnersParametersWithCB: ElementParameters = {
            ...prevButtonWinnersParameters,
            callback: () => this.prevWinnersPage(),
        };

        const nextButtonWinnersParametersWithCB: ElementParameters = {
            ...nextButtonWinnersParameters,
            callback: () => this.nextWinnersPage(),
        };

        const prevBtnCreator = new CreatorElement(prevButtonWinnersParametersWithCB);
        const nextBtnCreator = new CreatorElement(nextButtonWinnersParametersWithCB);

        paginationControlsContainerCreator.addInnerElement(prevBtnCreator.getElement());

        paginationControlsContainerCreator.addInnerElement(nextBtnCreator.getElement());

        this.viewElementCreator.addInnerElement(paginationControlsContainerCreator);
    }

    private updatePropertyInState(key: string, value: string | number | boolean): void {
        const currentState: AppState = this.winnersState.getState();

        const updatedState: AppState = {
            ...currentState,
            [key]: value,
        };
        this.winnersState.setState(updatedState);
    }

    private countWinnersPageValue(operator: Operator, page: number): void {
        if (typeof page === 'number' && isFinite(page)) {
            const winnersQuantity = this.winnersState.getState()[AppStateKeys.WINNERS_QUANTITY];
            console.log(winnersQuantity);
            if (operator === Description.INCREMENT && page < winnersQuantity / CONSTANTS.winnersOnPage) {
                this.updatePropertyInState(AppStateKeys.WINNERS_PAGE, ++page);
            } else if (operator === Description.DECREMENT && page > 1) {
                this.updatePropertyInState(AppStateKeys.WINNERS_PAGE, --page);
            }
        }
    }

    private async prevWinnersPage(): Promise<void> {
        console.log('prev');
        const currentWinnersPage: number = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
        this.countWinnersPageValue(Description.DECREMENT, currentWinnersPage);

        this.winnersPage.setTextContent(
            `${Description.PAGE} ${this.winnersState.getState()[AppStateKeys.WINNERS_PAGE]}`
        );

        await this.getWinnersForCurrentPage();
        this.updateTableLayout();
    }

    private async nextWinnersPage(): Promise<void> {
        console.log('next');
        const currentWinnersPage: number = this.winnersState.getState()[AppStateKeys.WINNERS_PAGE];
        this.countWinnersPageValue(Description.INCREMENT, currentWinnersPage);
        console.log(this.winnersPage);
        this.winnersPage.setTextContent(
            `${Description.PAGE} ${this.winnersState.getState()[AppStateKeys.WINNERS_PAGE]}`
        );

        await this.getWinnersForCurrentPage();
        this.updateTableLayout();
    }

    private redirectToMainPage(event: Event): void {
        event.preventDefault();
        this.router.navigate(Pages.GARAGE);
    }

    // private keyupHandler(event: Event, durationParameters: ElementParameters): void {
    //   if (event.target instanceof HTMLInputElement) {
    //     this.enteredDurationValue = event.target.value;
    //
    //     if (SelectorView.validateInput(event.target.value, durationParameters)) {
    //       this.selectorState.setField(FieldKeys.DURATION, event.target.value);
    //     }
    //   }
    // }
}
