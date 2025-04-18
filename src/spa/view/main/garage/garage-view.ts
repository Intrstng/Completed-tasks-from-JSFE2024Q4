import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type { ButtonParameters, Callback, Car, CarPayload, ElementParameters, EventCB } from '../../../../types';
import { AppStateKeys, Description, InputTypes, InputUse } from '../../../../types';
import CreatorElement from '../../../util/creator-element';
import {
    carBlockParameters,
    carCreationBlockParameters,
    carCreationContainerParameters,
    carNameParameters,
    carRaceControlsParameters,
    carRaceParameters,
    carUpdateBlockParameters,
    finishParameters,
    garageCurrentParameters,
    garagePageCurrentParameters,
    garageParameters,
    garageSummaryParameters,
    raceBoardParameters,
    trackParameters,
} from './garage-view-parameters';
import type LocalStorageState from '../../../state/session-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import LabelCreator from '../../../util/label/label-creator';
import { getCallbackWithID } from '../../../util/assertion-functions/assertion-functions';
import { createSvg } from '../../../util/create-svg/create-svg';
import { svgElements } from '../../../util/create-svg/data';
import type ApiController from '../../../api/api-controller';
import { generateCarsCollection } from '../../../util/generate-random-car/generate-cars-collection';
import { CONSTANTS } from '../../../state/initial-state';
import { COLORS } from '../../../../constants/constants';
import {
    carControlsButtonsParameters,
    createButtonParameters,
    mainButtonsContainerParameters,
    mainControlsButtonsParameters,
    updateButtonParameters,
} from '../../../util/button/button-parameters/garage-view-buttons/garage-view-button-parameters';
import { inputsParameters } from '../../../util/input-field/input-view-parameters';
import { labelParameters } from '../../../util/label/label-view-parameters';
import {
    pageGarageStateKeys,
    paginationGarageParameters,
} from '../../../util/pagination/garage-view-pagination/garage-view-pagination-parameters';
import { PaginationController } from '../../../util/pagination/pagination-controller';
import { CarController } from '../../../util/car/car-controller';
import { RaceController } from '../../../util/race/race-controller';
import CreatorDialog from '../../../util/dialog/dialog-creator';
import { dialogContentParameters, dialogParameters } from '../../../util/dialog/dialog-view-parameters';
import { BUTTON_CONSTANTS } from '../../../util/button/button-parameters/button-constants';
import { PagesNames } from '../../header/header-constants';

export default class GarageView extends View {
    public router: Router;
    public api: ApiController;
    private readonly state: LocalStorageState;
    private garageQuantity: CreatorElement | null;
    private readonly garagePage: CreatorElement | null;
    private raceBoard: CreatorElement | null;
    private finish: CreatorElement | null;
    private inputCreateNameField: InputFieldCreator | null;
    private inputCreateColorField: InputFieldCreator | null;
    private inputUpdateNameField: InputFieldCreator | null;
    private inputUpdateColorField: InputFieldCreator | null;
    private carCreateLogo: SVGElement | null;
    private carUpdateLogo: SVGElement | null;
    private prevButton: CreatorElement | null;
    private nextButton: CreatorElement | null;
    private readonly paginationController: PaginationController | null;
    private carController: CarController | null;
    private raceController: RaceController | null;
    private readonly dialog: CreatorDialog | null;

    constructor(state: LocalStorageState, router: Router, api: ApiController) {
        super(garageParameters);
        this.garageQuantity = null;
        this.garagePage = null;
        this.raceBoard = null;
        this.finish = null;
        this.inputCreateNameField = null;
        this.inputCreateColorField = null;
        this.inputUpdateNameField = null;
        this.inputUpdateColorField = null;
        this.carCreateLogo = null;
        this.carUpdateLogo = null;
        this.prevButton = null;
        this.nextButton = null;
        this.carController = null;
        this.raceController = null;
        this.router = router;
        this.state = state;
        this.api = api;
        this.garagePage = new CreatorElement(garagePageCurrentParameters);
        this.dialog = new CreatorDialog(dialogParameters, dialogContentParameters);

        this.paginationController = new PaginationController(
            state,
            this.garagePage,
            this.viewElementCreator,
            this.getCarsForCurrentPage.bind(this),
            this.updateRaceBoardLayout.bind(this),
            paginationGarageParameters,
            pageGarageStateKeys,
            CONSTANTS.carsOnPage
        );

        this.configureView();
    }

