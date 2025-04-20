import { ElementParameters } from '../../../../../types';
import { CSS_DIALOG } from '../chat-classes';

export const messagesContainerParameters: ElementParameters = {
  tag: 'article',
  classNames: [CSS_DIALOG.MESSAGES],
};

export const messagesHeaderParameters: ElementParameters = {
  tag: 'div',
  classNames: [CSS_DIALOG.MESSAGES_HEADER],
};

export const messagesPersonParameters: ElementParameters = {
  tag: 'span',
  classNames: [CSS_DIALOG.MESSAGES_PERSON],
};

export const personStatusParameters: ElementParameters = {
  tag: 'span',
  classNames: [CSS_DIALOG.MESSAGES_STATUS],
};

export const dialogContainerParameters: ElementParameters = {
  tag: 'div',
  classNames: [CSS_DIALOG.DIALOG],
};

export const dialogBoardParameters: ElementParameters = {
  tag: 'ul',
  classNames: [CSS_DIALOG.DIALOG_BOARD],
};

export const dialogInfoParameters: ElementParameters = {
  tag: 'li',
  classNames: [CSS_DIALOG.dialog__info],
};