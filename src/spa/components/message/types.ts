import type { Message } from '../../api/types';
import type CreatorElement from '../creator-element';

export type CreateMessageHeaderCB = (message: Message, name: string) => CreatorElement;
export type CreateMessageFooterCB = (message: Message) => CreatorElement;
