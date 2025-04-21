import { ElementParameters, InputTypes } from '../../../../../types';
import { CSS_SEND } from '../chat-classes';
import { BUTTON_CONSTANTS } from '../../../../util/button/button-parameters/button-constants';
import { CSS_BUTTON } from '../../../../util/button/button-classes';
import { chatContent } from '../chat-constants';

export const sendFormParameters: ElementParameters = {
  tag: 'form',
  classNames: [CSS_SEND.SEND_FORM],
};

export const sendInputAreaParameters: ElementParameters = {
  tag: 'textarea',
  rows: '3',
  cols: '30',
  placeholder: chatContent.MESSAGE,
  classNames: [CSS_SEND.SEND_INPUT],
};

export const buttonSubmitParameters: ElementParameters = {
  tag: 'button',
  type: InputTypes.BUTTON,
  textContent: BUTTON_CONSTANTS.buttonSubmit,
  classNames: [CSS_BUTTON.BUTTON, CSS_SEND.SEND_BUTTON],
};