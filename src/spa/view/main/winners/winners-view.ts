import './winners.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import type { ElementParameters } from '../../../../types';
import { Description, OrderButtonParametersWithCB, Pages, TableRecord } from '../../../../types';
import {
    ascButtonParameters,
    descButtonParameters,
    mockData,
    nextButtonWinnersParameters,
    paginationControlsContainerParameters,
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
    winnersPageCurrentParameters,
    winnersParameters,
    winnersSummaryParameters,
    winnersWinnersCurrentParameters,
} from './winners-view-parameters';
import LocalStorageState from '../../../state/local-storage-state';

export default class WinnersView extends View {
    public router: Router;
    private readonly winnersState: LocalStorageState;
    private winnersQuantity: CreatorElement | null;
    private winnersPage: CreatorElement | null;
    private table: CreatorElement | null;

    constructor(state: LocalStorageState, router: Router) {
        super(winnersParameters);
        this.winnersQuantity = null;
        this.winnersPage = null;
        this.table = null;
        this.router = router;
        this.winnersState = state;

        this.configureView();
    }

    private configureView(): void {
        // this.createControls();
        // this.addPickedOption();
        this.addSummary();
        this.addScoreTable(mockData); // Add argument
        this.createControls();
    }

    private addSummary(winners: number = 0, page: number = 1): void {
        const summaryCreator = new CreatorElement(winnersSummaryParameters);

        this.winnersQuantity = new CreatorElement(winnersPageCurrentParameters);
        const winnersQuantityText = winners === 0 ? '' : `(${winners})`;
        this.winnersQuantity.setTextContent(`${Description.WINNERS} ${winnersQuantityText}`);

        this.winnersPage = new CreatorElement(winnersWinnersCurrentParameters);
        this.winnersPage.setTextContent(`${Description.PAGE} ${page}`);

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

    private generateTableBody(scores: Array<TableRecord>): void {
        const tbodyCreator = new CreatorElement(tableBodyParameters);

        scores.forEach((record, index) => {
            const rowCreator = new CreatorElement(tableRowParameters);

            const numberCellCreator = new CreatorElement(tableRowCellParameters);
            numberCellCreator.setTextContent(String(++index));

            const carCellCreator = new CreatorElement(tableRowCellParameters);
            carCellCreator.setTextContent(record.color);

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

    private addScoreTable(scores: Array<TableRecord> = []): void {
        const scoreTableContainerCreator = new CreatorElement(scoreTableContainerParameters);
        this.table = new CreatorElement(scoreTableParameters);

        this.generateTableHead();
        this.generateTableBody(scores);

        scoreTableContainerCreator.addInnerElement(this.table.getElement());
        this.viewElementCreator.addInnerElement(scoreTableContainerCreator);
    }

    private createControls(): void {
        const paginationControlsContainerCreator = new CreatorElement(paginationControlsContainerParameters);

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

    private prevWinnersPage(): void {
        console.log('prev');
    }

    private nextWinnersPage(): void {
        console.log('next');
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
