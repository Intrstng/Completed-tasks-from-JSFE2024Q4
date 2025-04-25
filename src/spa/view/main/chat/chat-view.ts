import './chat.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../components/creator-element';
import ButtonCreator from '../../../components/button/button-creator';
import InputFieldCreator from '../../../components/input-field/input-field-creator';
import { chatSectionParameters } from './parameters/chat-view-parameters';
import {
    dialogBoardParameters,
    dialogContainerParameters,
    dialogInfoParameters,
    messagesContainerParameters,
    messagesHeaderParameters,
    messagesPersonParameters,
    personStatusParameters,
} from './parameters/messages-view-parameters';
import {
    contactCounterParameters,
    contactItemParameters,
    contactParameters,
    contactsContainerParameters,
    contactsListParameters,
    contactsSearchFieldParameters,
    contactStatusParameters,
} from './parameters/contacts-view-parameters';
import { chatContent } from '../../../../constants/chat-constants';
import { CSS_CONTACTS, CSS_MESSAGE } from './chat-classes';
import { AppStateKeys, Attributes, Booleans } from '../../../../types';
import { messageBodyParameters, messageContainerParameters } from './parameters/message-view-parameters';
import {
    buttonSubmitParameters,
    sendFormParameters,
    sendInputAreaParameters,
} from './parameters/send-form-view-parameters';
import type ApiController from '../../../api/api-controller';
import type { AppState, MessageCounter } from '../../../state/types';
import type { Message, User } from '../../../api/types';
import { SocketMessageType } from '../../../api/types';
import type SessionStorageState from '../../../state/session-storage-state';
import { sliceNameLength } from '../../../utils/slice-name-string';
import { createMessageHeader } from '../../../components/message/message-header-creator';
import { createMessageFooter } from '../../../components/message/message-footer-creator';
import type { CreateMessageFooterCB, CreateMessageHeaderCB } from '../../../components/message/types';

export default class ChatView extends View {
    private readonly router: Router;
    private readonly api: ApiController;
    private readonly state: SessionStorageState;
    private contactsListCreator = new CreatorElement(contactsListParameters);
    private buttonSendMessageCreator = new ButtonCreator(buttonSubmitParameters);
    private messageInputAreaCreator = new CreatorElement(sendInputAreaParameters);
    private readonly dialogHeader: CreatorElement = new CreatorElement(messagesHeaderParameters);
    private readonly dialogBoard: CreatorElement = new CreatorElement(dialogBoardParameters);
    private createMessageHeader: CreateMessageHeaderCB = createMessageHeader;
    private createMessageFooter: CreateMessageFooterCB = createMessageFooter;

    constructor(state: SessionStorageState, router: Router, api: ApiController) {
        super(chatSectionParameters);
        this.router = router;
        this.state = state;
        this.api = api;
        this.configureView();

        this.addAllSubscribers();
    }

    private configureView(): void {
        this.addContactsSection();
        this.addDialogArticle();
    }

    private addAllSubscribers(): void {
        this.state.subscribe(SocketMessageType.USER_EXTERNAL_LOGIN, this.updateContactList.bind(this));
        this.state.subscribe(SocketMessageType.USER_EXTERNAL_LOGOUT, this.updateContactList.bind(this));

        this.state.subscribe(SocketMessageType.MSG_SEND, this.updateDialogBoardOnNewMessageReceive.bind(this));
    }

    private updateDialogBoardOnNewMessageReceive(state: AppState, extraParameter?: string): void {
        const currentContactName = this.state.getState()[AppStateKeys.CURRENT_CONTACT].login;

        const currentState: AppState = this.state.getState();
        this.updateContactList(currentState);

        if (currentContactName === extraParameter) {
            this.addContentToDialogBoard();
        }
    }

    private resetCounterMessagesFromContact(contactName: string): void {
        const currentContactsCounters: MessageCounter = this.state.getState()[AppStateKeys.MESSAGE_COUNTER];

        const updatedContactsCounters: MessageCounter = {
            ...currentContactsCounters,
            [contactName]: 0,
        };

        this.state.updatePropertyInState(AppStateKeys.MESSAGE_COUNTER, updatedContactsCounters);
    }

    private updateContactList(newState: AppState): void {
        const currentOnlineContacts = newState[AppStateKeys.ONLINE_USERS];
        const currentOfflineContacts = newState[AppStateKeys.OFFLINE_USERS];

        const allUsersCollection = [...currentOnlineContacts, ...currentOfflineContacts];
        this.addContacts(this.contactsListCreator, allUsersCollection);
    }

    private addContactsSection(): void {
        const contactsSectionContainer = new CreatorElement(contactsContainerParameters);
        this.viewElementCreator.addInnerElement(contactsSectionContainer);

        const inputSearchCreator = new InputFieldCreator(contactsSearchFieldParameters);
        inputSearchCreator.setCallback(this.searchContactHandler);
        contactsSectionContainer.addInnerElement(inputSearchCreator);

        contactsSectionContainer.addInnerElement(this.contactsListCreator);
        const onlineUsersCollection: User[] = this.state.getState()[AppStateKeys.ONLINE_USERS];
        const offlineUsersCollection: User[] = this.state.getState()[AppStateKeys.OFFLINE_USERS];
        const allUsersCollection: User[] = [...onlineUsersCollection, ...offlineUsersCollection];

        this.addContacts(this.contactsListCreator, allUsersCollection);
    }

