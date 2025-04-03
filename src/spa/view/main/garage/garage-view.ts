import './garage.scss';
import View from '../../view';
import type Router from '../../../router/router';
import type { ElementParameters } from '../../../../types';
import CreatorElement from '../../../util/creator-element';
import { garageParameters, titleParameters } from './garage-view-parameters';
import LocalStorageState from '../../../state/local-storage-state';

export default class GarageView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private readonly listOptions: CreatorElement;

    constructor(state: LocalStorageState, router: Router) {
        super(garageParameters);
        this.router = router;

        this.state = state;
        this.configureView();
    }

    private configureView(): void {}

    private addTitle(): void {
        const creatorTitle = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);
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
            const textWithIdToLabel: string = id;
            // ? `${inputParameters.textContent}${id}`
            // : `${inputParameters.textContent}${state.getLastId()}`;

            const callback = (event: Event): void => this.keyupHandler(event, containerId, state, inputParameters);

            const inputParametersWithCB = {
                ...inputParameters,
                textContent: textWithIdToLabel,
                callback,
            };
            //const creatorInput = new InputFieldCreator(inputParametersWithCB);

            // if (index === 0) {
            //   const newLabelParameters = {
            //     ...inputParameters,
            //     ...labelParameters,
            //     textContent: textWithIdToLabel,
            //   };
            //   const creatorLabel = new LabelCreator(newLabelParameters);
            //   container.addInnerElement(creatorLabel);
            // }
            //container.addInnerElement(creatorInput);
            // this.fillInputsFromSavedState(containerId, creatorInput, inputParameters);
        });
        // this.addDeleteButton(container, containerId);
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
        const emptyState: any = {
            list: [],
            lastId: 0,
        };
        // this.state.setState(emptyState);
    }

    private keyupHandler(event: Event, id: string | undefined, state: any, parameters: ElementParameters): void {
        if (event.target instanceof HTMLInputElement && id) {
            if (
                (event.target.type === 'number' && event.target.value.includes('e')) ||
                event.target.value.includes('E')
            ) {
                event.target.value = event.target.value.replaceAll(/e/gi, '');
            }

            if (event.target.type === 'number' && Number.parseInt(event.target.value, 10) > 1000) {
                event.target.value = event.target.value.slice(0, -1);
            }

            //  this.state.setField(id, event.target.value, state, parameters);
        }
    }
}
