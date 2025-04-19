import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import { garageCurrentParameters, garageParameters, } from './garage-view-parameters';
import type LocalStorageState from '../../../state/session-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import type ApiController from '../../../api/api-controller';
import CreatorDialog from '../../../util/dialog/dialog-creator';
import { dialogContentParameters, dialogParameters } from '../../../util/dialog/dialog-view-parameters';

export default class GarageView extends View {
    public router: Router;
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
    private readonly dialog: CreatorDialog | null;

    constructor(state: LocalStorageState, router: Router) {
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
        this.router = router;
        this.state = state;

        this.dialog = new CreatorDialog(dialogParameters, dialogContentParameters);



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
        const title  = new CreatorElement(garageCurrentParameters)
        this.viewElementCreator.addInnerElement(title)

        this.addDialog();
    }





    // private createButtonCallback = (parameters: ButtonParameters): Callback => {
    //     switch (parameters.textContent) {
    //         case BUTTON_CONSTANTS.buttonRace: {
    //             return () => this.raceController?.startDragRace();
    //         }
    //         case BUTTON_CONSTANTS.buttonReset: {
    //             return () => this.raceController?.resetDragRace();
    //         }
    //         case BUTTON_CONSTANTS.buttonGenerate: {
    //             return () => this.generateCars();
    //         }
    //         case BUTTON_CONSTANTS.buttonCreate: {
    //             return () => this.carController?.createCar();
    //         }
    //         case BUTTON_CONSTANTS.buttonUpdate: {
    //             return () => this.carController?.updateCar();
    //         }
    //         case BUTTON_CONSTANTS.buttonStart: {
    //             return () =>
    //                 getCallbackWithID(
    //                     parameters,
    //                     this.raceController?.startRaceCar.bind(this.raceController) ?? (() => {})
    //                 );
    //         }
    //         case BUTTON_CONSTANTS.buttonBack: {
    //             return () =>
    //                 getCallbackWithID(parameters, this.raceController?.backFromRaceForCar.bind(this) ?? (() => {}));
    //         }
    //         case BUTTON_CONSTANTS.buttonSelect: {
    //             return () => getCallbackWithID(parameters, this.carController?.selectCar.bind(this) ?? (() => {}));
    //         }
    //         case BUTTON_CONSTANTS.buttonRemove: {
    //             return () => getCallbackWithID(parameters, this.carController?.removeCar.bind(this) ?? (() => {}));
    //         }
    //         default: {
    //             return () => {};
    //         }
    //     }
    // };

    // private updateRaceBoardLayout(): void {
    //     View.deleteAllItemsInContainer(this.raceBoard);
    //     this.createRaceBoard(this.state.getState().cars);
    // }


    // private keyupHandler(event: Event, prefix: InputUse, parameters: ElementParameters): void {
    //     if (this.carController && parameters.placeholder === CONSTANTS.brandType) {
    //         if (prefix === InputUse.CREATE) {
    //             this.carController.createCarName(event);
    //         }
    //         if (prefix === InputUse.UPDATE) {
    //             this.carController.updateCarName(event);
    //         }
    //     } else if (this.carController && parameters.type === InputTypes.COLOR) {
    //         if (prefix === InputUse.CREATE && parameters.id) {
    //             this.carController.createCarColor(event, parameters.id);
    //         }
    //         if (prefix === InputUse.CREATE && parameters.id) {
    //             this.carController.updateCarColor(event, parameters.id);
    //         }
    //     }
    // }
}