    private addContacts(listContainer: CreatorElement, contactsData: User[]): void {
        CreatorElement.deleteAllItemsInContainer(listContainer);

        contactsData.forEach(contact => {
            const contactCreator = new CreatorElement(contactItemParameters);
            contactCreator.setCallback(() => this.selectContactToChat(contact));
            listContainer.addInnerElement(contactCreator);

            const statusIconCreator = new CreatorElement(contactStatusParameters);
            if (contact.isLogined) {
                statusIconCreator.setCssClasses([CSS_CONTACTS.ONLINE]);
            }

            contactCreator.addInnerElement(statusIconCreator);

            let counterMessagesFromContact: number | string =
                this.state.getState()[AppStateKeys.MESSAGE_COUNTER][contact.login];

            counterMessagesFromContact = counterMessagesFromContact ? String(counterMessagesFromContact) : '';

            const contactCounterCreator = new CreatorElement(contactCounterParameters);
            contactCounterCreator.setDataAttribute('counter', contact.login.toLowerCase());
            contactCounterCreator.setTextContent(counterMessagesFromContact);

            if (counterMessagesFromContact) {
                contactCounterCreator.removeCssClasses([CSS_CONTACTS.COUNTER_HIDDEN]);
            } else {
                contactCounterCreator.setCssClasses([CSS_CONTACTS.COUNTER_HIDDEN]);
            }

            const contactItemCreator = new CreatorElement(contactParameters);
            contactItemCreator.setTextContent(contact.login);
            contactCreator.addInnerElement(contactItemCreator);
            contactCreator.addInnerElement(contactCounterCreator);
        });
    }

    private addDialogArticle(): void {
        const dialogArticleContainerCreator = new CreatorElement(messagesContainerParameters);
        this.viewElementCreator.addInnerElement(dialogArticleContainerCreator);

        dialogArticleContainerCreator.addInnerElement(this.dialogHeader);

        this.addDialogHeaderContent();
        this.addDialogContainer(dialogArticleContainerCreator);
        this.createMessageInputForm(dialogArticleContainerCreator);

        this.toggleDisableMessageInput();
    }

    private addDialogHeaderContent(): void {
        const { login, isLogined } = this.state.getState()[AppStateKeys.CURRENT_CONTACT];
        const currentContactNameCreator = new CreatorElement(messagesPersonParameters);

        currentContactNameCreator.setTextContent(sliceNameLength(login));

        let contactStatus: string = chatContent.NO_CONTACT;
        if (login.length > 0) {
            contactStatus = isLogined ? chatContent.ONLINE : chatContent.OFFLINE;
        }

        const currentContactStatusCreator = new CreatorElement(personStatusParameters);
        currentContactStatusCreator.setTextContent(contactStatus);

        if (isLogined) {
            currentContactStatusCreator.removeCssClasses([CSS_CONTACTS.OFFLINE]);
        } else {
            currentContactStatusCreator.setCssClasses([CSS_CONTACTS.OFFLINE]);
        }

        this.dialogHeader.addInnerElement(currentContactNameCreator);
        this.dialogHeader.addInnerElement(currentContactStatusCreator);
    }

    private updateDialogHeaderContent(): void {
        CreatorElement.deleteAllItemsInContainer(this.dialogHeader);
        this.addDialogHeaderContent();
    }

    private addDialogContainer(dialogContainer: CreatorElement): void {
        const dialogContainerCreator = new CreatorElement(dialogContainerParameters);
        dialogContainer.addInnerElement(dialogContainerCreator);
        dialogContainerCreator.addInnerElement(this.dialogBoard);

        const messagesHistoryCollection: Message[] = this.state.getState()[AppStateKeys.MESSAGE_HISTORY];
        if (messagesHistoryCollection.length === 0) {
            const blankMessageCreator = new CreatorElement(dialogInfoParameters);
            this.dialogBoard.addInnerElement(blankMessageCreator);
        }
        this.addContentToDialogBoard();
    }

    private addContentToDialogBoard(): void {
        CreatorElement.deleteAllItemsInContainer(this.dialogBoard);

        const messagesHistoryCollection: Message[] = this.state.getState()[AppStateKeys.MESSAGE_HISTORY];
        if (messagesHistoryCollection.length > 0) {
            CreatorElement.deleteAllItemsInContainer(this.dialogBoard);

            messagesHistoryCollection.forEach(message => {
                const messageCreator = this.createMessage(message);
                this.dialogBoard.addInnerElement(messageCreator);
            });
        }
    }

