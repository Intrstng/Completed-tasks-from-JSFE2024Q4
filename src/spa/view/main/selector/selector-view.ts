import './selector.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import {
    canvasParameters,
    dialogParameters,
    formSelectorParameters,
    getDialogShowWinnerResult,
    inputDurationParameters,
    labelDurationParameters,
    selectorButtons,
    selectorPickedParameters,
    selectorStartButtonParameters,
    titleParameters,
    tooltipDurationParameters,
} from '../index/index-view-elements-parameters';
import ButtonCreator from '../../../util/button/button-creator';
import type { AppState, DecisionItem, ElementParameters } from '../../../../types';
import { ButtonNames, FieldKeys, Pages } from '../../../../types';
import LabelCreator from '../../../util/label/label-creator';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import { generateSvg } from '../../../util/generate-svg';
import CanvasCreator from '../../../util/canvas/canvas-creator';
import type LocalStorageState from '../../../state/local-storage-state';
import AudioManager from '../../../util/audio/audio-manager';
import CreatorDialog from '../../../util/dialog/dialog-creator';

const CssClassesSelectorView = {
    SELECTOR: 'selector',
    TOOLTIP: 'tooltip',
    TOOLTIP_HIDDEN: 'tooltip-hidden',
    SOUND_OFF: 'button-sound-off',
};

export enum DecisionPickerStatus {
    INITIAL = 'initial',
    PICKING = 'picking',
    PICKED = 'picked',
}

const SelectorViewParameters = {
    tag: 'section',
    classNames: [CssClassesSelectorView.SELECTOR],
};

