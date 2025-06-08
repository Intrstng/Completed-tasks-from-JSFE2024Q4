import type {
    Callback,
    Car,
    CreateTableRecordsCB,
    ElementParameters,
    OrderButtonParametersWithCB,
    SortOrderType,
    TableRecord,
    ToggleButtonActiveClassCB,
    Winner,
    TableNameHeadCellCB,
} from '../../../types';
import { AppStateKeys, Description } from '../../../types';
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
} from './table-view-parameters';
import { SvgManager } from '../create-svg/create-svg';
import { svgElements } from '../create-svg/data';
import { createTableRecords } from './create-table-records';
import type SessionStorageState from '../../state/session-storage-state';
import { toggleButtonActiveClass } from '../button/button-disable-toggle';
import {
    ascTimeButtonParameters,
    ascWinsButtonParameters,
    descTimeButtonParameters,
    descWinsButtonParameters,
} from '../button/button-parameters/winners-view-parameters/winners-view-button-parameters';
import { CSS_TABLE } from './table-classes';
import { toggleButtonActiveClassAssertion } from '../assertion-functions/assertion-functions';
import { CONSTANTS } from '../../state/initial-state';
import { createNameHeadCell } from './create-name-head-cell';

export default class Table {
    private readonly state: SessionStorageState;
    private readonly winnersPage: CreatorElement | null;
    private readonly container: CreatorElement | null;
    private tableContainer: CreatorElement | null = null;
    private table: CreatorElement | null = null;
    private ascWinButton: CreatorElement | null = null;
    private descWinButton: CreatorElement | null = null;
    private ascTimeButton: CreatorElement | null = null;
    private descTimeButton: CreatorElement | null = null;
    private readonly createTableRecords: CreateTableRecordsCB = createTableRecords;
    private readonly toggleButtonActiveClass: ToggleButtonActiveClassCB = toggleButtonActiveClass;
    private readonly getWinnersForCurrentPage: Callback | null;
    private readonly updateTableLayout: Callback | null;
    private readonly createNameHeadCell: TableNameHeadCellCB = createNameHeadCell;

    constructor(
        state: SessionStorageState,
        winnersPage: CreatorElement,
        container: CreatorElement,
        getWinnersForCurrentPageCB: Callback,
        updateTableLayoutCB: Callback
    ) {
        this.state = state;
        this.winnersPage = winnersPage;
        this.container = container;
        this.getWinnersForCurrentPage = getWinnersForCurrentPageCB;
        this.updateTableLayout = updateTableLayoutCB;
    }

    private static buildTableBodyRows(
        scoreRecords: Array<TableRecord>,
        tbody: CreatorElement,
        currentPage: number
    ): void {
        scoreRecords.forEach((record, index) => {
            const rowCreator = new CreatorElement(tableRowParameters);

            const numberCellCreator = new CreatorElement(tableRowCellParameters);

            const displayIndex = (currentPage - 1) * CONSTANTS.winnersOnPage + (index + 1);

            numberCellCreator.setTextContent(String(displayIndex));

            const carCellCreator = new CreatorElement(tableRowCellParameters);
            const carTableLogo = SvgManager.createSvg(svgElements, record.color, Description.TABLE);
            carCellCreator.addInnerElement(carTableLogo);

            const nameCellCreator = new CreatorElement(tableRowCellParameters);
            nameCellCreator.setTextContent(record.name);
            nameCellCreator.setCssClasses([CSS_TABLE.TABLE_ROW_NAME]);

            const winsCellCreator = new CreatorElement(tableRowCellParameters);
            winsCellCreator.setTextContent(String(record.wins));

            const timeCellCreator = new CreatorElement(tableRowCellParameters);
            timeCellCreator.setTextContent(String(record.time));

            rowCreator.addInnerElement(numberCellCreator.getElement());
            rowCreator.addInnerElement(carCellCreator.getElement());
            rowCreator.addInnerElement(nameCellCreator.getElement());
            rowCreator.addInnerElement(winsCellCreator.getElement());
            rowCreator.addInnerElement(timeCellCreator.getElement());
            tbody.addInnerElement(rowCreator.getElement());
        });
    }

    public getTableCreator(): CreatorElement | null {
        return this.table;
    }