    private createMessage(message: Message): CreatorElement {
        const currentUserName = this.state.getState()[AppStateKeys.CURRENT_USER_NAME];

        const messageContainerCreator = new CreatorElement(messageContainerParameters);

        if (message.to && message.from === currentUserName) {
            messageContainerCreator.setCssClasses([CSS_MESSAGE.MESSAGE_OUTCOME]);
        } else if (message.from && message.from !== currentUserName) {
            messageContainerCreator.setCssClasses([CSS_MESSAGE.MESSAGE_INCOME]);
        }

        const messageHeaderCreator: CreatorElement = this.createMessageHeader(message, currentUserName);

        const messageBodyCreator = new CreatorElement(messageBodyParameters);
        messageBodyCreator.setTextContent(message.text);

        const messageFooterCreator: CreatorElement = this.createMessageFooter(message);

        messageContainerCreator.addInnerElement(messageHeaderCreator);
        messageContainerCreator.addInnerElement(messageBodyCreator);
        messageContainerCreator.addInnerElement(messageFooterCreator);
        return messageContainerCreator;
    }

    private createMessageInputForm(dialogContainer: CreatorElement): void {
        const messageInputFormCreator = new CreatorElement(sendFormParameters);

        this.messageInputAreaCreator.setInputCallback(this.setCurrentMessageToState);

        this.buttonSendMessageCreator.setCallback(this.sendMessage);

        this.toggleDisableMessageInput();
        this.toggleDisableSubmitButton(true);

        messageInputFormCreator.addInnerElement(this.messageInputAreaCreator);
        messageInputFormCreator.addInnerElement(this.buttonSendMessageCreator);

        dialogContainer.addInnerElement(messageInputFormCreator);
    }

    private setCurrentMessageToState = (event: Event): void => {
        const target = event.target;

        if (target && target instanceof HTMLTextAreaElement) {
            this.state.updatePropertyInState(AppStateKeys.CURRENT_MESSAGE, target.value);
            if (target.value.length > 0) {
                this.toggleDisableSubmitButton(false);
            } else {
                this.toggleDisableSubmitButton(true);
            }
        }
    };

    private toggleDisableSubmitButton(isDisabled: boolean): void {
        const element = this.buttonSendMessageCreator.getElement();
        if (element instanceof HTMLElement) {
            if (isDisabled) {
                element.setAttribute(Attributes.DISABLED, Booleans.TRUE);
            } else {
                element.removeAttribute(Attributes.DISABLED);
            }
        }
    }

    private toggleDisableMessageInput(): void {
        const currentContact = this.state.getState()[AppStateKeys.CURRENT_CONTACT].login;
        const element = this.messageInputAreaCreator.getElement();
        if (element instanceof HTMLTextAreaElement) {
            if (currentContact.length > 0) {
                element.removeAttribute(Attributes.DISABLED);
            } else {
                element.setAttribute(Attributes.DISABLED, Booleans.TRUE);
            }
        }
    }

    private sendMessage = async (): Promise<void> => {
        const currentContact: string = this.state.getState()[AppStateKeys.CURRENT_CONTACT].login;
        const currentMessage: string = this.state.getState()[AppStateKeys.CURRENT_MESSAGE];

        await this.api.sendMessage(currentContact, currentMessage);
        this.clearInputMessage();
        this.toggleDisableSubmitButton(true);
        // Check
        this.addContentToDialogBoard();
    };

    private clearInputMessage(): void {
        const element = this.messageInputAreaCreator.getElement();

        if (element instanceof HTMLTextAreaElement) {
            element.value = '';
        }
        this.state.updatePropertyInState(AppStateKeys.CURRENT_MESSAGE, '');
    }

    private async selectContactToChat(contact: User): Promise<void> {
        try {
            const currentState: AppState = this.state.getState();
            const updatedState: AppState = {
                ...currentState,
                [AppStateKeys.CURRENT_CONTACT]: contact,
            };
            this.state.setState(updatedState);

            this.updateDialogHeaderContent();
            this.toggleDisableMessageInput();

            await this.api.getMessages(contact.login);

            this.addContentToDialogBoard();

            this.state.updatePropertyInState(AppStateKeys.CURRENT_MESSAGE, '');
            this.clearInputMessage();
            this.toggleDisableSubmitButton(true);

            // Reset counter
            this.resetCounterMessagesFromContact(contact.login);
            this.updateContactList(currentState);
            //
        } catch (error) {
            console.error('Error selecting contact:', error);
        }
    }

    private searchContactHandler = (event: Event): void => {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            const onlineUsersCollection = this.state.getState()[AppStateKeys.ONLINE_USERS];
            const offlineUsersCollection = this.state.getState()[AppStateKeys.OFFLINE_USERS];
            const usersCollection = [...onlineUsersCollection, ...offlineUsersCollection];

            const filteredUsersBySearchName: User[] = usersCollection.filter(user =>
                user.login.toLowerCase().includes(target.value)
            );

            this.addContacts(this.contactsListCreator, filteredUsersBySearchName);
        }
    };
}
