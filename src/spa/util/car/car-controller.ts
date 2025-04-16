import type SessionStorageState from '../../state/session-storage-state';
import type { AppState, Callback, Car } from '../../../types';
import { AppStateKeys, InputFieldsKeys, InputUse } from '../../../types';
import { changeSvgStrokeColor } from '../create-svg/create-svg';
import { COLORS } from '../../../constants/constants';
import type ApiController from '../../api/api-controller';
import InputFieldCreator from '../input-field/input-field-creator';

export class CarController {
    private readonly state: SessionStorageState;
    private api: ApiController;
    private readonly inputCreateNameField: InputFieldCreator | null;
    private readonly inputCreateColorField: InputFieldCreator | null;
    private readonly inputUpdateNameField: InputFieldCreator | null;
    private readonly inputUpdateColorField: InputFieldCreator | null;
    private readonly getCarsForCurrentPage: Callback | null;
    private readonly updateGarageQuantityLayout: Callback | null;
    private readonly updateRaceBoardLayout: Callback | null;

    constructor(
        state: SessionStorageState,
        api: ApiController,
        inputCreateNameField: InputFieldCreator | null,
        inputCreateColorField: InputFieldCreator | null,
        inputUpdateNameField: InputFieldCreator | null,
        inputUpdateColorField: InputFieldCreator | null,
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

            if (this.inputUpdateNameField instanceof InputFieldCreator) {
                this.inputUpdateNameField.setValue(selectedCar.name);
            }
            if (this.inputUpdateColorField instanceof InputFieldCreator) {
                this.inputUpdateColorField.setValue(selectedCar.color);
            }
            changeSvgStrokeColor(InputUse.UPDATE, selectedCar.color);
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_NAME, selectedCar.name);
            this.state.updateInputFieldStateProperty(InputFieldsKeys.UPDATE_COLOR, selectedCar.color);
        } else {
            console.log(`Car with id: ${id} not found`);
        }
    }

    public removeCar = async (id: number): Promise<void> => {
        await this.api.deleteCar(id);
        await this.api.deleteWinner(id);
        if (this.getCarsForCurrentPage) {
            await this.getCarsForCurrentPage();
        }
        if (this.updateGarageQuantityLayout) {
            this.updateGarageQuantityLayout();
        }

        const currenSelectedCar = this.state.getState()[AppStateKeys.SELECTED_CAR];

        if (currenSelectedCar.id === id) {
            this.clearValuesInInputFields(InputUse.UPDATE);
            this.clearInputFieldsValuesInState(InputUse.UPDATE);
            this.clearSelectedCarStateProperty();
            changeSvgStrokeColor(InputUse.UPDATE, COLORS.black);
        }

        if (this.updateRaceBoardLayout) {
            this.updateRaceBoardLayout();
        }
    };

    public async createCar(): Promise<void> {
        const name: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.CREATE_NAME];

        const color: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.CREATE_COLOR];

        const carPayload = {
            name,
            color: color || COLORS.black,
        };

        await this.api.createCar(carPayload);

        this.clearValuesInInputFields(InputUse.CREATE);
        this.clearInputFieldsValuesInState(InputUse.CREATE);
        changeSvgStrokeColor(InputUse.CREATE, COLORS.black);

        if (this.getCarsForCurrentPage) {
            await this.getCarsForCurrentPage();
        }
        if (this.updateGarageQuantityLayout) {
            this.updateGarageQuantityLayout();
        }

        if (this.updateRaceBoardLayout) {
            this.updateRaceBoardLayout();
        }
    }

    public async updateCar(): Promise<void> {
        const name: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.UPDATE_NAME];

        const color: string = this.state.getState()[AppStateKeys.INPUT_DATA][InputFieldsKeys.UPDATE_COLOR];

        const selectedCarID: number = this.state.getState()[AppStateKeys.SELECTED_CAR]['id'];

        const carPayload = {
            name,
            color: color || COLORS.black,
        };

        await this.api.updateCar(carPayload, selectedCarID);
        this.clearValuesInInputFields(InputUse.UPDATE);
        this.clearInputFieldsValuesInState(InputUse.UPDATE);
        this.clearSelectedCarStateProperty();
        changeSvgStrokeColor(InputUse.UPDATE, COLORS.black);

        if (this.updateRaceBoardLayout) {
            this.updateRaceBoardLayout();
        }
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

    private clearValuesInInputFields(inputsUse: InputUse): void {
        if (inputsUse === InputUse.CREATE) {
            if (this.inputCreateNameField instanceof InputFieldCreator) {
                this.inputCreateNameField.setValue('');
            }
            if (this.inputCreateColorField instanceof InputFieldCreator) {
                this.inputCreateColorField.setValue(COLORS.black);
            }
        } else if (inputsUse === InputUse.UPDATE) {
            if (this.inputUpdateNameField instanceof InputFieldCreator) {
                this.inputUpdateNameField.setValue('');
            }
            if (this.inputUpdateColorField instanceof InputFieldCreator) {
                this.inputUpdateColorField.setValue(COLORS.black);
            }
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
