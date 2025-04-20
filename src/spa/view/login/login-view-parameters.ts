import type { ElementParameters } from '../../../types';
import { InputTypes } from '../../../types';
import { CSS_LOGIN } from './login-classes';
import { loginContent } from './login-constants';
import { BUTTON_CONSTANTS } from '../../util/button/button-parameters/button-constants';
import { CSS_BUTTON } from '../../util/button/button-classes';

export const loginParameters: ElementParameters = {
    tag: 'form',
    classNames: [CSS_LOGIN.LOGIN],
};

export const fieldsetParameters: ElementParameters = {
    tag: 'fieldset',
    classNames: [CSS_LOGIN.FIELDSET],
};

export const legendParameters: ElementParameters = {
    tag: 'legend',
    textContent: loginContent.TITLE,
    classNames: [CSS_LOGIN.LEGEND],
};

export const nameContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_LOGIN.FIELD_NAME],
};

export const nameInputWrapperParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_LOGIN.NAME_INPUT_WRAPPER],
}

export const nameInputParameters: ElementParameters = {
    tag: 'input',
    placeholder: loginContent.NAME,
    autocomplete: loginContent.AUTOCOMPLETE_VALUE,
    type: InputTypes.TEXT,
    id: loginContent.INPUT_NAME_ID,
    classNames: [CSS_LOGIN.NAME_INPUT],
};

export const nameErrorParameters: ElementParameters = {
    tag: 'span',
    textContent: loginContent.ERROR_NAME,
    classNames: [CSS_LOGIN.NAME_ERROR, CSS_LOGIN.HIDDEN],
};

export const passContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_LOGIN.FIELD_PASS],
};

export const passInputWrapperParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_LOGIN.PASS_INPUT_WRAPPER],
}

export const passInputParameters: ElementParameters = {
    tag: 'input',
    placeholder: loginContent.PASS,
    autocomplete: loginContent.AUTOCOMPLETE_VALUE,
    type: InputTypes.PASSWORD,
    id: loginContent.INPUT_PASS_ID,
    classNames: [CSS_LOGIN.PASS_INPUT],
};

export const passErrorParameters: ElementParameters = {
    tag: 'span',
    textContent: loginContent.ERROR_PASS,
    classNames: [CSS_LOGIN.PASS_ERROR, CSS_LOGIN.HIDDEN],
};

export const controlsContainerParameters: ElementParameters = {
    tag: 'div',
    classNames: [CSS_LOGIN.CONTROLS],
};

export const buttonSubmitParameters: ElementParameters = {
    tag: 'button',
    type: InputTypes.SUBMIT,
    textContent: BUTTON_CONSTANTS.buttonSubmit,
    classNames: [CSS_BUTTON.BUTTON, CSS_LOGIN.BUTTON_SUBMIT],
};

export const buttonAboutParameters: ElementParameters = {
    tag: 'button',
    textContent: BUTTON_CONSTANTS.buttonAbout,
    classNames: [CSS_BUTTON.BUTTON, CSS_LOGIN.BUTTON_ABOUT],
};