export default class SelectorView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private readonly canvas: CanvasCreator;
    private isMute: boolean;
    private backButton: ButtonCreator | null = null;
    private soundButton: ButtonCreator | null = null;
    private durationInput: InputFieldCreator | null = null;
    private startButton: ButtonCreator | null = null;
    private pickedOptionElement: CreatorElement | null = null;
    private enteredDurationValue: string = inputDurationParameters.value ?? '';
    private status: DecisionPickerStatus = DecisionPickerStatus.INITIAL;
    private readonly audioManager = new AudioManager();

    constructor(appState: LocalStorageState, router: Router) {
        super(SelectorViewParameters);
        this.router = router;
        this.state = appState;
        this.canvas = new CanvasCreator(canvasParameters, appState);

        const muteState = this.state.getField(FieldKeys.ISMUTE);
        this.isMute = typeof muteState === 'boolean' ? muteState : false;
        this.audioManager.setMuted(this.isMute);

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
        if (!value.trim()) return false;

        const duration = Number(value);
        const minValue = Number(durationParameters.min);
        const maxValue = Number(durationParameters.max);

        return (
            Number.isInteger(duration) &&
            Number.isFinite(minValue) &&
            Number.isFinite(maxValue) &&
            duration >= minValue &&
            duration <= maxValue
        );
    }

    private showResultDialog(option: DecisionItem): void {
        const dialog = new CreatorDialog(dialogParameters, getDialogShowWinnerResult(option), this.state);

        const dialogElement = dialog.getElement();

        if (!dialogElement) return;

        document.body.append(dialogElement);
        dialog.showDialog();
    }

    private setStatus(status: DecisionPickerStatus, option?: DecisionItem): void {
        this.status = status;
        this.updateControlsState();

        if (!this.pickedOptionElement) return;

        const element = this.pickedOptionElement.getElement();

        if (!element) return;

        element.classList.remove('picked-option-active');

        switch (status) {
            case DecisionPickerStatus.INITIAL: {
                this.pickedOptionElement.setTextContent('Pick an option');
                break;
            }

            case DecisionPickerStatus.PICKING: {
                this.pickedOptionElement.setTextContent(option?.title ?? '');
                break;
            }

            case DecisionPickerStatus.PICKED: {
                this.pickedOptionElement.setTextContent(option?.title ?? '');
                element.classList.add('picked-option-active');
                break;
            }
        }
    }

    private updateControlsState(): void {
        const isPicking = this.status === DecisionPickerStatus.PICKING;

        this.backButton?.setDisabled(isPicking);
        this.soundButton?.setDisabled(isPicking);
        this.durationInput?.setDisabled(isPicking);
        this.startButton?.setDisabled(isPicking);
    }

    private configureView(): void {
        this.addTitle();
        this.createControls();
        this.addPickedOption();
        this.addCanvas();

        this.setStatus(DecisionPickerStatus.INITIAL);
    }

    private addTitle(): void {
        const creatorTitle = new CreatorElement(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);
    }

    private createFormWithInputs(form: CreatorElement): void {
        selectorButtons.forEach(buttonParameters => {
            const creatorButton = new ButtonCreator(buttonParameters);

            if (buttonParameters.textContent === ButtonNames.BACK) {
                this.backButton = creatorButton;
                creatorButton.setCallback(this.redirectToMainPage.bind(this));
            }

            if (
                buttonParameters.textContent === ButtonNames.SOUND_ON ||
                buttonParameters.textContent === ButtonNames.SOUND_OFF
            ) {
                this.soundButton = creatorButton;
                creatorButton.setCallback(this.toggleSound.bind(this));
            }

            form.addInnerElement(creatorButton);
        });
    }

    private updateSoundButton(): void {
        const button = this.soundButton?.getElement();

        if (!(button instanceof HTMLButtonElement)) return;

        button.textContent = this.isMute ? ButtonNames.SOUND_OFF : ButtonNames.SOUND_ON;

        button.classList.toggle(CssClassesSelectorView.SOUND_OFF, !this.isMute);
    }

    private createControls(): void {
        const creatorForm = new CreatorElement(formSelectorParameters);
        this.viewElementCreator.addInnerElement(creatorForm);

        const creatorLabelDuration = new LabelCreator(labelDurationParameters);

        const svg = generateSvg();

        const creatorDurationInput = new InputFieldCreator(inputDurationParameters);
        this.durationInput = creatorDurationInput;

        const storedDuration = this.state.getField(FieldKeys.DURATION);

        const currentDuration =
            typeof storedDuration === 'string' ? storedDuration : (inputDurationParameters.value ?? '');

        this.enteredDurationValue = currentDuration;
        creatorDurationInput.setValue(currentDuration);

        const callback = (event: Event): void => this.durationInputHandler(event, inputDurationParameters);
        creatorDurationInput.setCallback(callback);

        creatorLabelDuration.addInnerElement(svg);
        creatorLabelDuration.addInnerElement(creatorDurationInput);

        const creatorTooltipDuration = new CreatorElement(tooltipDurationParameters);
        creatorLabelDuration.addInnerElement(creatorTooltipDuration);
        creatorForm.addInnerElement(creatorLabelDuration);

        const creatorStartButton = new ButtonCreator(selectorStartButtonParameters);
        creatorStartButton.setCallback((event: Event) => this.startDecisionWheel(event, creatorTooltipDuration));

        this.createFormWithInputs(creatorForm);
        this.updateSoundButton();
        this.startButton = creatorStartButton;

        creatorForm.addInnerElement(creatorStartButton);
    }

    private updatePickedOption(option: DecisionItem): void {
        this.pickedOptionElement?.setTextContent(option.title);
    }

    private addPickedOption(): void {
        this.pickedOptionElement = new CreatorElement(selectorPickedParameters);

        this.viewElementCreator.addInnerElement(this.pickedOptionElement);
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

        if (!(event.currentTarget instanceof HTMLButtonElement)) return;

        this.isMute = !this.isMute;
        this.audioManager.setMuted(this.isMute);
        this.updateSoundButton();

        const currentState: AppState = this.state.getState();

        this.state.setState({
            ...currentState,
            [FieldKeys.ISMUTE]: this.isMute,
        });
    }

    private startDecisionWheel(event: Event, toolTipElement: CreatorElement): void {
        event.preventDefault();
        if (this.status === DecisionPickerStatus.PICKING) {
            return;
        }
        if (!SelectorView.validateInput(this.enteredDurationValue, inputDurationParameters)) {
            SelectorView.showFaultInputToolTip(toolTipElement);
            return;
        }
        this.setStatus(DecisionPickerStatus.PICKING);
        let isFirstUpdate = true;

        const started = this.canvas.spin(
            Number(this.enteredDurationValue),
            selectedOption => {
                this.updatePickedOption(selectedOption);
                // Первый callback - начальное состояние сектора (звук только при последующих переходах)
                if (isFirstUpdate) {
                    isFirstUpdate = false;
                    return;
                }
                this.audioManager.play('spinTick');
            },
            selectedOption => {
                this.setStatus(DecisionPickerStatus.PICKED, selectedOption);
                this.audioManager.play('spinFinish');
                this.showResultDialog(selectedOption);
            }
        );
        if (!started) {
            this.setStatus(DecisionPickerStatus.INITIAL);
            return;
        }
        this.audioManager.play('spinStart');

        if (!started) {
            this.setStatus(DecisionPickerStatus.INITIAL);
        }
    }

    private durationInputHandler(event: Event, durationParameters: ElementParameters): void {
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
