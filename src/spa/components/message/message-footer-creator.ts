import type { Message } from '../../api/types';
import CreatorElement from '../creator-element';
import {
    messageFooterParameters,
    messageStatusParameters,
} from '../../view/main/chat/parameters/message-view-parameters';
import { chatContent } from '../../../constants/chat-constants';

export function createMessageFooter(message: Message): CreatorElement {
    const messageFooterCreator = new CreatorElement(messageFooterParameters);

    const messageStatusCreator = new CreatorElement(messageStatusParameters);
    if (message.status?.isDelivered) {
        messageStatusCreator.setTextContent(chatContent.DELIVERED);
    }
    if (message.status?.isReaded) {
        messageStatusCreator.setTextContent(chatContent.READ);
    }
    if (message.status?.isEdited) {
        messageStatusCreator.setTextContent(chatContent.EDITED);
    }

    if (!message.status?.isDelivered || !message.status.isReaded || !message.status.isEdited) {
        messageStatusCreator.setTextContent(chatContent.SENT);
    }

    messageFooterCreator.addInnerElement(messageStatusCreator);

    return messageFooterCreator;
}
