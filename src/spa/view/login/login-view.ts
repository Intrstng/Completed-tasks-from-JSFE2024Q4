import './login.scss';
import View from '../view';
import SessionStorageState from '../../state/session-storage-state';
import Router from '../../router/router';
import {
  buttonAboutParameters,
  buttonSubmitParameters, controlsContainerParameters,
  fieldsetParameters,
  legendParameters,
  loginParameters,
  nameContainerParameters,
  nameErrorParameters,
  nameInputParameters, nameInputWrapperParameters,
  passContainerParameters,
  passErrorParameters,
  passInputParameters, passInputWrapperParameters
} from './login-view-parameters';
import CreatorElement from '../../util/creator-element';
import LabelCreator from '../../util/label/label-creator';
import { nameLabelParameters, passLabelParameters } from '../../util/label/label-view-parameters';
import InputFieldCreator from '../../util/input-field/input-field-creator';
import { Callback, ElementParameters, EventCB } from '../../../types';
import ButtonCreator from '../../util/button/button-creator';
import { PagesNames } from '../header/header-constants';
import { loginContent } from './login-constants';
import { InputFieldsValues } from './types';

export default class LoginView extends View {
  public router: Router;
  private inputFieldName: InputFieldCreator | null;
  private inputFieldPass: InputFieldCreator | null;
  private readonly state: SessionStorageState;


  constructor(state: SessionStorageState, router: Router) {
    super(loginParameters);

    this.router = router;
    this.inputFieldName = null;
    this.inputFieldPass = null;
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
      this.inputFieldName = new InputFieldCreator(inputParameters)
      inputWrapperCreator.addInnerElement(this.inputFieldName)
    } else if (inputParameters.id === loginContent.INPUT_PASS_ID) {
      this.inputFieldPass = new InputFieldCreator(inputParameters)
      inputWrapperCreator.addInnerElement(this.inputFieldPass)
    }

    const nameErrorCreator = new CreatorElement(errorParameters)
    containerCreator.addInnerElement(nameErrorCreator)
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
    console.log('Submit')
    console.log(this.getInputFieldsValues());
  }

  private handleAboutClick = (): void => {
    this.router.navigate(PagesNames.ABOUT);
  }

  private addFormControls(): void {
    const callbackSubmit: EventCB = this.submitForm;
    const callbackAbout: Callback = this.handleAboutClick;

    const controlsContainerCreator = new CreatorElement(controlsContainerParameters)
    this.viewElementCreator.addInnerElement(controlsContainerCreator);

    const buttonSubmitParametersWithCB: ElementParameters = {
      ...buttonSubmitParameters,
      callback: callbackSubmit
    }

    const submitButtonCreator = new ButtonCreator(buttonSubmitParametersWithCB)
    submitButtonCreator.getElement().setAttribute('disabled', 'true');
    controlsContainerCreator.addInnerElement(submitButtonCreator);

    const buttonAboutParametersWithCB: ElementParameters = {
      ...buttonAboutParameters,
      callback: callbackAbout
    }

    const aboutButtonCreator = new ButtonCreator(buttonAboutParametersWithCB)
    controlsContainerCreator.addInnerElement(aboutButtonCreator);
  }
}