    public addDialog(): void {
        if (this.dialog instanceof CreatorDialog) {
            const dialogElement: HTMLElement | null = this.dialog.getElement();
            if (dialogElement) {
                this.viewElementCreator.addInnerElement(dialogElement);
            }
        }
    }

    private async configureView(): Promise<void> {
        await this.getCarsForCurrentPage();
        this.addCarCreationControls();

        this.carController = new CarController(
            this.state,
            this.api,
            this.inputCreateNameField,
            this.inputCreateColorField,
            this.inputUpdateNameField,
            this.inputUpdateColorField,
            this.getCarsForCurrentPage.bind(this),
            this.updateGarageQuantityLayout.bind(this),
            this.updateRaceBoardLayout.bind(this)
        );

        if (this.paginationController instanceof PaginationController) {
            this.paginationController.createControls();
        }
        this.addSummary();
        this.createRaceBoard(this.state.getState().cars, true);

        this.addDialog();
    }

    private async getCarsForCurrentPage(): Promise<void> {
        const currentGaragePage = this.state.getState()[AppStateKeys.GARAGE_PAGE];

        if (Number.isFinite(currentGaragePage)) {
            await this.api.getCars(currentGaragePage);
        }
    }

    private addSummary(): void {
        const carsQuantity: number = this.state.getState()[AppStateKeys.CARS_QUANTITY] || 0;
        const garageQuantityText: string = carsQuantity === 0 ? '' : ` (${carsQuantity})`;
        const currentGaragePage = this.state.getState()[AppStateKeys.GARAGE_PAGE];

        const summaryCreator = new CreatorElement(garageSummaryParameters);

        this.garageQuantity = new CreatorElement(garageCurrentParameters);
        this.garageQuantity.setTextContent(`${PagesNames.GARAGE}${garageQuantityText}`);

        if (this.garagePage instanceof CreatorElement) {
            this.garagePage.setTextContent(`${Description.PAGE} ${currentGaragePage}`);
        }

        summaryCreator.addInnerElement(this.garageQuantity);
        summaryCreator.addInnerElement(this.garagePage);

        this.viewElementCreator.addInnerElement(summaryCreator);
    }

    private addGarageControls(): CreatorElement {
        const mainButtonsContainerCreator = new CreatorElement(mainButtonsContainerParameters);

        mainControlsButtonsParameters.forEach(buttonParameters => {
            const callback: Callback = this.createButtonCallback(buttonParameters);

            const buttonParametersWithCB = {
                ...buttonParameters,
                callback,
            };

            const buttonCreator = new CreatorElement(buttonParametersWithCB);
            mainButtonsContainerCreator.addInnerElement(buttonCreator.getElement());
        });
        return mainButtonsContainerCreator;
    }

    private createButtonCallback = (parameters: ButtonParameters): Callback => {
        switch (parameters.textContent) {
            case BUTTON_CONSTANTS.buttonRace: {
                return () => this.raceController?.startDragRace();
            }
            case BUTTON_CONSTANTS.buttonReset: {
                return () => this.raceController?.resetDragRace();
            }
            case BUTTON_CONSTANTS.buttonGenerate: {
                return () => this.generateCars();
            }
            case BUTTON_CONSTANTS.buttonCreate: {
                return () => this.carController?.createCar();
            }
            case BUTTON_CONSTANTS.buttonUpdate: {
                return () => this.carController?.updateCar();
            }
            case BUTTON_CONSTANTS.buttonStart: {
                return () =>
                    getCallbackWithID(
                        parameters,
                        this.raceController?.startRaceCar.bind(this.raceController) ?? (() => {})
                    );
            }
            case BUTTON_CONSTANTS.buttonBack: {
                return () =>
                    getCallbackWithID(parameters, this.raceController?.backFromRaceForCar.bind(this) ?? (() => {}));
            }
            case BUTTON_CONSTANTS.buttonSelect: {
                return () => getCallbackWithID(parameters, this.carController?.selectCar.bind(this) ?? (() => {}));
            }
            case BUTTON_CONSTANTS.buttonRemove: {
                return () => getCallbackWithID(parameters, this.carController?.removeCar.bind(this) ?? (() => {}));
            }
            default: {
                return () => {};
            }
        }
    };

    private updateRaceBoardLayout(): void {
        View.deleteAllItemsInContainer(this.raceBoard);
        this.createRaceBoard(this.state.getState().cars);
    }

