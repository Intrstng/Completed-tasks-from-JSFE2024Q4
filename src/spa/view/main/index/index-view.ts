import './index.scss';

import View from '../../view';
import type LocalStorageState from '../../../state/local-storage-state';
import type Router from '../../../router/router';

const CssClasses = {
    INDEX: 'index',
};
const FIELD_TEXT_ONE = 'Поле для ввода 1';
const FIELD_TEXT_TWO = 'Поле для ввода 2';

export default class IndexView extends View {
    // /**
    //  * @param {import('../../../state/state').default} state
    //  */
    constructor(state: LocalStorageState, router: Router) {
        // /**
        //  * @type {import('../../view').ViewParams}
        //  */
        const parameters = {
            tag: 'section',
            classNames: [CssClasses.INDEX],
        };
        super(parameters);
        // this.state = state;
        // this.configureView(state);
    }
    //
    // /**
    //  * @param {import('../../../state/state').default} state
    //  */
    // configureView(state) {
    //   /**
    //    * @type {import('../../../util/element-creator').ElementParams}
    //    */
    //   let inputParams = {
    //     tag: 'input',
    //     classNames: [],
    //     textContent: FIELD_TEXT_ONE,
    //     callback: (event) => this.keyupHandler(event, FIELD_TEXT_ONE),
    //   };
    //   let creatorInput = new InputFieldCreator(inputParams);
    //   creatorInput.setValue(state.getField(FIELD_TEXT_ONE));
    //   this.viewElementCreator.addInnerElement(creatorInput);
    //
    //   inputParams = {
    //     tag: 'input',
    //     classNames: [],
    //     textContent: FIELD_TEXT_TWO,
    //     callback: (event) => this.keyupHandler(event, FIELD_TEXT_TWO),
    //   };
    //   creatorInput = new InputFieldCreator(inputParams);
    //   creatorInput.setValue(state.getField(FIELD_TEXT_TWO));
    //   this.viewElementCreator.addInnerElement(creatorInput);
    // }
    //
    // /**
    //  * @param {KeyboardEvent} event
    //  * @param {string} fieldName
    //  */
    // keyupHandler(event, fieldName) {
    //   if (event.target instanceof HTMLInputElement) {
    //     this.state.setField(fieldName, event.target.value);
    //   }
    // }
}
