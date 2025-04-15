import {
    AppStateKeys,
    Callback,
    Car,
    CreateTableRecordsCB,
    CssClasses,
    Description,
    ElementParameters,
    OrderButtonParametersWithCB,
    SortOrderType,
    TableRecord,
    ToggleButtonActiveClassCB,
    Winner,
} from '../../../types';
import CreatorElement from '../creator-element';
import {
    scoreTableContainerParameters,
    scoreTableParameters,
    spanParameters,
    tableBodyParameters,
    tableHeadCellParameters,
    tableHeadColumnsNames,
    tableHeadParameters,
    tableRowCellParameters,
    tableRowParameters,
    theadButtonsContainer,
} from '../../view/main/winners/winners-view-parameters';
import { createSVG } from '../createSvg/createSvg';
import { svgElements } from '../createSvg/data';
import { createTableRecords } from './create-table-records';
import SessionStorageState from '../../state/session-storage-state';
import { toggleButtonActiveClass } from '../button/button-disable-toggle';
import {
    ascTimeButtonParameters,
    ascWinsButtonParameters,
    descTimeButtonParameters,
    descWinsButtonParameters,
} from '../button/button-parameters/winners-view-parameters/winners-view-button-parameters';

export default class Table {
    private readonly state: SessionStorageState;
    private readonly winnersPage: CreatorElement | null;
    private container: CreatorElement | null;
    private tableContainer: CreatorElement | null;
    private table: CreatorElement | null;
    private ascWinButton: CreatorElement | null;
    private descWinButton: CreatorElement | null;
    private ascTimeButton: CreatorElement | null;
    private descTimeButton: CreatorElement | null;
    private readonly createTableRecords: CreateTableRecordsCB | null;
    private readonly toggleButtonActiveClass: ToggleButtonActiveClassCB | null;
    private readonly getWinnersForCurrentPage: Callback | null;
    private readonly updateTableLayout: Callback | null;

    constructor(
        state: SessionStorageState,
        winnersPage: CreatorElement,
        container: CreatorElement,
        getWinnersForCurrentPageCB: Callback,
        updateTableLayoutCB: Callback
    ) {
        this.tableContainer = null;
        this.createTableRecords = createTableRecords;
        this.toggleButtonActiveClass = toggleButtonActiveClass;
        this.state = state;
        this.winnersPage = winnersPage;
        this.container = container;
        this.getWinnersForCurrentPage = getWinnersForCurrentPageCB;
        this.updateTableLayout = updateTableLayoutCB;
    }

    public getTableCreator(): CreatorElement {
        return this.table;
    }

    public addScoreTable(isInitCall?: boolean): void {
        if (isInitCall) {
            this.tableContainer = new CreatorElement(scoreTableContainerParameters);
            this.container.addInnerElement(this.tableContainer.getElement());
        }
        this.table = new CreatorElement(scoreTableParameters);

        this.generateTableHead();
        this.generateTableBody();

        this.tableContainer.addInnerElement(this.table.getElement());
        this.container.addInnerElement(this.tableContainer);
    }

    private generateTableHead(): void {
        const theadCreator = new CreatorElement(tableHeadParameters);
        const theadRowCreator = new CreatorElement(tableRowParameters);

        tableHeadColumnsNames.forEach(columnName => {
            const headCellCreator = new CreatorElement(tableHeadCellParameters);
            if (columnName === Description.NAME) {
                headCellCreator.setCssClasses([CssClasses.TABLE_HEAD_NAME]);
                headCellCreator.setTextContent(columnName);
            } else if (columnName === Description.WINS || columnName === Description.TIME) {
                const { ascButtonParametersWithCB, descButtonParametersWithCB } =
                    this.addOrderBtnCallbacksToParameters(columnName);
                const theadCellContainerCreator = new CreatorElement(theadButtonsContainer);
                let ascBtnCreator: CreatorElement | null;
                let descBtnCreator: CreatorElement | null;

                if (columnName === Description.WINS) {
                    this.ascWinButton = new CreatorElement(ascButtonParametersWithCB);
                    this.descWinButton = new CreatorElement(descButtonParametersWithCB);
                    ascBtnCreator = this.ascWinButton;
                    descBtnCreator = this.descWinButton;
                } else if (columnName === Description.TIME) {
                    this.ascTimeButton = new CreatorElement(ascButtonParametersWithCB);
                    this.descTimeButton = new CreatorElement(descButtonParametersWithCB);
                    ascBtnCreator = this.ascTimeButton;
                    descBtnCreator = this.descTimeButton;
                }
                const textContentCreator = new CreatorElement(spanParameters);
                textContentCreator.setTextContent(columnName);

                theadCellContainerCreator.addInnerElement(ascBtnCreator.getElement());
                theadCellContainerCreator.addInnerElement(textContentCreator.getElement());
                theadCellContainerCreator.addInnerElement(descBtnCreator.getElement());

                headCellCreator.addInnerElement(theadCellContainerCreator.getElement());
            } else {
                headCellCreator.setTextContent(columnName);
            }

            theadRowCreator.addInnerElement(headCellCreator.getElement());
        });

        theadCreator.addInnerElement(theadRowCreator.getElement());
        this.table.addInnerElement(theadCreator.getElement());
        this.toggleActiveClassSortButton();
    }