    private updateGarageQuantityLayout(): void {
        const carsQuantity: number = this.state.getState()[AppStateKeys.CARS_QUANTITY];
        const garageQuantityText: string = carsQuantity === 0 ? '' : ` (${carsQuantity})`;
        this.garageQuantity?.setTextContent(`${PagesNames.GARAGE}${garageQuantityText}`);
    }

    private async generateCars(): Promise<void> {
        const carsCollection: Array<CarPayload> = generateCarsCollection();
        await Promise.all(
            carsCollection.map(async item => {
                await this.api.createCar(item);
            })
        );
        await this.getCarsForCurrentPage();
        this.updateGarageQuantityLayout();
        this.paginationController?.toggleDisabledForPaginationButtons();

        this.updateRaceBoardLayout();
    }

    private addCarBlockButton(container: CreatorElement, buttonParameters: ButtonParameters): void {
        const callback: Callback = this.createButtonCallback(buttonParameters);
        const buttonParametersWithCB = {
            ...buttonParameters,
            callback,
        };
        const buttonCreator = new CreatorElement(buttonParametersWithCB);
        container.addInnerElement(buttonCreator.getElement());
    }

    private addInputsCarBlock(container: CreatorElement, prefix: InputUse): void {
        inputsParameters.forEach(inputParameters => {
            if (inputParameters.type === InputTypes.TEXT) {
                this.handleTextInput(container, prefix, inputParameters);
            } else if (inputParameters.type === InputTypes.COLOR) {
                this.handleColorInput(container, prefix, inputParameters);
            }
        });
    }

    private handleTextInput(container: CreatorElement, prefix: InputUse, inputParameters: ElementParameters): void {
        const callback = (event: Event): void => this.keyupHandler(event, prefix, inputParameters);
        const inputParameterWithCB = {
            ...inputParameters,
            id: `${inputParameters.id}${prefix}`,
            callback,
        };
        const carInputNameCreator = new InputFieldCreator(inputParameterWithCB);

        if (prefix === InputUse.CREATE) {
            this.inputCreateNameField = carInputNameCreator;
        } else if (prefix === InputUse.UPDATE) {
            this.inputUpdateNameField = carInputNameCreator;
        }
        container.addInnerElement(carInputNameCreator.getElement());
    }

    private handleColorInput(container: CreatorElement, prefix: InputUse, inputParameters: ElementParameters): void {
        const inputParameterWithID = {
            ...inputParameters,
            id: `${inputParameters.id}${prefix}`,
        };
        const newLabelParameters = {
            ...inputParameters,
            ...labelParameters,
            textContent: prefix,
        };
        const carInputColorCreator = new InputFieldCreator(inputParameterWithID);

        if (prefix === InputUse.CREATE) {
            this.inputCreateColorField = carInputColorCreator;
        } else if (prefix === InputUse.UPDATE) {
            this.inputUpdateColorField = carInputColorCreator;
        }
        const labelCreator = new LabelCreator(newLabelParameters);
        labelCreator.setTextContent(Description.COLOR);
        container.addInnerElement(labelCreator.getElement());

        const eventHandler: EventCB =
            prefix === InputUse.CREATE
                ? (event: Event) => this.carController?.createCarColor(event, prefix)
                : (event: Event) => this.carController?.updateCarColor(event, prefix);

        const carInputColorElement: HTMLElement | HTMLCanvasElement | null = carInputColorCreator.getElement();

        if (carInputColorElement) {
            carInputColorElement.addEventListener('input', eventHandler);
        }

        container.addInnerElement(carInputColorCreator.getElement());
    }

    private addCarCreationControls(): void {
        const carCreationContainerCreator = new CreatorElement(carCreationContainerParameters);

        const carCreationBlockCreator = new CreatorElement(carCreationBlockParameters);
        this.addInputsCarBlock(carCreationBlockCreator, InputUse.CREATE);
        this.carCreateLogo = createSvg(svgElements, COLORS.black, InputUse.CREATE);
        carCreationBlockCreator.addInnerElement(this.carCreateLogo);
        this.addCarBlockButton(carCreationBlockCreator, createButtonParameters);

        const carUpdateBlockCreator = new CreatorElement(carUpdateBlockParameters);
        this.addInputsCarBlock(carUpdateBlockCreator, InputUse.UPDATE);
        this.carUpdateLogo = createSvg(svgElements, COLORS.black, InputUse.UPDATE);
        carUpdateBlockCreator.addInnerElement(this.carUpdateLogo);
        this.addCarBlockButton(carUpdateBlockCreator, updateButtonParameters);

        carCreationContainerCreator.addInnerElement(carCreationBlockCreator.getElement());
        carCreationContainerCreator.addInnerElement(carUpdateBlockCreator.getElement());
        carCreationContainerCreator.addInnerElement(this.addGarageControls().getElement());
        this.viewElementCreator.addInnerElement(carCreationContainerCreator.getElement());
    }

