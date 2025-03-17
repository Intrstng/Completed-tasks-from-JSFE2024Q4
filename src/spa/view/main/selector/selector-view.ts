import './selector.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import {
    canvasParameters,
    formSelectorParameters,
    inputDurationParameters,
    labelDurationParameters,
    listParameters,
    selectorButtons,
    selectorPickedOption,
    selectorStartButtonParameters,
    titleParameters,
} from '../index/index-view-elements-parameters';
import ButtonCreator from '../../../util/button/button-creator';
import { ButtonNames } from '../../../../types';
import LabelCreator from '../../../util/label/label-creator';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import { generateSvg } from '../../../util/generate-svg';
import CanvasCreator from '../../../util/canvas/canvas-creator';

const CssClasses = {
    SELECTOR: 'selector',
};

export default class SelectorView extends View {
    public router: Router;
    private readonly canvas: CanvasCreator;

    constructor(router: Router) {
        const parameters = {
            tag: 'section',
            classNames: [CssClasses.SELECTOR],
        };
        super(parameters);
        this.router = router;
        this.canvas = new CanvasCreator(canvasParameters);
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

            if (buttonParameters.textContent === ButtonNames.SOUND_ON) {
                creatorButton.setCallback(this.toggleSound);
            }

            creatorForm.addInnerElement(creatorButton);
        });

        const creatorLabelDuration = new LabelCreator(labelDurationParameters);

        const svg = generateSvg();

        const creatorInput = new InputFieldCreator(inputDurationParameters);
        creatorInput.setValue(inputDurationParameters.value);

        creatorLabelDuration.addInnerElement(svg);
        creatorLabelDuration.addInnerElement(creatorInput);

        creatorForm.addInnerElement(creatorLabelDuration);

        const creatorStartButton = new ButtonCreator(selectorStartButtonParameters);
        creatorStartButton.setCallback(this.startDecisionWheel);
        creatorForm.addInnerElement(creatorStartButton);
    }

    private addPickedOption(): void {
        const pickedOption = new CreatorElement(selectorPickedOption);
        this.viewElementCreator.addInnerElement(pickedOption);
    }

    private addCanvas(): void {
        this.viewElementCreator.addInnerElement(this.canvas);
    }

    redirectToMainPage(event: Event): void {
        event.preventDefault();
        this.router.navigate('index');
    }

    toggleSound(event: Event): void {
        event.preventDefault();
        console.log('sound');
    }

    startDecisionWheel(event: Event): void {
        event.preventDefault();
        console.log('wheel');
    }
}
