import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type { Callback, ElementParameters } from '../../../../types';
import {
    AppStateKeys,
    ButtonParameters,
    CallbackID,
    Car,
    COLORS,
    Description,
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
import { mockData } from '../../../state/initialState';

export default class GarageView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private readonly listOptions: CreatorElement;
    private garageQuantity: CreatorElement | null;
    private garagePage: CreatorElement | null;
    private raceBoard: CreatorElement | null;
    private carCreateLogo: SVGElement | null;
    private carUpdateLogo: SVGElement | null;

    constructor(state: LocalStorageState, router: Router) {
        super(garageParameters);
        this.garageQuantity = null;
        this.garagePage = null;
        this.raceBoard = null;
        this.carCreateLogo = null;
        this.carUpdateLogo = null;
        this.router = router;

        this.state = state;
        this.configureView();
    }

    private configureView(): void {
        //this.addGarageControls()
        this.addCarCreationControls();
        this.addSummary();

        this.createRaceBoard(this.state.getState().cars);
        this.createPageControls();
    }

    private addSummary(garage: number = 0, page: number = 1): void {
        const summaryCreator = new CreatorElement(garageSummaryParameters);

        this.garageQuantity = new CreatorElement(garageCurrentParameters);
        const garageQuantityText = garage === 0 ? '' : ` (${garage})`;
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
                return () => getCallbackWithID(buttonParameters, this.startRaceForCar);
            }
            case Description.BACK: {
                return () => getCallbackWithID(buttonParameters, this.backFromRaceForCar);
            }
            case Description.SELECT: {
                return () => getCallbackWithID(buttonParameters, this.selectCar);
            }
            case Description.REMOVE: {
                return () => getCallbackWithID(buttonParameters, this.removeCar);
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
        console.log('selectCar', id);
    }
    private removeCar(id: number): void {
        console.log('removeCar', id);
    }

    private startCommonRace(): void {
        console.log('start');
    }

    private resetCommonRace(): void {
        console.log('reset');
    }

    private generateCars(): void {
        console.log('generate');
    }

    private createCar(): void {
        console.log('create');
    }

    private updateCar(): void {
        console.log('update');
    }

    private createCarName(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            console.log('create', target.value);
        }
    }

    private updateCarName(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            console.log('update', target.value);
        }
    }

    private createCarColor(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            console.log('create color', target.value);
        }
    }

    private updateCarColor(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            console.log('update color', target.value);
        }
    }

    private deleteAllListItems(): void {
        const listElement = this.listOptions.getElement();
        if (listElement) {
            while (listElement.firstElementChild) {
                listElement.firstElementChild.remove();
            }
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
                const labelCreator = new LabelCreator(newLabelParameters);
                labelCreator.setTextContent(Description.COLOR);
                container.addInnerElement(labelCreator.getElement());

                prefix === InputUse.CREATE
                    ? carInputColorCreator.getElement().addEventListener('input', this.createCarColor)
                    : carInputColorCreator.getElement().addEventListener('input', this.updateCarColor);

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

    private createRaceBoard(carsData: Array<Car>): void {
        this.raceBoard = new CreatorElement(raceBoardParameters);

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
        console.log(event);
        if (parameters.placeholder === Description.BRAND && prefix === InputUse.CREATE) {
            this.createCarName(event);
        } else if (parameters.placeholder === Description.BRAND && prefix === InputUse.UPDATE) {
            this.updateCarName(event);
        } else if (parameters.type === InputTypes.COLOR && prefix === InputUse.CREATE) {
            this.createCarColor(event);
        } else if (parameters.type === InputTypes.COLOR && prefix === InputUse.UPDATE) {
            this.updateCarColor(event);
        }

        // if (event.target instanceof HTMLInputElement && id) {
        //
        //
        //     //  this.state.setField(id, event.target.value, state, parameters);
        // }
    }
}
