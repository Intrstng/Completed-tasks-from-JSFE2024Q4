import './chat.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import type LocalStorageState from '../../../state/session-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import { chatSectionParameters } from './parameters/chat-view-parameters';
import {
    dialogBoardParameters,
    dialogContainerParameters,
    dialogInfoParameters,
    messagesContainerParameters,
    messagesHeaderParameters,
    messagesPersonParameters,
    personStatusParameters
} from './parameters/messages-view-parameters';
import {
    contactItemParameters,
    contactParameters,
    contactsContainerParameters,
    contactsListParameters,
    contactsSearchFieldParameters,
    contactStatusParameters
} from './parameters/contacts-view-parameters';
import { chatContent, mockMessages } from './chat-constants';
import { CSS_CONTACTS, CSS_MESSAGE } from './chat-classes';
import { AppStateKeys } from '../../../../types';
import { sliceNameLength } from '../../../util/slice-name-string';
import {
    messageAuthorParameters,
    messageBodyParameters,
    messageContainerParameters,
    messageFooterParameters,
    messageHeaderParameters,
    messageStatusParameters,
    messageTimeParameters
} from './parameters/message-view-parameters';
import {
    buttonSubmitParameters,
    sendFormParameters,
    sendInputAreaParameters
} from './parameters/send-form-view-parameters';
import ButtonCreator from '../../../util/button/button-creator';
import ApiController from '../../../api/api-controller';
import { AppState } from '../../../state/types';
import { Message, User } from '../../../api/types';

export default class ChatView extends View {
    public router: Router;
    public api: ApiController;
    private readonly state: LocalStorageState;
    private garageQuantity: CreatorElement | null;
    private readonly garagePage: CreatorElement | null;
    private raceBoard: CreatorElement | null;
    private finish: CreatorElement | null;
    private inputCreateNameField: InputFieldCreator | null;
    private inputCreateColorField: InputFieldCreator | null;
    private inputUpdateNameField: InputFieldCreator | null;
    private inputUpdateColorField: InputFieldCreator | null;
    private contactsListCreator = new CreatorElement(contactsListParameters);
    private carCreateLogo: SVGElement | null;
    private carUpdateLogo: SVGElement | null;
    private prevButton: CreatorElement | null;
    private nextButton: CreatorElement | null;
    // private readonly dialog: CreatorDialog | null;
    private dialogHeader: CreatorElement | null;
    private dialogBoard: CreatorElement | null;

    constructor(state: LocalStorageState, router: Router, api: ApiController) {
        super(chatSectionParameters);
        this.garageQuantity = null;
        this.garagePage = null;
        this.raceBoard = null;
        this.finish = null;
        this.inputCreateNameField = null;
        this.inputCreateColorField = null;
        this.inputUpdateNameField = null;
        this.inputUpdateColorField = null;
        this.carCreateLogo = null;
        this.carUpdateLogo = null;
        this.prevButton = null;
        this.nextButton = null;
        this.router = router;
        this.state = state;
        this.api = api;

        // this.dialog = new CreatorElement(dialogParameters, dialogContentParameters);
        this.dialogHeader = new CreatorElement(messagesHeaderParameters);
        this.dialogBoard = new CreatorElement(dialogBoardParameters);
        this.configureView();
    }


    // public addDialog(): void {
    //     if (this.dialog instanceof CreatorDialog) {
    //         const dialogElement: HTMLElement | null = this.dialog.getElement();
    //         if (dialogElement) {
    //             this.viewElementCreator.addInnerElement(dialogElement);
    //         }
    //     }
    // }

    private configureView(): void {
        this.addContactsSection();
        this.addDialogArticle();
    }

    private addContactsSection(): void {
        const contactsSectionContainer = new CreatorElement(contactsContainerParameters);
        this.viewElementCreator.addInnerElement(contactsSectionContainer);

        const inputSearchCreator = new InputFieldCreator(contactsSearchFieldParameters);
        inputSearchCreator.setCallback(this.searchContactHandler)
        contactsSectionContainer.addInnerElement(inputSearchCreator);

        contactsSectionContainer.addInnerElement(this.contactsListCreator);
        const onlineUsersCollection: User[] = this.state.getState()[AppStateKeys.ONLINE_USERS]
        const offlineUsersCollection: User[] = this.state.getState()[AppStateKeys.OFFLINE_USERS]
        const allUsersCollection: User[] = [...onlineUsersCollection, ...offlineUsersCollection]

        this.addContacts(this.contactsListCreator, allUsersCollection)
    }

    private addContacts(listContainer: CreatorElement, contactsData: User[]): void {

       CreatorElement.deleteAllItemsInContainer(listContainer) // Clean

        contactsData.forEach(contact => {
            const contactCreator = new CreatorElement(contactItemParameters)
            contactCreator.setCallback(() => this.selectContactToChat(contact))
            listContainer.addInnerElement(contactCreator)

            const statusIconCreator = new CreatorElement(contactStatusParameters);
            if (contact.isLogined) {
                statusIconCreator.setCssClasses([CSS_CONTACTS.ONLINE])
            }

            contactCreator.addInnerElement(statusIconCreator);

            const contactItemCreator = new CreatorElement(contactParameters)
            contactItemCreator.setTextContent(contact.login)
            contactCreator.addInnerElement(contactItemCreator);
        })
    }

    private addDialogArticle(): void {
        const dialogArticleContainerCreator = new CreatorElement(messagesContainerParameters);
        this.viewElementCreator.addInnerElement(dialogArticleContainerCreator);

        dialogArticleContainerCreator.addInnerElement(this.dialogHeader);

        this.addDialogHeaderContent();
        this.addDialogContainer(dialogArticleContainerCreator);
        this.createMessageInputForm(dialogArticleContainerCreator);
    }

