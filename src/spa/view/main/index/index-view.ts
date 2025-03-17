import './index.scss';
import View from '../../view';
import type LocalStorageState from '../../../state/local-storage-state';
import type Router from '../../../router/router';
import type { ButtonsCollection, ElementParameters } from '../../../../types';
import { AppState, ButtonParameters, ButtonNames, DecisionItem, InputDescription, FieldKeys } from '../../../../types';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import CreatorElement from '../../../util/creator-element';
import ButtonCreator from '../../../util/button/button-creator';
import {
    mainButtonsParameters,
    deleteButtonParameters,
    inputsParameters,
    labelParameters,
    listItemParameters,
    listParameters,
    titleParameters,
} from './index-view-elements-parameters';
import { DataHandler } from '../../../util/data-handler';
import LabelCreator from '../../../util/label/label-creator';

const CssClasses = {
    INDEX: 'index',
};

export default class IndexView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private readonly listOptions: CreatorElement;
    private fileSaver: DataHandler;

    constructor(state: LocalStorageState, router: Router) {
        const parameters = {
            tag: 'section',
            classNames: [CssClasses.INDEX],
        };
        super(parameters);
        this.router = router;
        this.fileSaver = new DataHandler();
        this.state = state;
        this.listOptions = new CreatorElement(listParameters);
        this.configureView();
    }

    configureView() {
        this.addTitle();
        this.addListOptions();
        this.buildListItemGroup();
        this.addButtons(mainButtonsParameters);
    }

    private addTitle(): void {
        const creatorTitle = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);
    }

    private addListOptions(): void {
        this.viewElementCreator.addInnerElement(this.listOptions);
    }

    private buildListItemGroup(): void {
        const listItemsCollection = this.state.getList();

        for (let i = 1; i <= listItemsCollection.length; i += 1) {
            const newListItemParameters: ElementParameters = {
                ...listItemParameters,
                id: `listItem_${listItemsCollection[i - 1].id}`,
            };

            const listItem = new CreatorElement(newListItemParameters);
            this.listOptions.addInnerElement(listItem);
            const listItemGroupId: string = listItemsCollection[i - 1].id.slice(1);
            this.addInputsGroup(inputsParameters, this.state, listItem, listItemGroupId);
        }
    }

    private addNewListItemGroup(): void {
        this.state.incrementLastId();
        const newListItemParameters: ElementParameters = {
            ...listItemParameters,
            id: `listItem_#${this.state.getLastId()}`,
        };
        const listItem = new CreatorElement(newListItemParameters);
        this.listOptions.addInnerElement(listItem);
        this.addInputsGroup(inputsParameters, this.state, listItem);
        this.addNewListRecord();
    }

    private saveListToFile(): void {
        const listToSave: AppState = {
            list: this.state.getList(),
            lastId: this.state.getLastId(),
        };
        this.fileSaver.saveData(listToSave, this.fileSaver.fileName);
    }

    private loadListFromFile(): void {
        this.fileSaver.loadData((data: AppState) => {
            this.deleteAllListItems();
            this.state.setState(data);
            this.buildListItemGroup();
        });
    }

    private addInputsGroup(
        inputsParameters: Array<ElementParameters>,
        state: LocalStorageState,
        container: CreatorElement,
        id?: string
    ): void {
        const parsedContainerId: Array<string> = container.getElementId().split('_');
        const containerId: string = parsedContainerId.at(-1) || '';

        inputsParameters.forEach((inputParameters, index) => {
            const textWithIdToLabel: string = id
                ? `${inputParameters.textContent}${id}`
                : `${inputParameters.textContent}${state.getLastId()}`;

            const callback = (event: Event) => this.keyupHandler(event, containerId, state, inputParameters);

            const inputParametersWithCB = {
                ...inputParameters,
                textContent: textWithIdToLabel,
                callback,
            };
            const creatorInput = new InputFieldCreator(inputParametersWithCB);

            if (index === 0) {
                const newLabelParameters = {
                    ...inputParameters,
                    ...labelParameters,
                    textContent: textWithIdToLabel,
                };
                const creatorLabel = new LabelCreator(newLabelParameters);
                container.addInnerElement(creatorLabel);
            }
            container.addInnerElement(creatorInput);
            this.fillInputsFromSavedState(containerId, creatorInput, inputParameters);
        });
        this.addDeleteButton(container, containerId);
    }

    private fillInputsFromSavedState(
        id: string,
        creatorInput: InputFieldCreator,
        inputParameters: ElementParameters
    ): void {
        const list = this.state.getField(FieldKeys.LIST);
        let listItem: DecisionItem | undefined = { id: '', title: '', weight: '' };
        if (Array.isArray(list)) {
            listItem = list.find(item => item.id === id);
        }

        if (listItem) {
            const weightParameter: ElementParameters | undefined = inputsParameters.find(
                parameters => parameters.placeholder === InputDescription.WEIGHT
            );
            const maxValue: number = weightParameter && weightParameter.max ? parseInt(weightParameter.max, 10) : 100;

            if (inputParameters.placeholder === InputDescription.TITLE) {
                creatorInput.setValue(listItem.title);
            } else if (
                inputParameters.placeholder === InputDescription.WEIGHT &&
                parseInt(listItem.weight, 10) > 0 &&
                parseInt(listItem.weight, 10) < maxValue
            ) {
                creatorInput.setValue(String(listItem.weight));
            }
        }
    }

    private addDeleteButton(container: CreatorElement, containerId: string): void {
        const newDeleteButtonParameters: ButtonParameters = {
            ...deleteButtonParameters,
            id: `buttonDelete_#${this.state.getLastId()}`,
            callback: (): void => {
                this.deleteListItem(containerId);
            },
        };
        const deleteButton = new CreatorElement(newDeleteButtonParameters);
        const deleteButtonId: string = `deleteButton_${containerId}`;
        deleteButton.setElementId(deleteButtonId);
        container.addInnerElement(deleteButton);
    }

    private deleteAllListItems(): void {
        const listElement = this.listOptions.getElement();
        if (listElement) {
            while (listElement.firstElementChild) {
                listElement.firstElementChild.remove();
            }
        }
    }

    private resetState(): void {
        const emptyState: AppState = {
            list: [],
            lastId: 0,
        };
        this.state.setState(emptyState);
    }

    private deleteListItem(id: string): void {
        let state: AppState = this.state.getState();
        state.list = state.list.filter(item => item.id !== id);
        this.state.setState(state);

        this.deleteAllListItems();
        this.buildListItemGroup();
    }

    private addNewListRecord(): void {
        const newListRecord = {
            id: `#${this.state.getLastId()}`,
            title: '',
            weight: '',
        };

        const listRecords = this.state.getList();
        listRecords.push(newListRecord);
    }

    private addButtons(buttonsParameters: ButtonsCollection): void {
        buttonsParameters.forEach(buttonParameters => {
            let callback: () => void = () => {};

            if (buttonParameters.textContent === ButtonNames.ADD) {
                callback = () => this.addNewListItemGroup();
            }

            if (buttonParameters.textContent === ButtonNames.SAVE) {
                callback = () => this.saveListToFile();
            }

            if (buttonParameters.textContent === ButtonNames.LOAD) {
                callback = () => this.loadListFromFile();
            }

            if (buttonParameters.textContent === ButtonNames.CLEAR) {
                callback = () => {
                    this.deleteAllListItems();
                    this.resetState();
                };
            }

            const buttonParametersWithCB = {
                ...buttonParameters,
                callback,
            };

            const creatorButton = new ButtonCreator(buttonParametersWithCB);
            this.viewElementCreator.addInnerElement(creatorButton);
        });
    }

    keyupHandler(event: Event, id: string | undefined, state: LocalStorageState, parameters: ElementParameters): void {
        if (event.target instanceof HTMLInputElement && id) {
            this.state.setField(id, event.target.value, state, parameters);
        }
    }
}
