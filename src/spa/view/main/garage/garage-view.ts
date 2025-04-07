import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type { AppState, Callback, CarPayload, ElementParameters } from '../../../../types';
import {
    AppStateKeys,
    ButtonParameters,
    CallbackID,
    Car,
    COLORS,
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
import { ShapeElement } from '../../../util/createSvg/types';
import { CONSTANTS, mockData } from '../../../state/initial-state';
import ApiController from '../../../api/api-controller';
import { generateCarsCollection } from '../../../util/generate-random-car/generate-cars-collection';

export default class GarageView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private garageQuantity: CreatorElement | null;
    private garagePage: CreatorElement | null;
    private raceBoard: CreatorElement | null;
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

    private addSummary(page: number = 1): void {
        const carsQuantity: number = this.state.getState()[AppStateKeys.CARS_QUANTITY] || 0;
        const garageQuantityText: string = carsQuantity === 0 ? '' : ` (${carsQuantity})`;

        const summaryCreator = new CreatorElement(garageSummaryParameters);

        this.garageQuantity = new CreatorElement(garageCurrentParameters);
        this.garageQuantity.setTextContent(`${Description.GARAGE}${garageQuantityText}`);

        this.garagePage = new CreatorElement(garagePageCurrentParameters);
        this.garagePage.setTextContent(`${Description.PAGE} ${page}`);

        summaryCreator.addInnerElement(this.garageQuantity);
        summaryCreator.addInnerElement(this.garagePage);

        this.viewElementCreator.addInnerElement(summaryCreator);
    }

    private prevGaragePage(): void {
        console.log('prev garage');
    }

    private nextGaragePage(): void {
        console.log('next garage');
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
                return () => this.startCommonRace();
            }
            case Description.RESET: {
                return () => this.resetCommonRace();
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
                return () => getCallbackWithID(buttonParameters, this.startRaceForCar.bind(this));
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

    private startRaceForCar(id: number): void {
        console.log('startRaceForCar', id);
        changeSvgStrokeColor(String(id), 'red');
    }
    private backFromRaceForCar(id: number): void {
        console.log('backFromRace', id);
    }
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

    private startCommonRace(): void {
        console.log('start');
    }

    private resetCommonRace(): void {
        console.log('reset');
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

    // private deleteAllListItems(): void {
    //     const listElement = this.listOptions.getElement();
    //     if (listElement) {
    //         while (listElement.firstElementChild) {
    //             listElement.firstElementChild.remove();
    //         }
    //     }
    // }

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
    //
    // const eventHandler = prefix === InputUse.CREATE
    //     ? (event: Event) => this.createCarColor(event)
    //     : (event: Event) => this.updateCarColor(event);
    //
    // carInputColorCreator.getElement().addEventListener('input', eventHandler);

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
        const finishCreator = new CreatorElement(finishParameters);

        carTrackCreator.addInnerElement(carIconCreator);
        carTrackCreator.addInnerElement(finishCreator.getElement());
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
