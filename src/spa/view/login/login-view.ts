import './login.scss';
import View from '../view';
import type SessionStorageState from '../../state/session-storage-state';
import type Router from '../../router/router';
import {
    buttonAboutParameters,
    buttonSubmitParameters,
    controlsContainerParameters,
    fieldsetParameters,
    legendParameters,
    loginParameters,
    nameContainerParameters,
    nameErrorParameters,
    nameInputParameters,
    nameInputWrapperParameters,
    passContainerParameters,
    passErrorParameters,
    passInputParameters,
    passInputWrapperParameters,
} from './login-view-parameters';
import CreatorElement from '../../components/creator-element';
import LabelCreator from '../../components/label/label-creator';
import { nameLabelParameters, passLabelParameters } from '../../components/label/label-view-parameters';
import InputFieldCreator from '../../components/input-field/input-field-creator';
import type { ElementParameters, EventCB, ToggleShowErrorMessageCB } from '../../../types';
import { Attributes, IS_DISABLED } from '../../../types';
import { PagesNames } from '../../../constants/header-constants';
import { loginContent } from '../../../constants/login-constants';
import type { InputFieldsValues } from './types';
import { validateNameValue } from '../../utils/validation/name-validation';
import { validatePassStrengthValue } from '../../utils/validation/password-strength-validation';
import type ApiController from '../../api/api-controller';
import { toggleShowErrorMessage } from '../../utils/error-message/toggle-show-error-message';
import ButtonCreator from '../../components/button/button-creator';

export default class LoginView extends View {
    public router: Router;
    private readonly state: SessionStorageState;
    private readonly api: ApiController;
    private inputFieldName: InputFieldCreator | null = null;
    private inputFieldPass: InputFieldCreator | null = null;
    private submitButton: ButtonCreator | null = null;
    private nameError: CreatorElement | null = null;
    private passError: CreatorElement | null = null;
    private isValidName = false;
    private isValidPass = false;
    private toggleShowErrorMessage: ToggleShowErrorMessageCB = toggleShowErrorMessage;

    constructor(state: SessionStorageState, router: Router, api: ApiController) {
        super(loginParameters);
        this.state = state;
        this.router = router;
        this.api = api;

        this.configureView();
    }

    private configureView(): void {
        this.addForm(fieldsetParameters, legendParameters);
        this.addFormControls();
    }

    private addForm(fieldsetParameters: ElementParameters, legendParameters: ElementParameters): void {
        const fieldSetCreator = new CreatorElement(fieldsetParameters);
        this.viewElementCreator.addInnerElement(fieldSetCreator);

        const legendSetCreator = new CreatorElement(legendParameters);
        fieldSetCreator.addInnerElement(legendSetCreator);

        this.fillFormWithContent(
            fieldSetCreator,
            nameContainerParameters,
            nameInputWrapperParameters,
            nameLabelParameters,
            nameInputParameters,
            nameErrorParameters
        );
        this.fillFormWithContent(
            fieldSetCreator,
            passContainerParameters,
            passInputWrapperParameters,
            passLabelParameters,
            passInputParameters,
            passErrorParameters
        );
    }

    private fillFormWithContent(
        formContainer: CreatorElement,
        containerParameters: ElementParameters,
        wrapperParameters: ElementParameters,
        labelParameters: ElementParameters,
        inputParameters: ElementParameters,
        errorParameters: ElementParameters
    ): void {
        const containerCreator = new CreatorElement(containerParameters);
        formContainer.addInnerElement(containerCreator);

        const inputWrapperCreator = new CreatorElement(wrapperParameters);
        containerCreator.addInnerElement(inputWrapperCreator);
        const labelCreator = new LabelCreator(labelParameters);
        inputWrapperCreator.addInnerElement(labelCreator);

        if (inputParameters.id === loginContent.INPUT_NAME_ID) {
            const inputParametersWithCB: ElementParameters = {
                ...inputParameters,
                callback: this.validateNameField,
            };
            this.inputFieldName = new InputFieldCreator(inputParametersWithCB);
            inputWrapperCreator.addInnerElement(this.inputFieldName);
        } else if (inputParameters.id === loginContent.INPUT_PASS_ID) {
            const inputParametersWithCB: ElementParameters = {
                ...inputParameters,
                callback: this.validatePassField,
            };
            this.inputFieldPass = new InputFieldCreator(inputParametersWithCB);
            inputWrapperCreator.addInnerElement(this.inputFieldPass);
        }

        if (errorParameters.textContent === loginContent.ERROR_NAME) {
            this.nameError = new CreatorElement(errorParameters);
            containerCreator.addInnerElement(this.nameError);
        } else if (errorParameters.textContent === loginContent.ERROR_PASS) {
            this.passError = new CreatorElement(errorParameters);
            containerCreator.addInnerElement(this.passError);
        }
    }