    public addScoreTable(isInitCall?: boolean): void {
        if (isInitCall) {
            this.tableContainer = new CreatorElement(scoreTableContainerParameters);
            if (this.container instanceof CreatorElement) {
                this.container.addInnerElement(this.tableContainer.getElement());
            }
        }
        this.table = new CreatorElement(scoreTableParameters);

        this.generateTableHead();
        this.generateTableBody();

        if (this.tableContainer instanceof CreatorElement) {
            this.tableContainer.addInnerElement(this.table.getElement());
        }
        if (this.container instanceof CreatorElement) {
            this.container.addInnerElement(this.tableContainer);
        }
    }

    private generateTableHead(): void {
        const theadCreator = new CreatorElement(tableHeadParameters);
        const theadRowCreator = new CreatorElement(tableRowParameters);

        tableHeadColumnsNames.forEach(columnName => {
            const headCellCreator = this.createHeadCell(columnName);
            theadRowCreator.addInnerElement(headCellCreator.getElement());
        });

        theadCreator.addInnerElement(theadRowCreator.getElement());
        if (this.table instanceof CreatorElement) {
            this.table.addInnerElement(theadCreator.getElement());
        }
        this.toggleActiveClassSortButton();
    }

    private createHeadCell(columnName: Description): CreatorElement {
        const headCellCreator = new CreatorElement(tableHeadCellParameters);

        if (columnName === Description.NAME) {
            this.createNameHeadCell(headCellCreator, columnName);
        } else if (columnName === Description.WINS || columnName === Description.TIME) {
            this.createSortableHeadCell(headCellCreator, columnName);
        } else {
            headCellCreator.setTextContent(columnName);
        }

        return headCellCreator;
    }

    private createSortableHeadCell(headCellCreator: CreatorElement, columnName: Description): void {
        const { ascButtonParametersWithCB, descButtonParametersWithCB } =
            this.addOrderBtnCallbacksToParameters(columnName);
        const theadCellContainerCreator = new CreatorElement(theadButtonsContainer);

        const { ascButton, descButton } = this.createSortButtons(
            columnName,
            ascButtonParametersWithCB,
            descButtonParametersWithCB
        );
        const textContentCreator = new CreatorElement(spanParameters);
        textContentCreator.setTextContent(columnName);

        if (ascButton) {
            theadCellContainerCreator.addInnerElement(ascButton.getElement());
        }
        theadCellContainerCreator.addInnerElement(textContentCreator.getElement());
        if (descButton) {
            theadCellContainerCreator.addInnerElement(descButton.getElement());
        }

        headCellCreator.addInnerElement(theadCellContainerCreator.getElement());
    }

    private createSortButtons(
        columnName: Description,
        ascButtonParameters: ElementParameters | null,
        descButtonParameters: ElementParameters | null
    ): { ascButton: CreatorElement | null; descButton: CreatorElement | null } {
        let ascButton: CreatorElement | null = null;
        let descButton: CreatorElement | null = null;

        if (columnName === Description.WINS && ascButtonParameters && descButtonParameters) {
            this.ascWinButton = new CreatorElement(ascButtonParameters);
            this.descWinButton = new CreatorElement(descButtonParameters);
            ascButton = this.ascWinButton;
            descButton = this.descWinButton;
        } else if (columnName === Description.TIME && ascButtonParameters && descButtonParameters) {
            this.ascTimeButton = new CreatorElement(ascButtonParameters);
            this.descTimeButton = new CreatorElement(descButtonParameters);
            ascButton = this.ascTimeButton;
            descButton = this.descTimeButton;
        }

        return { ascButton, descButton };
    }

    private async generateTableBody(): Promise<void> {
        const tbodyCreator = new CreatorElement(tableBodyParameters);
        const winnersDataCollection: Array<Car> = this.state.getState()[AppStateKeys.WINNERS_DATA];
        const winnersCollection: Array<Winner> = this.state.getState()[AppStateKeys.WINNERS];

        let scoreRecords: Array<TableRecord> = [];
        if (this.createTableRecords) {
            scoreRecords = this.createTableRecords(winnersDataCollection, winnersCollection);
        }
        try {
            let currentPage: number = this.state.getState()[AppStateKeys.WINNERS_PAGE];
            if (scoreRecords.length === 0) {
                --currentPage;
                currentPage = currentPage === 0 ? 1 : currentPage;
                this.state.updatePropertyInState(AppStateKeys.WINNERS_PAGE, currentPage);
                if (this.getWinnersForCurrentPage) {
                    await this.getWinnersForCurrentPage();
                }
                if (this.updateTableLayout) {
                    this.updateTableLayout();
                }
                if (this.winnersPage instanceof CreatorElement) {
                    this.winnersPage.setTextContent(`${Description.PAGE} ${currentPage}`);
                }
                return;
            }

            Table.buildTableBodyRows(scoreRecords, tbodyCreator, currentPage);
        } catch (error: unknown) {
            console.error('Table row creation failed:', error instanceof Error ? error.message : JSON.stringify(error));
        }
        if (this.table instanceof CreatorElement) {
            this.table.addInnerElement(tbodyCreator.getElement());
        }
    }

