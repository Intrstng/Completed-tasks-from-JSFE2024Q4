import './login.scss';
import View from '../view';
import SessionStorageState from '../../state/session-storage-state';
import Router from '../../router/router';
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
  passInputWrapperParameters
} from './login-view-parameters';
import CreatorElement from '../../util/creator-element';
import LabelCreator from '../../util/label/label-creator';
import { nameLabelParameters, passLabelParameters } from '../../util/label/label-view-parameters';
import InputFieldCreator from '../../util/input-field/input-field-creator';
import { AppStateKeys, ElementParameters, EventCB, IS_DISABLED } from '../../../types';
import ButtonCreator from '../../util/button/button-creator';
import { PagesNames } from '../header/header-constants';
import { loginContent } from './login-constants';
import { InputFieldsValues } from './types';
import { validateNameValue } from '../../util/validation/password-strength/name-validation';
import { validatePassStrengthValue } from '../../util/validation/password-strength/password-strength-validation';
import { CSS_LOGIN } from './login-classes';
import ApiController from '../../api/api-controller';

export default class LoginView extends View {
  public router: Router;
  private readonly state: SessionStorageState;
  private readonly api: ApiController;
  private inputFieldName: InputFieldCreator | null;
  private inputFieldPass: InputFieldCreator | null;
  private submitButton: ButtonCreator | null;
  private nameError: CreatorElement | null;
  private passError: CreatorElement | null;
  private isValidName: boolean = false;
  private isValidPass: boolean = false;

  constructor(state: SessionStorageState, router: Router, api: ApiController) {
    super(loginParameters);
    this.state = state;
    this.router = router;
    this.api = api;
    this.inputFieldName = null;
    this.inputFieldPass = null;
    this.nameError = null;
    this.passError = null;
    this.submitButton = null;
    this.configureView();
  }

  private configureView(): void {
    this.addForm(
        fieldsetParameters,
        legendParameters,
    );
    this.addFormControls();
  }

  private addForm(
      fieldsetParameters: ElementParameters,
      legendParameters: ElementParameters,
  ): void {
    const fieldSetCreator = new CreatorElement(fieldsetParameters)
    this.viewElementCreator.addInnerElement(fieldSetCreator)

    const legendSetCreator = new CreatorElement(legendParameters)
    fieldSetCreator.addInnerElement(legendSetCreator)

    this.fillFormWithContent(
        fieldSetCreator,
        nameContainerParameters,
        nameInputWrapperParameters,
        nameLabelParameters,
        nameInputParameters,
        nameErrorParameters
    )
    this.fillFormWithContent(
        fieldSetCreator,
        passContainerParameters,
        passInputWrapperParameters,
        passLabelParameters,
        passInputParameters,
        passErrorParameters
    )
  }

  private fillFormWithContent(
      formContainer: CreatorElement,
      containerParameters: ElementParameters,
      wrapperParameters: ElementParameters,
      labelParameters: ElementParameters,
      inputParameters: ElementParameters,
      errorParameters: ElementParameters,
  ): void {
    const containerCreator = new CreatorElement(containerParameters)
    formContainer.addInnerElement(containerCreator)

    const inputWrapperCreator = new CreatorElement(wrapperParameters)
    containerCreator.addInnerElement(inputWrapperCreator)

    const labelCreator = new LabelCreator(labelParameters)
    inputWrapperCreator.addInnerElement(labelCreator)

    if (inputParameters.id === loginContent.INPUT_NAME_ID) {
      const callback: EventCB = this.validateNameField;
      const inputParametersWithCB: ElementParameters = {
        ...inputParameters,
        callback
      }
      this.inputFieldName = new InputFieldCreator(inputParametersWithCB)
      inputWrapperCreator.addInnerElement(this.inputFieldName)
    } else if (inputParameters.id === loginContent.INPUT_PASS_ID) {
      const callback: EventCB = this.validatePassField;
      const inputParametersWithCB: ElementParameters = {
        ...inputParameters,
        callback
      }
      this.inputFieldPass = new InputFieldCreator(inputParametersWithCB)
      inputWrapperCreator.addInnerElement(this.inputFieldPass)
    }

    if (errorParameters.textContent === loginContent.ERROR_NAME) {
      this.nameError = new CreatorElement(errorParameters)
      containerCreator.addInnerElement(this.nameError)
    } else if (errorParameters.textContent === loginContent.ERROR_PASS) {
      this.passError = new CreatorElement(errorParameters)
      containerCreator.addInnerElement(this.passError)
    }
  }

