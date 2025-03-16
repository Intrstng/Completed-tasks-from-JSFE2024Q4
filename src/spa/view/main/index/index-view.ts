import './index.scss';

import View from '../../view';
import type LocalStorageState from '../../../state/local-storage-state';
import type Router from '../../../router/router';
import type { ButtonsCollection, ElementParameters } from '../../../../types';
import { ButtonNames } from '../../../../types';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import CreatorElement from '../../../util/creator-element';
import ButtonCreator from '../../../util/button/button-creator';
import { buttons, inputs, listItemParameters, listParameters, titleParameters } from './index-view-elements-parameters';

const CssClasses = {
    INDEX: 'index',
};

export default class IndexView extends View {
    public router: Router;
    private state: LocalStorageState;
    private listOptions: CreatorElement;
    private listItemsInGroup: number = 2;

    constructor(state: LocalStorageState, router: Router) {
        const parameters = {
            tag: 'section',
            classNames: [CssClasses.INDEX],
        };
        super(parameters);
        this.router = router;
        this.state = state;
        this.listOptions = new CreatorElement(listParameters);
        this.configureView(state);
    }

    configureView(state: LocalStorageState) {
        this.addTitle();
        this.addListOptions();

        this.buildListItemGroup();
        // this.addInputs(inputs, state, (event: Event) => this.keyupHandler(event, 'text'))
        //this.addInputs(inputs, state);
        this.addButtons(buttons);
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
            const listItemParameters: ElementParameters = {
                tag: 'li',
                id: `listItem_${listItemsCollection[i - 1].id}`,
                classNames: ['options-list-item'],
            };

            const listItem = new CreatorElement(listItemParameters);
            this.listOptions.addInnerElement(listItem);
            this.addInputsGroup(inputs, this.state, listItem);
        }
    }

    private addNewListItemGroup(): void {
        this.state.incrementLastId();
        const newListItemParameters: ElementParameters = {
            tag: 'li',
            id: `listItem_#${this.state.getLastId()}`,
            classNames: ['options-list-item'],
        };
        const listItem = new CreatorElement(newListItemParameters);
        this.listOptions.addInnerElement(listItem);
        this.addInputsGroup(inputs, this.state, listItem);
        this.addNewListRecord();
    }

    private addInputsGroup(
        inputsParameters: Array<ElementParameters>,
        state: LocalStorageState,
        container: CreatorElement
    ): void {
        inputsParameters.forEach(inputParameters => {
            const callback = (event: Event) => this.keyupHandler(event, inputParameters.placeholder, state);
            const inputParametersWithCB = {
                ...inputParameters,
                textContent: `${inputParameters.textContent}${state.getLastId()}`,
                callback,
            };
            const creatorInput = new InputFieldCreator(inputParametersWithCB);

            // if (inputParameters.placeholder) {
            //     const value = state.getField(inputParameters.placeholder);
            //     creatorInput.setValue(value);
            // }

            container.addInnerElement(creatorInput);
        });
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
                // callback = () => this.addInputs(inputs, this.state, );
                callback = () => this.addNewListItemGroup();
            }

            const buttonParametersWithCB = {
                ...buttonParameters,
                callback,
            };

            const creatorButton = new ButtonCreator(buttonParametersWithCB);
            this.viewElementCreator.addInnerElement(creatorButton);
        });
    }

    keyupHandler(event: Event, fieldName: string | undefined, state: LocalStorageState): void {
        if (event.target instanceof HTMLInputElement && fieldName) {
            this.state.setField(fieldName, event.target.value, state);
        }
    }
}