    private getInputFieldsValues(): InputFieldsValues {
        let inputNameValue = '';
        let inputPassValue = '';

        if (this.inputFieldName && this.inputFieldPass) {
            inputNameValue = this.inputFieldName.getValue();
            inputPassValue = this.inputFieldPass.getValue();
        }

        return {
            inputNameValue,
            inputPassValue,
        };
    }

    private submitForm = (event: Event): void => {
        event.preventDefault();

        const { inputNameValue, inputPassValue } = this.getInputFieldsValues();

        this.loginCurrentUser(inputNameValue, inputPassValue);
    };

    private handleAboutClick = (event: Event): void => {
        event.preventDefault();
        this.router.navigate(PagesNames.ABOUT);
    };

    private addFormControls(): void {
        const callbackSubmit: EventCB = this.submitForm;
        const callbackAbout: EventCB = this.handleAboutClick;

        const controlsContainerCreator = new CreatorElement(controlsContainerParameters);
        this.viewElementCreator.addInnerElement(controlsContainerCreator);

        const buttonSubmitParametersWithCB: ElementParameters = {
            ...buttonSubmitParameters,
            callback: callbackSubmit,
        };

        this.submitButton = new ButtonCreator(buttonSubmitParametersWithCB);
        this.toggleDisabledSubmitButton(IS_DISABLED.TRUE);
        controlsContainerCreator.addInnerElement(this.submitButton);

        const buttonAboutParametersWithCB: ElementParameters = {
            ...buttonAboutParameters,
            callback: callbackAbout,
        };

        const aboutButtonCreator = new ButtonCreator(buttonAboutParametersWithCB);
        controlsContainerCreator.addInnerElement(aboutButtonCreator);
    }

    private toggleDisabledSubmitButton(isDisabled: IS_DISABLED): void {
        let submitButtonElement: HTMLElement | HTMLCanvasElement | null = null;
        if (this.submitButton instanceof ButtonCreator) {
            submitButtonElement = this.submitButton.getElement();
        }

        if (isDisabled === IS_DISABLED.TRUE && submitButtonElement) {
            submitButtonElement.setAttribute(Attributes.DISABLED, isDisabled);
        } else if (isDisabled === IS_DISABLED.FALSE && submitButtonElement) {
            submitButtonElement.removeAttribute(Attributes.DISABLED);
        }
    }

    private validateNameField = (event: Event): void => {
        const target = event.target;

        if (target && target instanceof HTMLInputElement && this.nameError) {
            this.isValidName = validateNameValue(target.value);
            this.toggleShowErrorMessage(this.nameError, !this.isValidName);

            if (this.isValidName && this.isValidPass && this.nameError) {
                this.toggleDisabledSubmitButton(IS_DISABLED.FALSE);
                this.toggleShowErrorMessage(this.nameError, false);
            }
            if (!this.isValidName || !this.isValidPass) {
                this.toggleDisabledSubmitButton(IS_DISABLED.TRUE);
            }
        }
    };

    private validatePassField = (event: Event): void => {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            this.isValidPass = validatePassStrengthValue(target.value);

            if (this.isValidName && this.isValidPass && this.passError) {
                this.toggleDisabledSubmitButton(IS_DISABLED.FALSE);
                this.toggleShowErrorMessage(this.passError, false);
            }

            if (this.passError) {
                this.toggleShowErrorMessage(this.passError, !this.isValidPass);
            }

            if (!this.isValidName || !this.isValidPass) {
                this.toggleDisabledSubmitButton(IS_DISABLED.TRUE);
            }
        }
    };

    private loginCurrentUser(login: string, password: string): void {
        this.api.loginUser(login, password);
    }
}
