import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type { AppState, Callback, CarPayload, ElementParameters, EngineData, Operator } from '../../../../types';
import {
    Animation,
    AnimationFrame,
    AppStateKeys,
    ButtonParameters,
    Car,
    COLORS,
    CssClasses,
    Description,
    InputFieldsKeys,
    InputTypes,
    InputUse,
} from '../../../../types';
import CreatorElement from '../../../util/creator-element';
import {
    carBlockParameters,
    carControlsButtonsParameters,
    carCreationBlockParameters,
    carCreationContainerParameters,
    carNameParameters,
    carRaceControlsParameters,
    carRaceParameters,
    carUpdateBlockParameters,
    createButtonParameters,
    finishParameters,
    garageCurrentParameters,
    garagePageCurrentParameters,
    garageParameters,
    garageSummaryParameters,
    inputsParameters,
    labelParameters,
    mainButtonsContainerParameters,
    mainControlsButtonsParameters,
    nextButtonGarageParameters,
    paginationGarageControlsContainerParameters,
    prevButtonGarageParameters,
    raceBoardParameters,
    trackParameters,
    updateButtonParameters,
} from './garage-view-parameters';
import LocalStorageState from '../../../state/local-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import LabelCreator from '../../../util/label/label-creator';
import { getCallbackWithID } from '../../../util/assertion-functions/assertion-functions';
import { changeSvgStrokeColor, createSVG } from '../../../util/createSvg/createSvg';
import { svgElements } from '../../../util/createSvg/data';
import ApiController from '../../../api/api-controller';
import { generateCarsCollection } from '../../../util/generate-random-car/generate-cars-collection';
import { CONSTANTS } from '../../../state/initial-state';

