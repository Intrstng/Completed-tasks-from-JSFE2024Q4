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

    private deleteListItem(id: string): void {
        const state: any = this.state.getState();
        // state.list = state.list.filter(item => item.id !== id);
        // this.state.setState(state);
        //
        // this.deleteAllListItems();
        // this.buildListItemGroup();
    }

    private addButtons(buttonsParameters: any): void {
        // const buttonsContainer = new CreatorElement(mainButtonsContainerParameters);
        //
        // buttonsParameters.forEach(buttonParameters => {
        //   const callback: Callback = this.createButtonCallback(buttonParameters);
        //
        //   const buttonParametersWithCB = {
        //     ...buttonParameters,
        //     callback,
        //   };
        //
        //   const creatorButton = new ButtonCreator(buttonParametersWithCB);
        //   buttonsContainer.addInnerElement(creatorButton);
        // });
        // this.viewElementCreator.addInnerElement(buttonsContainer);
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

    private addInputsCarBlock(container: CreatorElement, prefix: string): void {
        inputsParameters.forEach(inputParameter => {
            const inputParameterWithCB = {
                ...inputParameter,
                id: `${inputParameter.id}${prefix}`,
            };
            const carInputCreator = new InputFieldCreator(inputParameterWithCB);

            if (inputParameter.type === InputTypes.COLOR) {
                const newLabelParameters = {
                    ...inputParameter,
                    ...labelParameters,
                    textContent: prefix,
                };

                const labelCreator = new LabelCreator(newLabelParameters);
                labelCreator.setTextContent(Description.COLOR);
                container.addInnerElement(labelCreator.getElement());
            }

            container.addInnerElement(carInputCreator.getElement());
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

    private keyupHandler(event: Event, id: string | undefined, state: any, parameters: ElementParameters): void {
        if (event.target instanceof HTMLInputElement && id) {
            if (
                (event.target.type === 'number' && event.target.value.includes('e')) ||
                event.target.value.includes('E')
            ) {
                event.target.value = event.target.value.replaceAll(/e/gi, '');
            }

            if (event.target.type === 'number' && Number.parseInt(event.target.value, 10) > 1000) {
                event.target.value = event.target.value.slice(0, -1);
            }

            //  this.state.setField(id, event.target.value, state, parameters);
        }
    }
}