    private async generateTableBody(): Promise<void> {
        const tbodyCreator = new CreatorElement(tableBodyParameters);
        const winnersDataCollection: Array<Car> = this.state.getState()[AppStateKeys.WINNERS_DATA];
        const winnersCollection: Array<Winner> = this.state.getState()[AppStateKeys.WINNERS];

        const scoreRecords: Array<TableRecord> = this.createTableRecords(winnersDataCollection, winnersCollection);
        try {
            if (scoreRecords.length === 0) {
                let currentPage: number = this.state.getState()[AppStateKeys.WINNERS_PAGE];
                --currentPage;
                currentPage = currentPage === 0 ? 1 : currentPage;
                this.state.updatePropertyInState(AppStateKeys.WINNERS_PAGE, currentPage);
                await this.getWinnersForCurrentPage();
                this.updateTableLayout();
                this.winnersPage.setTextContent(`${Description.PAGE} ${currentPage}`);
                return;
            }
            scoreRecords.forEach((record, index) => {
                const rowCreator = new CreatorElement(tableRowParameters);

                const numberCellCreator = new CreatorElement(tableRowCellParameters);
                numberCellCreator.setTextContent(String(++index));

                const carCellCreator = new CreatorElement(tableRowCellParameters);
                const carTableLogo = createSVG(svgElements, record.color, Description.TABLE);
                carCellCreator.addInnerElement(carTableLogo);

                const nameCellCreator = new CreatorElement(tableRowCellParameters);
                nameCellCreator.setTextContent(record.name);
                nameCellCreator.setCssClasses([CssClasses.TABLE_ROW_NAME]);

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
        } catch (error: unknown) {
            console.error('Table row creation failed:', error instanceof Error ? error.message : String(error));
        }
        this.table.addInnerElement(tbodyCreator.getElement());
    }

    private addOrderBtnCallbacksToParameters(columnName: Description): OrderButtonParametersWithCB {
        let ascButtonParametersWithCB: ElementParameters | null = null;
        let descButtonParametersWithCB: ElementParameters | null = null;
        if (columnName === Description.WINS) {
            ascButtonParametersWithCB = {
                ...ascWinsButtonParameters,
                callback: () => this.sortTableByWins(Description.ASC),
            };
            descButtonParametersWithCB = {
                ...descWinsButtonParameters,
                callback: () => this.sortTableByWins(Description.DESC),
            };
        }

        if (columnName === Description.TIME) {
            ascButtonParametersWithCB = {
                ...ascTimeButtonParameters,
                callback: () => this.sortTableByTime(Description.ASC),
            };
            descButtonParametersWithCB = {
                ...descTimeButtonParameters,
                callback: () => this.sortTableByTime(Description.DESC),
            };
        }

        return { ascButtonParametersWithCB, descButtonParametersWithCB };
    }

    private async sortTableByWins(sortOrder: SortOrderType): Promise<void> {
        this.state.updatePropertyInState(AppStateKeys.SORT_TYPE, Description.SORT_WINS);
        this.state.updatePropertyInState(AppStateKeys.ORDER_WINS, sortOrder);
        this.state.updatePropertyInState(AppStateKeys.WINS_SORT_ACTIVE, true);
        this.state.updatePropertyInState(AppStateKeys.TIME_SORT_ACTIVE, false);

        await this.getWinnersForCurrentPage();

        this.toggleButtonActiveClass(this.ascWinButton);
        this.toggleButtonActiveClass(this.descWinButton);
        this.updateTableLayout();
    }

    private async sortTableByTime(sortOrder: SortOrderType): Promise<void> {
        this.state.updatePropertyInState(AppStateKeys.SORT_TYPE, Description.SORT_TIME);
        this.state.updatePropertyInState(AppStateKeys.ORDER_TIME, sortOrder);
        this.state.updatePropertyInState(AppStateKeys.WINS_SORT_ACTIVE, false);
        this.state.updatePropertyInState(AppStateKeys.TIME_SORT_ACTIVE, true);

        await this.getWinnersForCurrentPage();

        this.toggleButtonActiveClass(this.ascTimeButton);
        this.toggleButtonActiveClass(this.descTimeButton);
        this.updateTableLayout();
    }

    private toggleActiveClassSortButton(): void {
        const currentSortType = this.state.getState()[AppStateKeys.SORT_TYPE];
        const currentOrderWins = this.state.getState()[AppStateKeys.ORDER_WINS];
        const currentOrderTime = this.state.getState()[AppStateKeys.ORDER_TIME];

        if (currentSortType === Description.SORT_WINS) {
            if (currentOrderWins === Description.ASC) {
                this.toggleButtonActiveClass(this.ascWinButton);
            } else if (currentOrderWins === Description.DESC) {
                this.toggleButtonActiveClass(this.descWinButton);
            }
        } else if (currentSortType === Description.SORT_TIME) {
            if (currentOrderTime === Description.ASC) {
                this.toggleButtonActiveClass(this.ascTimeButton);
            } else if (currentOrderTime === Description.DESC) {
                this.toggleButtonActiveClass(this.descTimeButton);
            }
        }
    }
}
