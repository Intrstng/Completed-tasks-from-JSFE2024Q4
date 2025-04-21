import { ElementParameters } from '../../../../../types';
import { CSS_MESSAGE } from '../chat-classes';
import { chatContent } from '../chat-constants';

export const messageContainerParameters: ElementParameters = {
  tag: 'li',
  classNames: [CSS_MESSAGE.MESSAGE],
};

export const messageHeaderParameters: ElementParameters = {
  tag: 'div',
  classNames: [CSS_MESSAGE.MESSAGE_HEADER],
};

export const messageAuthorParameters: ElementParameters = {
  tag: 'span',
  textContent: chatContent.AUTHOR,
  classNames: [CSS_MESSAGE.MESSAGE_AUTHOR],
};

export const messageTimeParameters: ElementParameters = {
  tag: 'span',
  classNames: [CSS_MESSAGE.MESSAGE_TIME],
};

export const messageBodyParameters: ElementParameters = {
  tag: 'div',
  classNames: [CSS_MESSAGE.MESSAGE_BODY],
};

export const messageFooterParameters: ElementParameters = {
  tag: 'div',
  classNames: [CSS_MESSAGE.MESSAGE_FOOTER],
};

export const messageStatusParameters: ElementParameters = {
  tag: 'span',
  classNames: [CSS_MESSAGE.MESSAGE_STATUS],
};