    private addDialogHeaderContent(): void {
        const { login, isLogined } = this.state.getState()[AppStateKeys.CURRENT_CONTACT];
        const currentContactNameCreator = new CreatorElement(messagesPersonParameters);

        currentContactNameCreator.setTextContent(sliceNameLength(login));

        let contactStatus: string = chatContent.NO_CONTACT;
        if (login.length > 0) {
            if (isLogined) {
                contactStatus = chatContent.ONLINE;
            } else {
                contactStatus = chatContent.OFFLINE;
            }
        }

        const currentContactStatusCreator = new CreatorElement(personStatusParameters);
        currentContactStatusCreator.setTextContent(contactStatus);

        if (isLogined) {
            currentContactStatusCreator.getElement().classList.remove(CSS_CONTACTS.OFFLINE);
        } else {
            currentContactStatusCreator.getElement().classList.add(CSS_CONTACTS.OFFLINE);
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

        const messagesHistoryCollection: Message[] = this.state.getState()[AppStateKeys.MESSAGE_HISTORY]
        if (messagesHistoryCollection.length === 0) {
            const blankMessageCreator = new CreatorElement(dialogInfoParameters);
            this.dialogBoard.addInnerElement(blankMessageCreator);
        }
        this.addContentToDialogBoard();
    }

    private addContentToDialogBoard(): void {
///////////
// const currentState = this.state.getState()
// const updatedState = {
//     ...currentState,
//     [AppStateKeys.MESSAGE_HISTORY]: mockMessages
// }
// this.state.setState(updatedState)
///////////
        const messagesHistoryCollection: Message[] = this.state.getState()[AppStateKeys.MESSAGE_HISTORY]
        if (messagesHistoryCollection.length > 0) {
            CreatorElement.deleteAllItemsInContainer(this.dialogBoard);

            messagesHistoryCollection.forEach(message => {
                const messageCreator = this.createMessage(message);
                this.dialogBoard.addInnerElement(messageCreator);
            })
        }
    }

    private createMessage(message: Message): CreatorElement {
        const messageContainerCreator = new CreatorElement(messageContainerParameters);

        if (message.to) {
            messageContainerCreator.setCssClasses([CSS_MESSAGE.MESSAGE_OUTCOME]);
        } else if (message.from) {
            messageContainerCreator.setCssClasses([CSS_MESSAGE.MESSAGE_INCOME]);
        }

        const messageHeaderCreator = new CreatorElement(messageHeaderParameters);

        const messageAuthorCreator = new CreatorElement(messageAuthorParameters);
        if (message.from) {
            messageAuthorCreator.setTextContent(message.from);
        } else {
            messageAuthorCreator.setTextContent(chatContent.AUTHOR);
        }

        const messageTimeCreator = new CreatorElement(messageTimeParameters);
        // TODO: complete logic of parsing date and time
        const parsedDateTime: string = String(message.datetime);
        //
        messageTimeCreator.setTextContent(parsedDateTime);

        messageHeaderCreator.addInnerElement(messageAuthorCreator);
        messageHeaderCreator.addInnerElement(messageTimeCreator);

        const messageBodyCreator = new CreatorElement(messageBodyParameters);
        messageBodyCreator.setTextContent(message.text);

        const messageFooterCreator = new CreatorElement(messageFooterParameters);
        messageBodyCreator.setTextContent(message.text);

        const messageStatusCreator = new CreatorElement(messageStatusParameters);
        if (message.status.isDelivered) {
            messageStatusCreator.setTextContent(chatContent.DELIVERED);
        }
        if (message.status.isReaded) {
            messageStatusCreator.setTextContent(chatContent.READ);
        }
        if (message.status.isEdited) {
            messageStatusCreator.setTextContent(chatContent.EDITED);
        }

        messageFooterCreator.addInnerElement(messageStatusCreator);

        messageContainerCreator.addInnerElement(messageHeaderCreator)
        messageContainerCreator.addInnerElement(messageBodyCreator)
        messageContainerCreator.addInnerElement(messageFooterCreator)
        return messageContainerCreator;
    }

    private createMessageInputForm(dialogContainer: CreatorElement): void {
        const messageInputFormCreator = new CreatorElement(sendFormParameters);

        const messageInputAreaCreator = new CreatorElement(sendInputAreaParameters);
        //messageInputAreaCreator.setCallback()

        const buttonSendMessageCreator = new ButtonCreator(buttonSubmitParameters);
        //buttonSendMessageCreator.setCallback()

        messageInputFormCreator.addInnerElement(messageInputAreaCreator);
        messageInputFormCreator.addInnerElement(buttonSendMessageCreator);

        dialogContainer.addInnerElement(messageInputFormCreator);
    }

    private selectContactToChat(contact: User): void {
        this.api.getMessages(contact.login);


        const currentState: AppState = this.state.getState()
        const updatedState: AppState = {
            ...currentState,
            [AppStateKeys.CURRENT_CONTACT]: contact,
        }
console.log(this.state.getState())
        this.state.setState(updatedState);



        this.updateDialogHeaderContent();
    }

    private searchContactHandler = (event: Event): void => {
        const target = event.target;

        if (target && target instanceof HTMLInputElement) {
            console.log(target.value)
            const onlineUsersCollection = this.state.getState()[AppStateKeys.ONLINE_USERS]
            const offlineUsersCollection = this.state.getState()[AppStateKeys.OFFLINE_USERS]
            const usersCollection = [...onlineUsersCollection, ...offlineUsersCollection]

            const filteredUsersBySearchName: User[] = usersCollection.filter(user => user.login.toLowerCase().includes(target.value))


            this.addContacts(this.contactsListCreator, filteredUsersBySearchName)



        }
    }


}