    private addOrderBtnCallbacksToParameters(columnName: Description): OrderButtonParametersWithCB {
        let ascButtonParametersWithCB: ElementParameters | null = null;
        let descButtonParametersWithCB: ElementParameters | null = null;
        if (columnName === Description.WINS) {
            ascButtonParametersWithCB = {
                ...ascWinsButtonParameters,
                callback: (): Promise<void> => this.sortTableByWins(Description.ASC),
            };
            descButtonParametersWithCB = {
                ...descWinsButtonParameters,
                callback: (): Promise<void> => this.sortTableByWins(Description.DESC),
            };
        }

        if (columnName === Description.TIME) {
            ascButtonParametersWithCB = {
                ...ascTimeButtonParameters,
                callback: (): Promise<void> => this.sortTableByTime(Description.ASC),
            };
            descButtonParametersWithCB = {
                ...descTimeButtonParameters,
                callback: (): Promise<void> => this.sortTableByTime(Description.DESC),
            };
        }

        return { ascButtonParametersWithCB, descButtonParametersWithCB };
    }

    private async sortTableByWins(sortOrder: SortOrderType): Promise<void> {
        this.state.updatePropertyInState(AppStateKeys.SORT_TYPE, Description.SORT_WINS);
        this.state.updatePropertyInState(AppStateKeys.ORDER_WINS, sortOrder);
        this.state.updatePropertyInState(AppStateKeys.WINS_SORT_ACTIVE, true);
        this.state.updatePropertyInState(AppStateKeys.TIME_SORT_ACTIVE, false);

        if (this.getWinnersForCurrentPage) {
            await this.getWinnersForCurrentPage();
        }
        if (this.toggleButtonActiveClass) {
            toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.ascWinButton);
            toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.descWinButton);
        }

        if (this.updateTableLayout) {
            this.updateTableLayout();
        }
    }

    private async sortTableByTime(sortOrder: SortOrderType): Promise<void> {
        this.state.updatePropertyInState(AppStateKeys.SORT_TYPE, Description.SORT_TIME);
        this.state.updatePropertyInState(AppStateKeys.ORDER_TIME, sortOrder);
        this.state.updatePropertyInState(AppStateKeys.WINS_SORT_ACTIVE, false);
        this.state.updatePropertyInState(AppStateKeys.TIME_SORT_ACTIVE, true);

        if (this.getWinnersForCurrentPage) {
            await this.getWinnersForCurrentPage();
        }

        if (this.toggleButtonActiveClass) {
            toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.ascTimeButton);
            toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.descTimeButton);
        }

        if (this.updateTableLayout) {
            this.updateTableLayout();
        }
    }

    private toggleActiveClassSortButton(): void {
        const currentSortType = this.state.getState()[AppStateKeys.SORT_TYPE];
        const currentOrderWins = this.state.getState()[AppStateKeys.ORDER_WINS];
        const currentOrderTime = this.state.getState()[AppStateKeys.ORDER_TIME];

        if (this.toggleButtonActiveClass && currentSortType === Description.SORT_WINS) {
            if (currentOrderWins === Description.ASC) {
                toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.ascWinButton);
            } else if (currentOrderWins === Description.DESC) {
                toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.descWinButton);
            }
        } else if (this.toggleButtonActiveClass && currentSortType === Description.SORT_TIME) {
            if (currentOrderTime === Description.ASC) {
                toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.ascTimeButton);
            } else if (currentOrderTime === Description.DESC) {
                toggleButtonActiveClassAssertion(this.toggleButtonActiveClass, this.descTimeButton);
            }
        }
    }
}