  private getInputFieldsValues(): InputFieldsValues {
    const inputNameValue: string = this.inputFieldName.getValue();
    const inputPassValue: string = this.inputFieldPass.getValue();
    return {
      inputNameValue,
      inputPassValue
    }
  }

  private submitForm = (event: Event): void => {
    event.preventDefault();

    const { inputNameValue, inputPassValue } = this.getInputFieldsValues();

    this.loginCurrentUser(inputNameValue, inputPassValue);
  }

  private handleAboutClick = (event: Event): void => {
    event.preventDefault();
    this.router.navigate(PagesNames.ABOUT);
  }

  private addFormControls(): void {
    const callbackSubmit: EventCB = this.submitForm;
    const callbackAbout: EventCB = this.handleAboutClick;

    const controlsContainerCreator = new CreatorElement(controlsContainerParameters)
    this.viewElementCreator.addInnerElement(controlsContainerCreator);

    const buttonSubmitParametersWithCB: ElementParameters = {
      ...buttonSubmitParameters,
      callback: callbackSubmit
    }

    this.submitButton = new ButtonCreator(buttonSubmitParametersWithCB)
    this.toggleDisabledSubmitButton(IS_DISABLED.TRUE);
    controlsContainerCreator.addInnerElement(this.submitButton);

    const buttonAboutParametersWithCB: ElementParameters = {
      ...buttonAboutParameters,
      callback: callbackAbout
    }

    const aboutButtonCreator = new ButtonCreator(buttonAboutParametersWithCB)
    controlsContainerCreator.addInnerElement(aboutButtonCreator);
  }

  private toggleDisabledSubmitButton(isDisabled: string): void {
    if (isDisabled === IS_DISABLED.TRUE) {
      this.submitButton.getElement().setAttribute('disabled', isDisabled);
    } else if (isDisabled === IS_DISABLED.FALSE) {
      this.submitButton.getElement().removeAttribute('disabled')
    }
  }

  public validateNameField = (event: Event): void => {
    const target = event.target;

    if (target && target instanceof HTMLInputElement) {
      this.isValidName = validateNameValue(target.value);
      this.toggleShowErrorMessage(this.nameError, !this.isValidName)

      if (this.isValidName && this.isValidPass) {
        this.toggleDisabledSubmitButton(IS_DISABLED.FALSE);
        this.toggleShowErrorMessage(this.nameError, false)
      }
      if (!this.isValidName || !this.isValidPass) {
        this.toggleDisabledSubmitButton(IS_DISABLED.TRUE);
      }
    }
  }

  public validatePassField = (event: Event): void => {
    const target = event.target;

    if (target && target instanceof HTMLInputElement) {
      this.isValidPass = validatePassStrengthValue(target.value);

      if (this.isValidName && this.isValidPass) {
        this.toggleDisabledSubmitButton(IS_DISABLED.FALSE);
        this.toggleShowErrorMessage(this.passError, false)
      }

      this.toggleShowErrorMessage(this.passError, !this.isValidPass)

      if (!this.isValidName || !this.isValidPass) {
        this.toggleDisabledSubmitButton(IS_DISABLED.TRUE);
      }
    }
  }

  private toggleShowErrorMessage(errorElement: CreatorElement, isShown: boolean): void {
    if (isShown) {
      errorElement.getElement().classList.remove(CSS_LOGIN.HIDDEN);
    } else {
      errorElement.getElement().classList.add(CSS_LOGIN.HIDDEN);
    }
  }

  private loginCurrentUser(login: string, password: string): void {
    this.api.loginUser(login, password);
  }
}