export default class GarageView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private garageQuantity: CreatorElement | null;
    private garagePage: CreatorElement | null;
    private raceBoard: CreatorElement | null;
    private finish: CreatorElement | null;
    private carAnimation: AnimationFrame;
    private inputCreateNameField: InputFieldCreator | null;
    private inputCreateColorField: InputFieldCreator | null;
    private inputUpdateNameField: InputFieldCreator | null;
    private inputUpdateColorField: InputFieldCreator | null;
    private carCreateLogo: SVGElement | null;
    private carUpdateLogo: SVGElement | null;
    public api: ApiController;

    constructor(state: LocalStorageState, router: Router, api: ApiController) {
        super(garageParameters);
        this.garageQuantity = null;
        this.garagePage = null;
        this.raceBoard = null;
        this.finish = null;
        this.carAnimation = { animationID: null, distance: 0 };
        this.inputCreateNameField = null;
        this.inputCreateColorField = null;
        this.inputUpdateNameField = null;
        this.inputUpdateColorField = null;
        this.carCreateLogo = null;
        this.carUpdateLogo = null;
        this.router = router;
        this.state = state;
        this.api = api;
        this.configureView();
        //this.deleteAllItemsInContainer(this.raceBoard)
    }

    private configureView(): void {
        this.getCarsForCurrentPage();

        //this.addGarageControls()
        this.addCarCreationControls();
        this.createPageControls();
        this.addSummary();
        this.createRaceBoard(this.state.getState().cars, true);
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
    }

    private async nextGaragePage(): Promise<void> {
        const currentGaragePage: number = this.state.getState()[AppStateKeys.GARAGE_PAGE];
        this.countGaragePageValue(Description.INCREMENT, currentGaragePage);

        this.garagePage.setTextContent(`${Description.PAGE} ${this.state.getState()[AppStateKeys.GARAGE_PAGE]}`);

        await this.getCarsForCurrentPage();
        this.updateRaceBoardLayout();
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

    // private async getCarsForCurrentPage(): Promise<void> {
    //     const currentGaragePage = this.state.getState()[AppStateKeys.GARAGE_PAGE];
    //
    //     if (typeof currentGaragePage === 'number' && isFinite(currentGaragePage)) {
    //         await this.api.getCars(currentGaragePage);
    //     }
    // }

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

        const prevBtnCreator = new CreatorElement(prevButtonGarageParametersWithCB);
        const nextBtnCreator = new CreatorElement(nextButtonGarageParametersWithCB);

        paginationControlsContainerCreator.addInnerElement(prevBtnCreator.getElement());

        paginationControlsContainerCreator.addInnerElement(nextBtnCreator.getElement());

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
        //this.viewElementCreator.addInnerElement(mainButtonsContainerCreator);
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
            // fill input fields
            this.inputUpdateNameField.setValue(selectedCar.name);
            this.inputUpdateColorField.setValue(selectedCar.color);
            changeSvgStrokeColor(InputUse.UPDATE, selectedCar.color);
            console.log(this.state.getState());
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, selectedCar.name);
            this.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, selectedCar.color);

            console.log(this.state.getState());
        } else {
            console.log(`Car with id: ${id} not found`);
        }
    }

    private async removeCar(id: number): Promise<void> {
        console.log('removeCar', id);
        await this.api.deleteCar(id);
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

        this.updateRaceBoardLayout();
    }

    private async createCar(): Promise<void> {
        const name: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.CREATE_NAME];

        let color: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.CREATE_COLOR];

        const carPayload = {
            name,
            color: color || COLORS.BLACK,
        };

        await this.api.createCar(carPayload);

        this.clearValuesInInputFields(InputUse.CREATE);
        this.clearInputFieldsValuesInState(InputUse.CREATE);
        changeSvgStrokeColor(InputUse.CREATE, COLORS.BLACK);

        await this.getCarsForCurrentPage();
        this.updateGarageQuantityLayout();
        // redraw layout
        this.updateRaceBoardLayout();
    }

    private async updateCar(): Promise<void> {
        const name: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.UPDATE_NAME];

        let color: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.UPDATE_COLOR];

        let selectedCarID: number = this.state.getState()[AppStateKeys.SELECTED_CAR]['id'];

        const carPayload = {
            name,
            color: color || COLORS.BLACK,
        };

        await this.api.updateCar(carPayload, selectedCarID);
        this.clearValuesInInputFields(InputUse.UPDATE);
        this.clearInputFieldsValuesInState(InputUse.UPDATE);
        this.clearSelectedCarStateProperty();
        changeSvgStrokeColor(InputUse.UPDATE, COLORS.BLACK);
        // await this.getCarsForCurrentPage()
        // redraw layout
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
            this.inputCreateColorField.setValue(COLORS.BLACK);
        } else if (inputsUse === InputUse.UPDATE) {
            this.inputUpdateNameField.setValue('');
            this.inputUpdateColorField.setValue(COLORS.BLACK);
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
            console.log(idName, target.value);
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

    private resetState(): void {
        const emptyState: any = {
            list: [],
            lastId: 0,
        };
        // this.state.setState(emptyState);
    }

    // private addDialog(
    //     contentParameters: Array<DialogContentParameters>,
    //     callback?: CallbackDialogSubmit
    // ): CreatorDialog {
    //   const dialog = new CreatorDialog(dialogParameters, contentParameters, this.state, callback);
    //
    //   this.viewElementCreator.addInnerElement(dialog);
    //   return dialog;
    // }

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
        this.carCreateLogo = createSVG(svgElements, COLORS.BLACK, InputUse.CREATE);
        carCreationBlockCreator.addInnerElement(this.carCreateLogo);
        this.addCarBlockButton(carCreationBlockCreator, createButtonParameters);

        const carUpdateBlockCreator = new CreatorElement(carUpdateBlockParameters);
        this.addInputsCarBlock(carUpdateBlockCreator, InputUse.UPDATE);
        this.carUpdateLogo = createSVG(svgElements, COLORS.BLACK, InputUse.UPDATE);
        carUpdateBlockCreator.addInnerElement(this.carUpdateLogo);
        this.addCarBlockButton(carUpdateBlockCreator, updateButtonParameters);

        carCreationContainerCreator.addInnerElement(carCreationBlockCreator.getElement());
        carCreationContainerCreator.addInnerElement(carUpdateBlockCreator.getElement());
        carCreationContainerCreator.addInnerElement(this.addGarageControls().getElement());
        this.viewElementCreator.addInnerElement(carCreationContainerCreator.getElement());
    }

    private createRaceBoard(carsData: Array<Car>, isInitCall?: boolean): void {
        if (isInitCall) {
            this.raceBoard = new CreatorElement(raceBoardParameters);
            this.viewElementCreator.addInnerElement(this.raceBoard.getElement());
        }

        carsData.forEach(car => {
            this.createCarBlock(car, this.raceBoard);
        });

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

    private showDialog(type: any): void {
        // let dialog: CreatorDialog | null = null;
        // if (type === ButtonNames.PASTE) {
        //   dialog = this.addDialog(dialogPasteListContentParameters, this.setValuesFromPasteList.bind(this));
        // } else if (ButtonNames.START) {
        //   dialog = this.addDialog(dialogStartContentParameters);
        // }
        // if (dialog) {
        //   dialog.showDialog();
        // }
    }

    private getTrackDistance(car: HTMLElement): number {
        const carRect = car.getBoundingClientRect();
        const finishRect = this.finish.getElement().getBoundingClientRect();

        const carCenterPoint = carRect.left + carRect.width / 2;
        const finishCenterPoint = finishRect.left + finishRect.width / 2;

        return finishCenterPoint - carCenterPoint;
    }

    private async startRaceCar(id: number, isDragRace: boolean = false): Promise<{ success: boolean } | undefined> {
        console.log('startRaceCar', id);
        // const currentState: AppState = this.state.getState();
        // const updatedState: AppState = {
        //     ...currentState,
        //     winner: {
        //         ...currentState.winner,
        //         name: '',
        //         time: '',
        //     }
        // }
        // this.state.setState(updatedState);

        const winnerName: string = this.state.getState()[AppStateKeys.WINNER].name;

        // this.updatePropertyInState(AppStateKeys.WINNER, '');
        let carIcon: HTMLElement = this.getCarIconFromLayout(id);
        const trackDistance: number = this.getTrackDistance(carIcon);

        const carEngineData: EngineData | undefined = await this.api.startEngine(id);
        if (!carEngineData) return;

        const { velocity, distance }: EngineData = carEngineData;
        const raceTime: number = Math.round(distance / velocity);
        this.carAnimation = this.animateCarRacing(carIcon, raceTime, trackDistance);

        const response = await this.api.driveCar(id);
        if (!response) return;

        const animationDistance = Math.round(this.carAnimation.distance);
        const animationCarState: Animation = { id, distance: animationDistance };

        const currentAnimationState = this.state.getState();
        const newAnimationState = {
            ...currentAnimationState,
            animation: [...currentAnimationState.animation, animationCarState],
        };
        this.state.setState(newAnimationState);

        if (!response.success) {
            const currentAnimationID: number = this.carAnimation.animationID;
            if (currentAnimationID) {
                changeSvgStrokeColor(String(id), COLORS.RED);
                window.cancelAnimationFrame(currentAnimationID);
            }
        } else {
            // winner logic
            console.log('winnerName', winnerName);
            if (isDragRace && winnerName === '') {
                //if (winnerName === '') {
                const winnerCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === id); // Move to the top

                if (winnerCar) {
                    const currentState: AppState = this.state.getState();
                    const updatedState: AppState = {
                        ...currentState,
                        winner: { ...currentState.winner, name: winnerCar.name, time: String(raceTime) },
                    };
                    console.log(updatedState);
                    this.state.setState(updatedState);
                    // Add logic to open modal window here...

                    const winnerResponse = await this.api.checkWinner(id);
                    if (typeof winnerResponse === 'boolean' && !winnerResponse) {
                        const newWinner = { id, wins: 1, time: raceTime };
                        await this.api.createWinner(newWinner);
                    } else if (winnerResponse !== true) {
                        if (typeof winnerResponse !== 'boolean') {
                            const bestTime = raceTime < winnerResponse.time ? raceTime : winnerResponse.time;
                            await this.api.updateWinner({ time: bestTime, wins: winnerResponse.wins + 1 }, id);
                        }
                    }
                }
            }
            // changeSvgStrokeColor(String(id), COLORS.YELLOW);
        }
        return response;
    }

    private startDragRace(): void {
        console.log('start');
        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        const promises = allCars.map(car => this.startRaceCar(car.id, true));
        Promise.all(promises).then(() => {
            console.log('This race is finished!');
        });
    }

    private resetDragRace(): void {
        console.log('Reset drag race will be implemented soon...');
        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        allCars.forEach(car => this.backFromRaceForCar(car.id));
    }

    private async backFromRaceForCar(id: number): Promise<void> {
        console.log('backFromRace', id);
        const currentCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === id); // Move to the top

        const currentAnimationID = this.carAnimation.animationID;
        if (currentAnimationID) {
            window.cancelAnimationFrame(currentAnimationID);
        }
        await this.api.stopEngine(id);
        if (currentCar) {
            const currentCarColor = currentCar.color;
            changeSvgStrokeColor(String(id), currentCarColor);
        }
        const car = this.getCarIconFromLayout(id);
        car.style.transform = `translateX(0px)`;
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

    private animateCarRacing(car: HTMLElement, duration: number, trackDistance: number): AnimationFrame {
        let start: number | null = null;
        const animationDataCollection: AnimationFrame = { animationID: null, distance: 0 };

        const animate = (timestamp: number) => {
            if (!start) {
                start = timestamp;
            }

            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
            const left = trackDistance * progress; // The position based on progress

            car.style.transform = `translateX(${left}px)`;
            animationDataCollection.distance = left;

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

        // if (event.target instanceof HTMLInputElement && id) {
        //
        //
        //     //  this.state.setField(id, event.target.value, state, parameters);
        // }
    }
}
