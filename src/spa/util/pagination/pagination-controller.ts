import type SessionStorageState from '../../state/session-storage-state';
import CreatorElement from '../creator-element';
import type { Callback, ElementParameters, Operator, PageStateKeys, PaginationParameters } from '../../../types';
import { Description } from '../../../types';

export class PaginationController {
    private readonly state: SessionStorageState;
    private prevButton: CreatorElement | null = null;
    private nextButton: CreatorElement | null = null;
    private readonly page: CreatorElement | null;
    private readonly paginationContainer: CreatorElement | null;
    private readonly getDataForCurrentPage: Callback | null;
    private readonly updateLayout: Callback | null;
    private readonly paginationParameters: PaginationParameters | null;
    private readonly pageStateKeys: PageStateKeys | null;
    private readonly itemsOnPage: number | null;

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
        this.page = page;
        this.paginationContainer = container;
        this.getDataForCurrentPage = getDataForCurrentPageCB;
        this.updateLayout = updateLayoutCB;
        this.paginationParameters = paginationParameters;
        this.pageStateKeys = pageStateKeys;
        this.itemsOnPage = itemsOnPage;
    }

    public createControls(): void {
        let paginationControlsContainerCreator: CreatorElement | null = null;
        if (this.paginationParameters) {
            paginationControlsContainerCreator = new CreatorElement(this.paginationParameters.container);
        }

        const previousButtonParametersWithCB: ElementParameters = {
            ...this.paginationParameters?.prevBtn,
            callback: () => this.prevPage(),
        };

        const nextButtonParametersWithCB: ElementParameters = {
            ...this.paginationParameters?.nextBtn,
            callback: () => this.nextPage(),
        };

        this.prevButton = new CreatorElement(previousButtonParametersWithCB);
        this.nextButton = new CreatorElement(nextButtonParametersWithCB);
        this.toggleDisabledForPaginationButtons();

        if (paginationControlsContainerCreator) {
            paginationControlsContainerCreator.addInnerElement(this.prevButton.getElement());
            paginationControlsContainerCreator.addInnerElement(this.nextButton.getElement());
        }

        if (this.paginationContainer instanceof CreatorElement) {
            this.paginationContainer.addInnerElement(paginationControlsContainerCreator);
        }
    }

    public toggleDisabledForPaginationButtons(): void {
        let currentPage: number = 0;
        let totalCars: number = 0;

        if (this.pageStateKeys) {
            currentPage = this.state.getState()[this.pageStateKeys?.currentPage];
            totalCars = this.state.getState()[this.pageStateKeys?.itemsTotal];
        }

        if (currentPage === 1) {
            if (this.prevButton) {
                this.prevButton.setDisabled(true);
            }
        } else {
            if (this.prevButton) {
                this.prevButton.setDisabled(false);
            }
        }
        if (
            this.itemsOnPage &&
            currentPage >= totalCars / this.itemsOnPage &&
            this.nextButton instanceof CreatorElement
        ) {
            this.nextButton.setDisabled(true);
        } else if (this.nextButton instanceof CreatorElement) {
            this.nextButton.setDisabled(false);
        }
    }

    private async prevPage(): Promise<void> {
        let currentPage: number = 0;

        if (this.pageStateKeys) {
            currentPage = this.state.getState()[this.pageStateKeys.currentPage];
        }

        this.countPageValue(Description.DECREMENT, currentPage);

        if (this.page instanceof CreatorElement && this.pageStateKeys) {
            this.page.setTextContent(`${Description.PAGE} ${this.state.getState()[this.pageStateKeys.currentPage]}`);
        }

        if (this.getDataForCurrentPage) {
            await this.getDataForCurrentPage();
        }
        if (this.updateLayout) {
            this.updateLayout();
        }
        this.toggleDisabledForPaginationButtons();
    }

    private async nextPage(): Promise<void> {
        let currentPage: number = 0;

        if (this.pageStateKeys) {
            currentPage = this.state.getState()[this.pageStateKeys.currentPage];
        }

        this.countPageValue(Description.INCREMENT, currentPage);

        if (this.page instanceof CreatorElement && this.pageStateKeys) {
            this.page.setTextContent(`${Description.PAGE} ${this.state.getState()[this.pageStateKeys.currentPage]}`);
        }

        if (this.getDataForCurrentPage) {
            await this.getDataForCurrentPage();
        }
        if (this.updateLayout) {
            this.updateLayout();
        }
        this.toggleDisabledForPaginationButtons();
    }

    private countPageValue(operator: Operator, page: number): void {
        if (Number.isFinite(page)) {
            let itemsQuantity: number = 0;
            if (this.pageStateKeys) {
                itemsQuantity = this.state.getState()[this.pageStateKeys.itemsTotal];
            }

            if (this.itemsOnPage && operator === Description.INCREMENT && page < itemsQuantity / this.itemsOnPage) {
                if (this.pageStateKeys) {
                    this.state.updatePropertyInState(this.pageStateKeys.currentPage, ++page);
                }
            } else if (operator === Description.DECREMENT && page > 1 && this.pageStateKeys) {
                this.state.updatePropertyInState(this.pageStateKeys.currentPage, --page);
            }
        }
    }
}