    private async createRaceBoard(carsData: Array<Car>, isInitCall?: boolean): Promise<void> {
        try {
            if (isInitCall) {
                this.raceBoard = new CreatorElement(raceBoardParameters);
                this.viewElementCreator.addInnerElement(this.raceBoard.getElement());
            }

            if (carsData.length === 0 && this.garagePage) {
                let currentPage: number = this.state.getState()[AppStateKeys.GARAGE_PAGE];
                --currentPage;
                currentPage = currentPage === 0 ? 1 : currentPage;
                this.state.updatePropertyInState(AppStateKeys.GARAGE_PAGE, currentPage);
                await this.getCarsForCurrentPage();
                this.updateRaceBoardLayout();
                this.garagePage.setTextContent(`${Description.PAGE} ${currentPage}`);
                return;
            }

            carsData.forEach(car => {
                this.createCarBlock(car, this.raceBoard);
            });
        } catch (error: unknown) {
            console.error(
                'Race board creation failed:',
                error instanceof Error ? error.message : JSON.stringify(error)
            );
        }

        if (this.raceBoard instanceof CreatorElement) {
            this.viewElementCreator.addInnerElement(this.raceBoard.getElement());
        }
    }

    private createCarBlock(carData: Car, container: CreatorElement | null): void {
        const carBlockCreator = new CreatorElement(carBlockParameters);
        carBlockCreator.setDataAttribute('id', String(carData.id));

        const carNameParametersWithBrand = {
            ...carNameParameters,
            textContent: carData.name,
        };
        const carNameCreator = new CreatorElement(carNameParametersWithBrand);
        carBlockCreator.addInnerElement(carNameCreator.getElement());

        const carRaceCreator = new CreatorElement(carRaceParameters);
        carBlockCreator.addInnerElement(carRaceCreator.getElement());

        this.createCarControls(carData, carRaceCreator);
        this.createCarTrack(carData, carRaceCreator);

        if (container) {
            container.addInnerElement(carBlockCreator.getElement());
        }
    }

    private createCarControls(carData: Car, container: CreatorElement): void {
        const carControls = new CreatorElement(carRaceControlsParameters);

        carControlsButtonsParameters.forEach(buttonParameters => {
            const buttonParametersID = {
                ...buttonParameters,
                id: String(carData.id),
            };

            const callback: Callback = this.createButtonCallback(buttonParametersID);

            const buttonParametersWithCB = {
                ...buttonParameters,
                id: `${buttonParameters.classNames?.[1]}-${carData.id}`,
                callback,
            };

            const buttonCreator = new CreatorElement(buttonParametersWithCB);
            carControls.addInnerElement(buttonCreator.getElement());
        });

        container.addInnerElement(carControls.getElement());
    }

    private createCarTrack(carData: Car, container: CreatorElement): void {
        const carTrackCreator = new CreatorElement(trackParameters);

        const carIconCreator = createSvg(svgElements, carData.color, String(carData.id));
        this.finish = new CreatorElement(finishParameters);

        if (this.carController && this.paginationController && this.dialog) {
            this.raceController = new RaceController(
                this.state,
                this.api,
                this.carController,
                this.paginationController,
                this.viewElementCreator,
                this.finish,
                this.dialog
            );
        }

        carTrackCreator.addInnerElement(carIconCreator);
        carTrackCreator.addInnerElement(this.finish.getElement());
        container.addInnerElement(carTrackCreator.getElement());
    }

    private keyupHandler(event: Event, prefix: InputUse, parameters: ElementParameters): void {
        if (this.carController && parameters.placeholder === CONSTANTS.brandType) {
            if (prefix === InputUse.CREATE) {
                this.carController.createCarName(event);
            }
            if (prefix === InputUse.UPDATE) {
                this.carController.updateCarName(event);
            }
        } else if (this.carController && parameters.type === InputTypes.COLOR) {
            if (prefix === InputUse.CREATE && parameters.id) {
                this.carController.createCarColor(event, parameters.id);
            }
            if (prefix === InputUse.CREATE && parameters.id) {
                this.carController.updateCarColor(event, parameters.id);
            }
        }
    }
}
