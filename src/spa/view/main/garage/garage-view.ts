import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type {
    AppState,
    Callback,
    CarPayload,
    ElementParameters,
    EngineData,
    Operator,
    ResponseObject,
} from '../../../../types';
import {
    AnimationFrame,
    AppStateKeys,
    ButtonParameters,
    Car,
    CssClasses,
    Description,
    InputFieldsKeys,
    InputTypes,
    InputUse,
    RaceWinnerMessage,
} from '../../../../types';
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
    inputsParameters,
    labelParameters,
    paginationGarageControlsContainerParameters,
    raceBoardParameters,
    trackParameters,
} from './garage-view-parameters';
import LocalStorageState from '../../../state/session-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import LabelCreator from '../../../util/label/label-creator';
import { getCallbackWithID } from '../../../util/assertion-functions/assertion-functions';
import { changeSvgStrokeColor, createSVG } from '../../../util/createSvg/createSvg';
import { svgElements } from '../../../util/createSvg/data';
import ApiController from '../../../api/api-controller';
import { generateCarsCollection } from '../../../util/generate-random-car/generate-cars-collection';
import { CONSTANTS } from '../../../state/initial-state';
import CreatorDialog from '../../../util/dialog/dialog-creator';
import {
    allGarageButtonsToggleDisable,
    carButtonToggleDisable,
    raceButtonToggleDisable,
    toggleDisabledAllCarButtons,
    toggleDisabledDragRaceControlButtons,
    toggleDisabledManageCarButtons,
    togglePaginationButtons,
} from '../../../util/button/button-disable-toggle';
import { COLORS } from '../../../../constants/constants';
import { CSS_BUTTON } from '../../../util/button/button-classes';
import {
    carControlsButtonsParameters,
    createButtonParameters,
    mainButtonsContainerParameters,
    mainControlsButtonsParameters,
    nextButtonGarageParameters,
    prevButtonGarageParameters,
    updateButtonParameters,
} from '../../../util/button/button-parameters/garage-view-buttons/garage-view-button-parameters';
import { dialogContentParameters, dialogParameters } from '../../../util/dialog/dialog-view-parameters';

