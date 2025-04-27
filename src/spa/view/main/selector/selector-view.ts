import './selector.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import {
    canvasParameters,
    formSelectorParameters,
    inputDurationParameters,
    labelDurationParameters,
    selectorButtons,
    selectorPickedParameters,
    selectorStartButtonParameters,
    titleParameters,
    tooltipDurationParameters,
} from '../index/index-view-elements-parameters';
import ButtonCreator from '../../../util/button/button-creator';
import type { AppState, ElementParameters } from '../../../../types';
import { ButtonNames, FieldKeys, Pages } from '../../../../types';
import LabelCreator from '../../../util/label/label-creator';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import { generateSvg } from '../../../util/generate-svg';
import CanvasCreator from '../../../util/canvas/canvas-creator';
import type LocalStorageState from '../../../state/local-storage-state';

const CssClassesSelectorView = {
    SELECTOR: 'selector',
    TOOLTIP: 'tooltip',
    TOOLTIP_HIDDEN: 'tooltip-hidden',
    SOUND_OFF: 'button-sound-off',
};

const SelectorViewParameters = {
    tag: 'section',
    classNames: [CssClassesSelectorView.SELECTOR],
};

export default class SelectorView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private readonly canvas: CanvasCreator;
    private isMute: boolean;
    private enteredDurationValue: string = inputDurationParameters.value ?? '';

    constructor(appState: LocalStorageState, router: Router) {
        super(SelectorViewParameters);
        this.router = router;
        this.state = appState;
        this.canvas = new CanvasCreator(canvasParameters, appState);

        const muteState = this.state.getField(FieldKeys.ISMUTE);
        this.isMute = typeof muteState === 'boolean' ? muteState : false;

        this.configureView();
    }

    private static showFaultInputToolTip(toolTipElement: CreatorElement): void {
        const tooltipElement = toolTipElement.getElement();

        if (tooltipElement && 'classList' in tooltipElement) {
            tooltipElement.classList.remove(CssClassesSelectorView.TOOLTIP_HIDDEN);
            setTimeout(() => {
                tooltipElement.classList.add(CssClassesSelectorView.TOOLTIP_HIDDEN);
            }, 1500);
        }
    }

    private static validateInput(value: string, durationParameters: ElementParameters): boolean {
        const minValue: number =
            durationParameters && durationParameters.min ? Number.parseInt(durationParameters.min, 10) : 0;
        const maxValue: number =
            durationParameters && durationParameters.max ? Number.parseInt(durationParameters.max, 10) : 100;

        return Number.parseInt(value, 10) >= minValue && Number.parseInt(value, 10) <= maxValue;
    }

    private configureView(): void {
        this.addTitle();
        this.createControls();
        this.addPickedOption();
        this.addCanvas();
    }

    private addTitle(): void {
        const creatorTitle = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);
    }

    private createFormWithInputs(form: CreatorElement): void {
        selectorButtons.forEach(buttonParameters => {
            const creatorButton = new ButtonCreator(buttonParameters);

            if (buttonParameters.textContent === ButtonNames.BACK) {
                creatorButton.setCallback(this.redirectToMainPage.bind(this));
            }

            if (
                buttonParameters.textContent === ButtonNames.SOUND_ON ||
                buttonParameters.textContent === ButtonNames.SOUND_OFF
            ) {
                const buttonElement = creatorButton.getElement();

                if (this.isMute && buttonElement && 'classList' in buttonElement) {
                    creatorButton.setTextContent(ButtonNames.SOUND_ON);
                    buttonElement.classList.remove(CssClassesSelectorView.SOUND_OFF);
                } else if (!this.isMute && buttonElement && 'classList' in buttonElement) {
                    creatorButton.setTextContent(ButtonNames.SOUND_OFF);
                    buttonElement.classList.add(CssClassesSelectorView.SOUND_OFF);
                }
                creatorButton.setCallback(this.toggleSound.bind(this));
            }

            form.addInnerElement(creatorButton);
        });
    }

    private createControls(): void {
        const creatorForm = new CreatorElement(formSelectorParameters);
        this.viewElementCreator.addInnerElement(creatorForm);

        this.createFormWithInputs(creatorForm);

        const creatorLabelDuration = new LabelCreator(labelDurationParameters);

        const svg = generateSvg();

        const creatorDurationInput = new InputFieldCreator(inputDurationParameters);
        let currentDuration = this.state.getField(FieldKeys.DURATION);
        currentDuration = typeof currentDuration === 'string' ? currentDuration : inputDurationParameters.value;

        creatorDurationInput.setValue(currentDuration);

        const callback = (event: Event): void => this.keyupHandler(event, inputDurationParameters);
        creatorDurationInput.setCallback(callback);

        creatorLabelDuration.addInnerElement(svg);
        creatorLabelDuration.addInnerElement(creatorDurationInput);

        const creatorTooltipDuration = new CreatorElement(tooltipDurationParameters);
        creatorLabelDuration.addInnerElement(creatorTooltipDuration);
        creatorForm.addInnerElement(creatorLabelDuration);

        const creatorStartButton = new ButtonCreator(selectorStartButtonParameters);
        creatorStartButton.setCallback((event: Event) => this.startDecisionWheel(event, creatorTooltipDuration));

        creatorForm.addInnerElement(creatorStartButton);
    }

    private addPickedOption(): void {
        const pickedOption = new CreatorElement(selectorPickedParameters);
        this.viewElementCreator.addInnerElement(pickedOption);
    }

    private addCanvas(): void {
        this.viewElementCreator.addInnerElement(this.canvas);
    }

    private redirectToMainPage(event: Event): void {
        event.preventDefault();
        this.router.navigate(Pages.INDEX);
    }

    private toggleSound(event: Event): void {
        event.preventDefault();
        const soundButton = event.currentTarget;

        if (soundButton instanceof HTMLButtonElement) {
            this.isMute = !this.isMute;
            soundButton.textContent = this.isMute ? ButtonNames.SOUND_ON : ButtonNames.SOUND_OFF;

            if (this.isMute) {
                soundButton.classList.remove(CssClassesSelectorView.SOUND_OFF);
            } else {
                soundButton.classList.add(CssClassesSelectorView.SOUND_OFF);
            }

            const currentState: AppState = this.state.getState();
            const updatedState: AppState = {
                ...currentState,
                [FieldKeys.ISMUTE]: this.isMute,
            };
            this.state.setState(updatedState);
        }
    }

    private startDecisionWheel(event: Event, toolTipElement: CreatorElement): void {
        event.preventDefault();
        // Temporary solution
        const canvasElement = this.canvas.getElement();
        if (canvasElement instanceof HTMLCanvasElement) {
            console.log('Here wheel starts turning...');
            console.log(`Sound state is: ${this.isMute}`);
            console.log(`Duration value is: ${this.enteredDurationValue}`);
            this.canvas.spin();
        } else {
            console.error('Canvas element is not an HTMLCanvasElement or is null');
        }
        //
        if (SelectorView.validateInput(this.enteredDurationValue, inputDurationParameters)) {
            console.log(
                'Your input is correct, the wheel should have started spinning now, but the wheel rotation has not been implemented yet.'
            );
        } else {
            SelectorView.showFaultInputToolTip(toolTipElement);
        }
    }

    private keyupHandler(event: Event, durationParameters: ElementParameters): void {
        if (event.target instanceof HTMLInputElement) {
            this.enteredDurationValue = event.target.value;

            if (SelectorView.validateInput(event.target.value, durationParameters)) {
                const currentState: AppState = this.state.getState();
                const updatedState: AppState = {
                    ...currentState,
                    [FieldKeys.DURATION]: event.target.value,
                };

                this.state.setState(updatedState);
            }
        }
    }
}
