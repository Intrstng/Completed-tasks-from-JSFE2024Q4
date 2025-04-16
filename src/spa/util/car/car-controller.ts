import SessionStorageState from '../../state/session-storage-state';
import { AppState, AppStateKeys, Callback, Car, InputFieldsKeys, InputUse } from '../../../types';
import { changeSvgStrokeColor } from '../createSvg/createSvg';
import { COLORS } from '../../../constants/constants';
import { CSS_GARAGE } from '../../view/main/garage/garage-classes';
import ApiController from '../../api/api-controller';
import InputFieldCreator from '../input-field/input-field-creator';

export class CarController {
    private readonly state: SessionStorageState;
    private api: ApiController;
    private inputCreateNameField: InputFieldCreator | null;
    private inputCreateColorField: InputFieldCreator | null;
    private inputUpdateNameField: InputFieldCreator | null;
    private inputUpdateColorField: InputFieldCreator | null;
    private readonly getCarsForCurrentPage: Callback | null;
    private readonly updateGarageQuantityLayout: Callback | null;
    private readonly updateRaceBoardLayout: Callback | null;

    constructor(
        state: SessionStorageState,
        api: ApiController,
        inputCreateNameField: InputFieldCreator,
        inputCreateColorField: InputFieldCreator,
        inputUpdateNameField: InputFieldCreator,
        inputUpdateColorField: InputFieldCreator,
        getApiData: Callback,
        updateGarageQuantityLayout: Callback,
        updateRaceBoardLayout: Callback
    ) {
        this.state = state;
        this.api = api;
        this.inputCreateNameField = inputCreateNameField;
        this.inputCreateColorField = inputCreateColorField;
        this.inputUpdateNameField = inputUpdateNameField;
        this.inputUpdateColorField = inputUpdateColorField;
        this.getCarsForCurrentPage = getApiData;
        this.updateGarageQuantityLayout = updateGarageQuantityLayout;
        this.updateRaceBoardLayout = updateRaceBoardLayout;
    }

    public selectCar(id: number): void {
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
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, selectedCar.name);
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, selectedCar.color);
        } else {
            console.log(`Car with id: ${id} not found`);
        }
    }

    public async removeCar(id: number): Promise<void> {
        await this.api.deleteCar(id);
        await this.api.deleteWinner(id);
        await this.getCarsForCurrentPage();
        this.updateGarageQuantityLayout();

        this.updateRaceBoardLayout();
    }

    public async createCar(): Promise<void> {
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

    public async updateCar(): Promise<void> {
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

    public createCarName(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            this.state.updateInputFieldStateProperty(InputFieldsKeys.CREATE_NAME, target.value);
        }
    }

    public updateCarName(event: Event): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, target.value);
        }
    }

    public createCarColor(event: Event, idName: string): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            changeSvgStrokeColor(idName, target.value);
            this.state.updateInputFieldStateProperty(InputFieldsKeys.CREATE_COLOR, target.value);
        }
    }

    public updateCarColor(event: Event, idName: string): void {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            changeSvgStrokeColor(idName, target.value);
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, target.value);
        }
    }

    public getCarIconFromLayout(id: number): HTMLElement {
        const carIconCollection: HTMLCollectionOf<Element> = document.getElementsByClassName(
            `${CSS_GARAGE.SVG_ICON}-${id}`
        );
        let carIcon: HTMLElement | null = null;
        if (carIconCollection.length > 0) {
            carIcon = carIconCollection[0] as HTMLElement;
        }
        return carIcon;
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

    private clearInputFieldsValuesInState(inputsUse: InputUse): void {
        if (inputsUse === InputUse.CREATE) {
            this.state.updateInputFieldStateProperty(InputFieldsKeys.CREATE_NAME, '');
            this.state.updateInputFieldStateProperty(InputFieldsKeys.CREATE_COLOR, '');
        } else if (inputsUse === InputUse.UPDATE) {
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, '');
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, '');
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
}