export default class GarageView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private garageQuantity: CreatorElement | null;
    private garagePage: CreatorElement | null;
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
    private dialog: CreatorDialog | null;
    public api: ApiController;

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
        this.dialog = new CreatorDialog(dialogParameters, dialogContentParameters);
        this.router = router;
        this.state = state;
        this.api = api;
        this.configureView();
    }

    private async configureView(): Promise<void> {
        await this.getCarsForCurrentPage();
        this.addCarCreationControls();
        this.createPageControls();
        this.addSummary();
        this.createRaceBoard(this.state.getState().cars, true);
        this.addDialog();
    }

    private updateRaceBoardLayout(): void {
        this.deleteAllItemsInContainer(this.raceBoard);
        this.createRaceBoard(this.state.getState().cars);
    }

    private async getCarsForCurrentPage(): Promise<void> {
        const currentGaragePage = this.state.getState()[AppStateKeys.GARAGE_PAGE];

        if (typeof currentGaragePage === 'number' && isFinite(currentGaragePage)) {
            await this.api.getCars(currentGaragePage);
        }
    }

    private updateGarageQuantityLayout(): void {
        const carsQuantity: number = this.state.getState()[AppStateKeys.CARS_QUANTITY];
        const garageQuantityText: string = carsQuantity === 0 ? '' : ` (${carsQuantity})`;
        this.garageQuantity.setTextContent(`${Description.GARAGE}${garageQuantityText}`);
    }

    private addSummary(): void {
        const carsQuantity: number = this.state.getState()[AppStateKeys.CARS_QUANTITY] || 0;
        const garageQuantityText: string = carsQuantity === 0 ? '' : ` (${carsQuantity})`;
        const currentGaragePage = this.state.getState()[AppStateKeys.GARAGE_PAGE];

        const summaryCreator = new CreatorElement(garageSummaryParameters);

        this.garageQuantity = new CreatorElement(garageCurrentParameters);
        this.garageQuantity.setTextContent(`${Description.GARAGE}${garageQuantityText}`);

        this.garagePage = new CreatorElement(garagePageCurrentParameters);
        this.garagePage.setTextContent(`${Description.PAGE} ${currentGaragePage}`);

        summaryCreator.addInnerElement(this.garageQuantity);
        summaryCreator.addInnerElement(this.garagePage);

        this.viewElementCreator.addInnerElement(summaryCreator);
    }

    private async prevGaragePage(): Promise<void> {
        const currentGaragePage: number = this.state.getState()[AppStateKeys.GARAGE_PAGE];
        this.countGaragePageValue(Description.DECREMENT, currentGaragePage);

        this.garagePage.setTextContent(`${Description.PAGE} ${this.state.getState()[AppStateKeys.GARAGE_PAGE]}`);

        await this.getCarsForCurrentPage();
        this.updateRaceBoardLayout();
        this.toggleDisabledForPaginationButtons();
    }

    private async nextGaragePage(): Promise<void> {
        const currentGaragePage: number = this.state.getState()[AppStateKeys.GARAGE_PAGE];
        this.countGaragePageValue(Description.INCREMENT, currentGaragePage);

        this.garagePage.setTextContent(`${Description.PAGE} ${this.state.getState()[AppStateKeys.GARAGE_PAGE]}`);

        await this.getCarsForCurrentPage();
        this.updateRaceBoardLayout();
        this.toggleDisabledForPaginationButtons();
    }

    private countGaragePageValue(operator: Operator, page: number): void {
        if (typeof page === 'number' && isFinite(page)) {
            const carsQuantity = this.state.getState()[AppStateKeys.CARS_QUANTITY];

            if (operator === Description.INCREMENT && page < carsQuantity / CONSTANTS.carsOnPage) {
                this.updatePropertyInState(AppStateKeys.GARAGE_PAGE, ++page);
            } else if (operator === Description.DECREMENT && page > 1) {
                this.updatePropertyInState(AppStateKeys.GARAGE_PAGE, --page);
            }
        }
    }

    private createPageControls(): void {
        const paginationControlsContainerCreator = new CreatorElement(paginationGarageControlsContainerParameters);

        const prevButtonGarageParametersWithCB: ElementParameters = {
            ...prevButtonGarageParameters,
            callback: () => this.prevGaragePage(),
        };

        const nextButtonGarageParametersWithCB: ElementParameters = {
            ...nextButtonGarageParameters,
            callback: () => this.nextGaragePage(),
        };

        this.prevButton = new CreatorElement(prevButtonGarageParametersWithCB);
        this.nextButton = new CreatorElement(nextButtonGarageParametersWithCB);
        this.toggleDisabledForPaginationButtons();

        paginationControlsContainerCreator.addInnerElement(this.prevButton.getElement());

        paginationControlsContainerCreator.addInnerElement(this.nextButton.getElement());

        this.viewElementCreator.addInnerElement(paginationControlsContainerCreator);
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

    private createButtonCallback = (buttonParameters: ButtonParameters): Callback => {
        switch (buttonParameters.textContent) {
            case Description.RACE: {
                return () => this.startDragRace();
            }
            case Description.RESET: {
                return () => this.resetDragRace();
            }
            case Description.GENERATE: {
                return () => this.generateCars();
            }
            case Description.CREATE: {
                return () => this.createCar();
            }
            case Description.UPDATE: {
                return () => this.updateCar();
            }
            case Description.START: {
                return () => getCallbackWithID(buttonParameters, this.startRaceCar.bind(this));
            }
            case Description.BACK: {
                return () => getCallbackWithID(buttonParameters, this.backFromRaceForCar.bind(this));
            }
            case Description.SELECT: {
                return () => getCallbackWithID(buttonParameters, this.selectCar.bind(this));
            }
            case Description.REMOVE: {
                return () => getCallbackWithID(buttonParameters, this.removeCar.bind(this));
            }
            default: {
                return () => {};
            }
        }
    };

    private selectCar(id: number): void {
        const currentState: AppState = this.state.getState();
        const selectedCar: Car | undefined = currentState.cars.find(car => car.id === id);

        if (selectedCar) {
            const newState: AppState = {
                ...currentState,
                selectedCar: {
                    id,
                    name: selectedCar.name,
                    color: selectedCar.color,
                },
            };
            this.state.setState(newState);

            this.inputUpdateNameField.setValue(selectedCar.name);
            this.inputUpdateColorField.setValue(selectedCar.color);
            changeSvgStrokeColor(InputUse.UPDATE, selectedCar.color);
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, selectedCar.name);
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, selectedCar.color);
        } else {
            console.log(`Car with id: ${id} not found`);
        }
    }

    private async removeCar(id: number): Promise<void> {
        await this.api.deleteCar(id);
        await this.api.deleteWinner(id);
        await this.getCarsForCurrentPage();
        this.updateGarageQuantityLayout();

        this.updateRaceBoardLayout();
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
        this.toggleDisabledForPaginationButtons();

        this.updateRaceBoardLayout();
    }

    private async createCar(): Promise<void> {
        const name: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.CREATE_NAME];

        let color: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.CREATE_COLOR];

        const carPayload = {
            name,
            color: color || COLORS.black,
        };

        await this.api.createCar(carPayload);

        this.clearValuesInInputFields(InputUse.CREATE);
        this.clearInputFieldsValuesInState(InputUse.CREATE);
        changeSvgStrokeColor(InputUse.CREATE, COLORS.black);

        await this.getCarsForCurrentPage();
        this.updateGarageQuantityLayout();

        this.updateRaceBoardLayout();
    }

    private async updateCar(): Promise<void> {
        const name: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.UPDATE_NAME];

        let color: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.UPDATE_COLOR];

        let selectedCarID: number = this.state.getState()[AppStateKeys.SELECTED_CAR]['id'];

        const carPayload = {
            name,
            color: color || COLORS.black,
        };

        await this.api.updateCar(carPayload, selectedCarID);
        this.clearValuesInInputFields(InputUse.UPDATE);
        this.clearInputFieldsValuesInState(InputUse.UPDATE);
        this.clearSelectedCarStateProperty();
        changeSvgStrokeColor(InputUse.UPDATE, COLORS.black);

        this.updateRaceBoardLayout();
    }

    private clearInputFieldsValuesInState(inputsUse: InputUse): void {
        if (inputsUse === InputUse.CREATE) {
            this.updateInputFieldStateProperty(InputFieldsKeys.CREATE_NAME, '');
            this.updateInputFieldStateProperty(InputFieldsKeys.CREATE_COLOR, '');
        } else if (inputsUse === InputUse.UPDATE) {
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, '');
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, '');
        }
    }

    private clearValuesInInputFields(inputsUse: InputUse): void {
        if (inputsUse === InputUse.CREATE) {
            this.inputCreateNameField.setValue('');
            this.inputCreateColorField.setValue(COLORS.black);
        } else if (inputsUse === InputUse.UPDATE) {
            this.inputUpdateNameField.setValue('');
            this.inputUpdateColorField.setValue(COLORS.black);
        }
    }

    private createCarName(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            this.updateInputFieldStateProperty(InputFieldsKeys.CREATE_NAME, target.value);
        }
    }

    private clearSelectedCarStateProperty(): void {
        const currentState: AppState = this.state.getState();
        const updatedState: AppState = {
            ...currentState,
            selectedCar: {
                id: 0,
                name: '',
                color: '',
            },
        };
        this.state.setState(updatedState);
    }

    private updateInputFieldStateProperty(key: string, value: string): void {
        const currentState: AppState = this.state.getState();

        const updatedState: AppState = {
            ...currentState,
            inputData: {
                ...currentState.inputData,
                [key]: value,
            },
        };
        this.state.setState(updatedState);
    }

    private updatePropertyInState(key: string, value: string | number | boolean): void {
        const currentState: AppState = this.state.getState();

        const updatedState: AppState = {
            ...currentState,
            [key]: value,
        };
        this.state.setState(updatedState);
    }

    private updateCarName(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, target.value);
        }
    }

    private createCarColor(event: Event, idName: string): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            changeSvgStrokeColor(idName, target.value);
            this.updateInputFieldStateProperty(InputFieldsKeys.CREATE_COLOR, target.value);
        }
    }

    private updateCarColor(event: Event, idName: string): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            changeSvgStrokeColor(idName, target.value);
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, target.value);
        }
    }

    private addDialog(): void {
        this.viewElementCreator.addInnerElement(this.dialog.getElement());
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
            const callback = (event: Event): void => this.keyupHandler(event, prefix, inputParameters);
            if (inputParameters.type === InputTypes.TEXT) {
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

            if (inputParameters.type === InputTypes.COLOR) {
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

                const eventHandler =
                    prefix === InputUse.CREATE
                        ? (event: Event) => this.createCarColor(event, prefix)
                        : (event: Event) => this.updateCarColor(event, prefix);

                carInputColorCreator.getElement().addEventListener('input', eventHandler);
                container.addInnerElement(carInputColorCreator.getElement());
            }
        });
    }

    private addCarCreationControls(): void {
        const carCreationContainerCreator = new CreatorElement(carCreationContainerParameters);

        const carCreationBlockCreator = new CreatorElement(carCreationBlockParameters);
        this.addInputsCarBlock(carCreationBlockCreator, InputUse.CREATE);
        this.carCreateLogo = createSVG(svgElements, COLORS.black, InputUse.CREATE);
        carCreationBlockCreator.addInnerElement(this.carCreateLogo);
        this.addCarBlockButton(carCreationBlockCreator, createButtonParameters);

        const carUpdateBlockCreator = new CreatorElement(carUpdateBlockParameters);
        this.addInputsCarBlock(carUpdateBlockCreator, InputUse.UPDATE);
        this.carUpdateLogo = createSVG(svgElements, COLORS.black, InputUse.UPDATE);
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

            if (carsData.length === 0) {
                let currentPage: number = this.state.getState()[AppStateKeys.GARAGE_PAGE];
                --currentPage;
                currentPage = currentPage === 0 ? 1 : currentPage;
                this.updatePropertyInState(AppStateKeys.GARAGE_PAGE, currentPage);
                await this.getCarsForCurrentPage();
                this.updateRaceBoardLayout();
                this.garagePage.setTextContent(`${Description.PAGE} ${currentPage}`);
                return;
            }

            carsData.forEach(car => {
                this.createCarBlock(car, this.raceBoard);
            });
        } catch (error: unknown) {
            console.error('Race board creation failed:', error instanceof Error ? error.message : String(error));
        }

        this.viewElementCreator.addInnerElement(this.raceBoard.getElement());
    }

    private createCarBlock(carData: Car, container: CreatorElement): void {
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

        container.addInnerElement(carBlockCreator.getElement());
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
                id: `${buttonParameters.classNames[1]}-${carData.id}`,
                callback,
            };

            const buttonCreator = new CreatorElement(buttonParametersWithCB);
            carControls.addInnerElement(buttonCreator.getElement());
        });

        container.addInnerElement(carControls.getElement());
    }

    private createCarTrack(carData: Car, container: CreatorElement): void {
        const carTrackCreator = new CreatorElement(trackParameters);

        const carIconCreator = createSVG(svgElements, carData.color, String(carData.id));
        this.finish = new CreatorElement(finishParameters);

        carTrackCreator.addInnerElement(carIconCreator);
        carTrackCreator.addInnerElement(this.finish.getElement());
        container.addInnerElement(carTrackCreator.getElement());
    }

    private getTrackDistance(car: HTMLElement): number {
        const carRect = car.getBoundingClientRect();
        const finishRect = this.finish.getElement().getBoundingClientRect();

        const carCenterPoint = carRect.left + carRect.width / 2;
        const finishCenterPoint = finishRect.left + finishRect.width / 2;

        return finishCenterPoint - carCenterPoint;
    }

    private async startRaceCar(id: number, isDragRace?: boolean): Promise<ResponseObject | undefined> {
        toggleDisabledAllCarButtons(id, true);
        toggleDisabledDragRaceControlButtons(true);
        raceButtonToggleDisable(true);
        let carIcon: HTMLElement = this.getCarIconFromLayout(id);
        const trackDistance: number = this.getTrackDistance(carIcon);

        const carEngineData: EngineData | undefined = await this.api.startEngine(id);
        if (!carEngineData) return;

        const { velocity, distance }: EngineData = carEngineData;
        const raceTime: number = Math.round(distance / velocity);

        const currentAnimation: AnimationFrame = this.animateCarRacing(id, carIcon, raceTime, trackDistance);

        const response = await this.api.driveCar(id);

        if (!response) return;

        const currentAnimationState = this.state.getState();
        const newAnimationState = {
            ...currentAnimationState,
            animation: [...currentAnimationState.animation, currentAnimation],
        };
        this.state.setState(newAnimationState);

        if (!response.success) {
            const currentAnimationID: number = currentAnimation.animationID;
            if (currentAnimationID) {
                changeSvgStrokeColor(String(id), COLORS.red);
                window.cancelAnimationFrame(currentAnimationID);
                if (isDragRace) {
                    throw new Error('Car`s engine is broken...');
                }
            }
        }
        const carBackButtonID: string = `${CSS_BUTTON.BUTTON_BACK}-${id}`;
        carButtonToggleDisable(carBackButtonID, false);
        toggleDisabledDragRaceControlButtons(false);
        return {
            ...response,
            carID: id,
            time: raceTime,
        };
    }

    private async startDragRace(): Promise<void> {
        toggleDisabledManageCarButtons(true);
        raceButtonToggleDisable(true);
        togglePaginationButtons(true);

        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        const promises: Promise<ResponseObject>[] = allCars.map(car => this.startRaceCar(car.id, true));

        Promise.any(promises)
            .then(async (response: ResponseObject) => {
                if (response && response.carID !== undefined) {
                    const carID: number = response.carID;
                    const time: number = response.time;
                    const winnerResponse = await this.api.checkWinner(carID);

                    if (typeof winnerResponse === 'boolean' && !winnerResponse) {
                        const newApiWinner = { id: carID, wins: 1, time };
                        await this.api.createWinner(newApiWinner);
                    } else if (winnerResponse !== true) {
                        if (typeof winnerResponse !== 'boolean') {
                            const bestTime = time < winnerResponse.time ? time : winnerResponse.time;
                            await this.api.updateWinner({ time: bestTime, wins: winnerResponse.wins + 1 }, carID);
                        }
                    }
                } else {
                    console.warn('Response does not contain carID:', response);
                }
                const currentWinnerData: RaceWinnerMessage = {
                    carID: response.carID,
                    time: String(response.time / CONSTANTS.milliseconds),
                };
                this.showWinnersMessage(currentWinnerData);
                allGarageButtonsToggleDisable(false);
                this.toggleDisabledForPaginationButtons();
                raceButtonToggleDisable(true);
            })
            .catch(error => {
                if (error instanceof AggregateError) {
                    console.error('All promises were rejected:', error.errors);
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            });
    }

    private showWinnersMessage(data: RaceWinnerMessage): void {
        const winnersCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === data.carID);
        const winnersName = winnersCar.name || Description.WINNER;

        this.dialog.setDialogNameField(winnersName);
        this.dialog.setDialogTimeField(String(data.time));
        this.dialog.showDialog();
        this.dialog.closeDialogByTimeout(CONSTANTS.dialogDelay);
    }

    private resetDragRace(): void {
        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        allCars.forEach(car => this.backFromRaceForCar(car.id));
    }

    private toggleDisabledForPaginationButtons(): void {
        const currentGaragePage: number = this.state.getState()[AppStateKeys.GARAGE_PAGE];
        const totalCars: number = this.state.getState()[AppStateKeys.CARS_QUANTITY];

        if (currentGaragePage === 1) {
            if (this.prevButton) {
                this.prevButton.setDisabled(true);
            }
        } else {
            if (this.prevButton) {
                this.prevButton.setDisabled(false);
            }
        }
        if (currentGaragePage >= totalCars / CONSTANTS.carsOnPage) {
            this.nextButton.setDisabled(true);
        } else this.nextButton.setDisabled(false);
    }

    private async backFromRaceForCar(id: number): Promise<void> {
        try {
            toggleDisabledAllCarButtons(id, false);
            toggleDisabledDragRaceControlButtons(false);
            raceButtonToggleDisable(false);
            const currentCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === id);
            const currentState: AppState = this.state.getState();
            let carAnimationCollection: Array<AnimationFrame> = currentState[AppStateKeys.ANIMATION];
            const currentAnimationID = carAnimationCollection.find(animation => animation.carID === id);

            if (currentAnimationID) {
                window.cancelAnimationFrame(currentAnimationID.animationID);
                carAnimationCollection = carAnimationCollection.filter(animation => animation.carID !== id);
                const updatedState: AppState = {
                    ...currentState,
                    animation: carAnimationCollection,
                };
                this.state.setState(updatedState);
            }
            await this.api.stopEngine(id);
            if (currentCar) {
                const currentCarColor = currentCar.color;
                changeSvgStrokeColor(String(id), currentCarColor);
            }
            const car = this.getCarIconFromLayout(id);
            car.style.transform = `translateX(0px)`;
        } catch (error: unknown) {
            console.error('Error occurred:', error instanceof Error ? error.message : String(error));
        }
    }

    private getCarIconFromLayout(id: number): HTMLElement {
        const carIconCollection: HTMLCollectionOf<Element> = document.getElementsByClassName(
            `${CssClasses.SVG_ICON}-${id}`
        );
        let carIcon: HTMLElement | null = null;
        if (carIconCollection.length > 0) {
            carIcon = carIconCollection[0] as HTMLElement;
        }
        return carIcon;
    }

    private animateCarRacing(carID: number, car: HTMLElement, duration: number, trackDistance: number): AnimationFrame {
        let start: number | null = null;
        const animationDataCollection: AnimationFrame = { carID, animationID: null, distance: 0 };

        const animate = (timestamp: number) => {
            if (!start) {
                start = timestamp;
            }

            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
            const left = trackDistance * progress; // The position based on progress

            car.style.transform = `translateX(${left}px)`;
            animationDataCollection.distance = Math.round(left);

            if (progress < 1) {
                animationDataCollection.animationID = window.requestAnimationFrame(animate);
            }
        };

        animationDataCollection.animationID = window.requestAnimationFrame(animate);
        return animationDataCollection;
    }

    private keyupHandler(event: Event, prefix: InputUse, parameters: ElementParameters): void {
        if (parameters.placeholder === Description.BRAND && prefix === InputUse.CREATE) {
            this.createCarName(event);
        } else if (parameters.placeholder === Description.BRAND && prefix === InputUse.UPDATE) {
            this.updateCarName(event);
        } else if (parameters.type === InputTypes.COLOR && prefix === InputUse.CREATE) {
            this.createCarColor(event, parameters.id);
        } else if (parameters.type === InputTypes.COLOR && prefix === InputUse.UPDATE) {
            this.updateCarColor(event, parameters.id);
        }
    }
}
