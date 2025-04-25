import type { Message } from '../../api/types';
import CreatorElement from '../creator-element';
import {
    messageAuthorParameters,
    messageHeaderParameters,
    messageTimeParameters,
} from '../../view/main/chat/parameters/message-view-parameters';
import { chatContent } from '../../../constants/chat-constants';
import { formatTimestampToDate } from '../../utils/format-timestamp-to-date/format-timestamp-to-date';

export function createMessageHeader(message: Message, name: string): CreatorElement {
    const messageHeaderCreator = new CreatorElement(messageHeaderParameters);

    const messageAuthorCreator = new CreatorElement(messageAuthorParameters);
    if (message.from && message.from !== name) {
        messageAuthorCreator.setTextContent(message.from);
    } else {
        messageAuthorCreator.setTextContent(chatContent.AUTHOR);
    }

    const messageTimeCreator = new CreatorElement(messageTimeParameters);
    if (message.datetime) {
        const parsedDateTime: string = formatTimestampToDate(message.datetime);
        messageTimeCreator.setTextContent(parsedDateTime);
    }

    messageHeaderCreator.addInnerElement(messageAuthorCreator);
    messageHeaderCreator.addInnerElement(messageTimeCreator);

    return messageHeaderCreator;
}
