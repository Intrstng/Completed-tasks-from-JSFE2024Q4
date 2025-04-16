import type SessionStorageState from '../../state/session-storage-state';
import CreatorElement from '../creator-element';
import type { Callback, ElementParameters, Operator, PageStateKeys, PaginationParameters } from '../../../types';
import { Description } from '../../../types';

export class PaginationController {
    private readonly state: SessionStorageState;
    private prevButton: CreatorElement | null;
    private nextButton: CreatorElement | null;
    private page: CreatorElement | null;
    private paginationContainer: CreatorElement | null;
    private readonly getDataForCurrentPage: Callback | null;
    private readonly updateLayout: Callback | null;
    private paginationParameters: PaginationParameters | null;
    private pageStateKeys: PageStateKeys | null;
    private itemsOnPage: number | null;

    constructor(
        state: SessionStorageState,
        page: CreatorElement,
        container: CreatorElement,
        getDataForCurrentPageCB: Callback,
        updateLayoutCB: Callback,
        paginationParameters: PaginationParameters,
        pageStateKeys: PageStateKeys,
        itemsOnPage: number
    ) {
        this.state = state;
        this.prevButton = null;
        this.nextButton = null;
        this.page = page;
        this.paginationContainer = container;
        this.getDataForCurrentPage = getDataForCurrentPageCB;
        this.updateLayout = updateLayoutCB;
        this.paginationParameters = paginationParameters;
        this.pageStateKeys = pageStateKeys;
        this.itemsOnPage = itemsOnPage;
    }

    public createControls(): void {
        const paginationControlsContainerCreator = new CreatorElement(this.paginationParameters.container);

        const previousButtonParametersWithCB: ElementParameters = {
            ...this.paginationParameters.prevBtn,
            callback: () => this.prevPage(),
        };

        const nextButtonParametersWithCB: ElementParameters = {
            ...this.paginationParameters.nextBtn,
            callback: () => this.nextPage(),
        };

        this.prevButton = new CreatorElement(previousButtonParametersWithCB);
        this.nextButton = new CreatorElement(nextButtonParametersWithCB);
        this.toggleDisabledForPaginationButtons();

        paginationControlsContainerCreator.addInnerElement(this.prevButton.getElement());

        paginationControlsContainerCreator.addInnerElement(this.nextButton.getElement());

        this.paginationContainer.addInnerElement(paginationControlsContainerCreator);
    }

    public toggleDisabledForPaginationButtons(): void {
        const currentPage: number = this.state.getState()[this.pageStateKeys.currentPage];
        const totalCars: number = this.state.getState()[this.pageStateKeys.itemsTotal];

        if (currentPage === 1) {
            if (this.prevButton) {
                this.prevButton.setDisabled(true);
            }
        } else {
            if (this.prevButton) {
                this.prevButton.setDisabled(false);
            }
        }
        if (currentPage >= totalCars / this.itemsOnPage) {
            this.nextButton.setDisabled(true);
        } else this.nextButton.setDisabled(false);
    }

    private async prevPage(): Promise<void> {
        const currentPage: number = this.state.getState()[this.pageStateKeys.currentPage];
        this.countPageValue(Description.DECREMENT, currentPage);

        this.page.setTextContent(`${Description.PAGE} ${this.state.getState()[this.pageStateKeys.currentPage]}`);

        await this.getDataForCurrentPage();
        this.updateLayout();
        this.toggleDisabledForPaginationButtons();
    }

    private async nextPage(): Promise<void> {
        const currentPage: number = this.state.getState()[this.pageStateKeys.currentPage];
        this.countPageValue(Description.INCREMENT, currentPage);

        this.page.setTextContent(`${Description.PAGE} ${this.state.getState()[this.pageStateKeys.currentPage]}`);

        await this.getDataForCurrentPage();
        this.updateLayout();
        this.toggleDisabledForPaginationButtons();
    }

    private countPageValue(operator: Operator, page: number): void {
        if (typeof page === 'number' && Number.isFinite(page)) {
            const itemsQuantity = this.state.getState()[this.pageStateKeys.itemsTotal];

            if (operator === Description.INCREMENT && page < itemsQuantity / this.itemsOnPage) {
                this.state.updatePropertyInState(this.pageStateKeys.currentPage, ++page);
            } else if (operator === Description.DECREMENT && page > 1) {
                this.state.updatePropertyInState(this.pageStateKeys.currentPage, --page);
            }
        }
    }
}
