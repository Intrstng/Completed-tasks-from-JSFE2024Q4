import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type { Callback, ElementParameters } from '../../../../types';
import { ButtonParameters, Description, InputTypes, InputUse } from '../../../../types';
import CreatorElement from '../../../util/creator-element';
import {
    carCreationBlockParameters,
    carCreationContainerParameters,
    carUpdateBlockParameters,
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
} from './garage-view-parameters';
import LocalStorageState from '../../../state/local-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import LabelCreator from '../../../util/label/label-creator';

const mockCars = [
    {
        name: 'Tesla',
        color: '#e6e6fa',
        id: 1,
    },
    {
        name: 'BMW',
        color: '#fede00',
        id: 2,
    },
    {
        name: 'Mersedes',
        color: '#6c779f',
        id: 3,
    },
    {
        name: 'Ford',
        color: '#ef3c40',
        id: 4,
    },
];

export default class GarageView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private readonly listOptions: CreatorElement;
    private garageQuantity: CreatorElement | null;
    private garagePage: CreatorElement | null;

    constructor(state: LocalStorageState, router: Router) {
        super(garageParameters);
        this.garageQuantity = null;
        this.garagePage = null;
        this.router = router;

        this.state = state;
        this.configureView();
    }

    private configureView(): void {
        this.addSummary();
        // this.addGarageControls()
        this.addCarCreationControls();
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
                return () => this.startRaceForCar();
            }
            case Description.BACK: {
                return () => this.backFromRaceForCar();
            }
            case Description.SELECT: {
                return () => this.selectCar();
            }
            case Description.REMOVE: {
                return () => this.removeCar();
            }
            default: {
                return () => {};
            }
        }
    };

    private startRaceForCar(): void {
        console.log('startRaceForCar');
    }
    private backFromRaceForCar(): void {
        console.log('backFromRace');
    }
    private selectCar(): void {
        console.log('selectCar');
    }
    private removeCar(): void {
        console.log('removeCar');
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

        const carUpdateBlockCreator = new CreatorElement(carUpdateBlockParameters);

        this.addInputsCarBlock(carUpdateBlockCreator, InputUse.UPDATE);

        carCreationContainerCreator.addInnerElement(carCreationBlockCreator.getElement());
        carCreationContainerCreator.addInnerElement(carUpdateBlockCreator.getElement());
        carCreationContainerCreator.addInnerElement(this.addGarageControls().getElement());
        this.viewElementCreator.addInnerElement(carCreationContainerCreator.getElement());
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
