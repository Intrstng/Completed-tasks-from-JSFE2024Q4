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
import { ButtonNames, ElementParameters, FieldKeys, Pages } from '../../../../types';
import LabelCreator from '../../../util/label/label-creator';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import { generateSvg } from '../../../util/generate-svg';
import CanvasCreator from '../../../util/canvas/canvas-creator';
import LocalStorageSelector from '../../../state/local-storage-selector';

const CssClasses = {
    SELECTOR: 'selector',
    TOOLTIP: 'tooltip',
    TOOLTIP_HIDDEN: 'tooltip-hidden',
};

export default class SelectorView extends View {
    public router: Router;
    private readonly selectorState: LocalStorageSelector;
    private readonly canvas: CanvasCreator;
    private isMute: boolean;
    private enteredDurationValue: string = inputDurationParameters.value ?? '';

    constructor(selectorState: LocalStorageSelector, router: Router) {
        const parameters = {
            tag: 'section',
            classNames: [CssClasses.SELECTOR],
        };
        super(parameters);
        this.router = router;
        this.selectorState = selectorState;
        this.canvas = new CanvasCreator(canvasParameters);

        const muteState = this.selectorState.getField(FieldKeys.ISMUTE);
        this.isMute = typeof muteState === 'boolean' ? muteState : false;

        this.configureView();
    }

    configureView() {
        this.addTitle();
        this.createControls();
        this.addPickedOption();
        this.addCanvas();
    }

    private addTitle(): void {
        const creatorTitle = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);
    }

    createControls(): void {
        const creatorForm = new CreatorElement(formSelectorParameters);
        this.viewElementCreator.addInnerElement(creatorForm);

        selectorButtons.forEach(buttonParameters => {
            const creatorButton = new ButtonCreator(buttonParameters);

            if (buttonParameters.textContent === ButtonNames.BACK) {
                creatorButton.setCallback(this.redirectToMainPage.bind(this));
            }

            if (
                buttonParameters.textContent === ButtonNames.SOUND_ON ||
                buttonParameters.textContent === ButtonNames.SOUND_OFF
            ) {
                if (this.isMute) {
                    creatorButton.setTextContent(ButtonNames.SOUND_ON);
                } else {
                    creatorButton.setTextContent(ButtonNames.SOUND_OFF);
                }
                creatorButton.setCallback(this.toggleSound.bind(this));
            }

            creatorForm.addInnerElement(creatorButton);
        });

        const creatorLabelDuration = new LabelCreator(labelDurationParameters);

        const svg = generateSvg();

        const creatorDurationInput = new InputFieldCreator(inputDurationParameters);
        let currentDuration = this.selectorState.getField(FieldKeys.DURATION);
        currentDuration = typeof currentDuration === 'string' ? currentDuration : inputDurationParameters.value;

        creatorDurationInput.setValue(currentDuration);

        const callback = (event: Event) => this.keyupHandler(event, inputDurationParameters);
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

    redirectToMainPage(event: Event): void {
        event.preventDefault();
        this.router.navigate(Pages.INDEX);
    }

    toggleSound(event: Event): void {
        event.preventDefault();
        const soundButton = event.currentTarget;

        if (soundButton instanceof HTMLButtonElement) {
            this.isMute = !this.isMute;
            soundButton.textContent = this.isMute ? ButtonNames.SOUND_ON : ButtonNames.SOUND_OFF;
            this.selectorState.setField(FieldKeys.ISMUTE, this.isMute);
        }
    }

    startDecisionWheel(event: Event, toolTipElement: CreatorElement): void {
        event.preventDefault();

        if (!this.validateInput(this.enteredDurationValue, inputDurationParameters)) {
            this.showFaultInputToolTip(toolTipElement);
        } else {
            console.log(
                'Your input data is correct, but the canvas wheel is not implemented yet (tag <canvas> added in HTML). The wheel implementation will be coming soon.'
            );
        }
    }

    private showFaultInputToolTip(toolTipElement: CreatorElement): void {
        const tooltipElement = toolTipElement.getElement();

        if (tooltipElement && tooltipElement && 'classList' in tooltipElement) {
            tooltipElement.classList.remove(CssClasses.TOOLTIP_HIDDEN);
            setTimeout(() => {
                tooltipElement.classList.add(CssClasses.TOOLTIP_HIDDEN);
            }, 1500);
        }
    }

    validateInput(value: string, durationParameters: ElementParameters): boolean {
        const minValue: number = durationParameters && durationParameters.min ? parseInt(durationParameters.min) : 0;
        const maxValue: number = durationParameters && durationParameters.max ? parseInt(durationParameters.max) : 100;

        return parseInt(value, 10) >= minValue && parseInt(value, 10) <= maxValue;
    }

    keyupHandler(event: Event, durationParameters: ElementParameters): void {
        if (event.target instanceof HTMLInputElement) {
            this.enteredDurationValue = event.target.value;

            if (this.validateInput(event.target.value, durationParameters)) {
                this.selectorState.setField(FieldKeys.DURATION, event.target.value);
            }
        }
    }
}