//
//
// import './index.scss';
//
// import View from '../../view';
// import type LocalStorageState from '../../../state/local-storage-state';
// import type Router from '../../../router/router';
// import { ButtonNames, ButtonsCollection, ElementParameters } from '../../../../types';
// import InputFieldCreator from '../../../util/input-field/input-field-creator';
// import CreatorElement from '../../../util/creator-element';
// import ButtonCreator from '../../../util/button/button-creator';
// import { buttons } from '../../../util/button/buttons';
// import { inputs } from '../../../util/input-field/inputs';
//
// const CssClasses = {
//   INDEX: 'index',
// };
//
// export default class IndexView extends View {
//   public router: Router;
//   private state: LocalStorageState;
//
//   constructor(state: LocalStorageState, router: Router) {
//     const parameters = {
//       tag: 'section',
//       classNames: [CssClasses.INDEX],
//     };
//     super(parameters);
//     this.router = router;
//     this.state = state;
//
//     this.configureView(state);
//   }
//
//   configureView(state: LocalStorageState) {
//     let titleParams: ElementParameters = {
//       tag: 'h1',
//       classNames: ['title'],
//       title: 'Decision Making Tool',
//       textContent: 'Decision Making Tool',
//     };
//
//     let creatorTitle = new CreatorElement(titleParams);
//     this.viewElementCreator.addInnerElement(creatorTitle);
//
//     // this.addInputs(inputs, state, (event: Event) => this.keyupHandler(event, 'text'))
//     this.addInputs(inputs, state)
//     this.addButtons(buttons);
//   }
//
//   keyupHandler(event: Event, fieldName: string | undefined, state: LocalStorageState): void {
//     if (event.target instanceof HTMLInputElement && fieldName) {
//       this.state.setField(fieldName, event.target.value, state);
//     }
//   }
//
//   private addInputs(inputsParameters: Array<ElementParameters>, state: LocalStorageState): void {
//     inputsParameters.forEach((inputParameters) => {
//       const callback = (event: Event) => this.keyupHandler(event, inputParameters.placeholder, state)
//       const inputParametersWithCB = {
//         ...inputParameters,
//         textContent: `${inputParameters.textContent}${state.getLastId()}`,
//         callback
//       }
//       const creatorInput = new InputFieldCreator(inputParametersWithCB);
//
//       if (inputParameters.placeholder) {
//         const value = state.getField(inputParameters.placeholder);
//         creatorInput.setValue(value);
//       }
//
//       this.viewElementCreator.addInnerElement(creatorInput);
//     })
//   }
//
//   private addButtons(buttonsParameters: ButtonsCollection): void {
//     buttonsParameters.forEach((buttonParameters) => {
//       let callback: () => void = () => {};
//
//       if (buttonParameters.textContent === ButtonNames.ADD) {
//         callback = () => this.addInputs(inputs, this.state);
//       }
//
//       const buttonParametersWithCB = {
//         ...buttonParameters,
//         callback
//       }
//
//       const creatorButton = new ButtonCreator(buttonParametersWithCB);
//       this.viewElementCreator.addInnerElement(creatorButton);
//     })
//   }
//
//
//
//
//
//
//   // configureView(state) {
//   //   /**
//   //    * @type {import('../../../util/element-creator').ElementParams}
//   //    */
//   //   let inputParams = {
//   //     tag: 'input',
//   //     classNames: [],
//   //     textContent: FIELD_TEXT_ONE,
//   //     callback: (event) => this.keyupHandler(event, FIELD_TEXT_ONE),
//   //   };
//   //   let creatorInput = new InputFieldCreator(inputParams);
//   //   creatorInput.setValue(state.getField(FIELD_TEXT_ONE));
//   //   this.viewElementCreator.addInnerElement(creatorInput);
//   //
//   //   inputParams = {
//   //     tag: 'input',
//   //     classNames: [],
//   //     textContent: FIELD_TEXT_TWO,
//   //     callback: (event) => this.keyupHandler(event, FIELD_TEXT_TWO),
//   //   };
//   //   creatorInput = new InputFieldCreator(inputParams);
//   //   creatorInput.setValue(state.getField(FIELD_TEXT_TWO));
//   //   this.viewElementCreator.addInnerElement(creatorInput);
//   // }
//   //
//   // /**
//   //  * @param {KeyboardEvent} event
//   //  * @param {string} fieldName
//   //  */
//   // keyupHandler(event, fieldName) {
//   //   if (event.target instanceof HTMLInputElement) {
//   //     this.state.setField(fieldName, event.target.value);
//   //   }
//   // }
// }
