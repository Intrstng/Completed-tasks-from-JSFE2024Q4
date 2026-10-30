import CreatorElement from '../creator-element';
import type { CanvasParameters, DecisionItem } from '../../../types';
import type LocalStorageState from '../../state/local-storage-state';
import type { EaseOutSineCB, RandomRangeCB, SpinCompleteCallback, SpinUpdateCallback } from './types';
import { easeOutSine, randomRange } from './canvas-calculations/canvas-calculations';

const RADIX: number = 16;
const COLORS_QUANTITY: number = 6;

export default class CreatorCanvas extends CreatorElement {
    private readonly colors: Array<string> = [];
    private ctx: CanvasRenderingContext2D | null = null;
    private readonly dataList: Array<DecisionItem>;
    private totalWeight: number = 0;
    private sectorAngle: number = 0;
    private startAngle: number = 0;
    private endAngle: number = 0;
    private centerX: number = 0;
    private centerY: number = 0;
    private radius: number = 0;
    private width: number = 0;
    private height: number = 0;
    private rotation: number = 0;
    private startRotation: number = 0;
    private targetRotation: number = 0;
    private currentSelectedId: string | null = null;
    private animationStartTime: number | null = null;
    private animationDuration: number = 0;
    private animationFrameId: number | null = null;
    private isSpinning: boolean = false;
    private onSpinUpdate: SpinUpdateCallback | null = null;
    private onSpinComplete: SpinCompleteCallback | null = null;
    private easeOutSine: EaseOutSineCB = easeOutSine;
    private randomRange: RandomRangeCB = randomRange;

    constructor(parameters: CanvasParameters, appState: LocalStorageState) {
        super(parameters);

        this.dataList = CreatorCanvas.mixArrayValues(
            appState.getList().filter(item => {
                const weight = Number(item.weight);

                return item.title.trim().length > 0 && Number.isFinite(weight) && weight > 0;
            })
        );

        this.initCtxValues();
        this.drawWheel();
    }

    private static mixArrayValues(array: Array<DecisionItem>): Array<DecisionItem> {
        for (let i = array.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private static generateRandomColor(): string {
        return `#${Array.from({ length: COLORS_QUANTITY }, () => Math.floor(Math.random() * RADIX).toString(RADIX)).join('')}`;
    }

    public createElement(parameters: CanvasParameters): void {
        this.element = document.createElement('canvas');

        if (parameters.textContent) {
            this.setTextContent(parameters.textContent);
        }

        if (parameters.classNames && parameters.classNames.length > 0) {
            parameters.classNames.forEach(name => {
                if (this.element && 'classList' in this.element) {
                    this.element.classList.add(name);
                }
            });
        }

        if (parameters.width && parameters.height) {
            this.setCanvasSize(parameters);
        }
    }

    public drawCanvas(): void {
        if (!(this.element instanceof HTMLCanvasElement)) return;

        this.generateColorsCollection();
        this.countTotalWeight();
        this.drawSectors();
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    public spin(duration: number, onUpdate: SpinUpdateCallback, onComplete: SpinCompleteCallback): boolean {
        if (
            this.isSpinning ||
            this.dataList.length < 2 ||
            !Number.isInteger(duration) ||
            duration < 5 ||
            duration > 30
        ) {
            return false;
        }

        this.isSpinning = true;
        this.currentSelectedId = null;
        this.startRotation = this.rotation;
        this.animationDuration = duration * 1000;
        this.animationStartTime = null;
        this.onSpinUpdate = onUpdate;
        this.onSpinComplete = onComplete;

        const fullRotations = this.randomRange(5, 8);
        const randomAngle = this.randomRange(0, 359);

        this.targetRotation = this.startRotation + fullRotations * 360 + randomAngle;

        this.animationFrameId = requestAnimationFrame(this.animate);

        return true;
    }

    private animate = (timestamp: number): void => {
        if (!this.isSpinning) return;

        if (this.animationStartTime === null) {
            this.animationStartTime = timestamp;
        }

        const elapsed = timestamp - this.animationStartTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);
        const easedProgress = this.easeOutSine(progress);

        this.rotation = this.startRotation + (this.targetRotation - this.startRotation) * easedProgress;

        this.drawWheel();

        const selectedOption = this.getSelectedOption();

        if (selectedOption && selectedOption.id !== this.currentSelectedId) {
            this.currentSelectedId = selectedOption.id;
            this.onSpinUpdate?.(selectedOption);
        }

        if (progress < 1) {
            this.animationFrameId = requestAnimationFrame(this.animate);
            return;
        }

        this.isSpinning = false;
        this.animationFrameId = null;

        const winner = this.getSelectedOption();

        if (winner) {
            this.onSpinComplete?.(winner);
        }

        this.onSpinUpdate = null;
        this.onSpinComplete = null;
    };

    private getSelectedOption(): DecisionItem | undefined {
        const pointerAngle = (((270 - this.rotation) % 360) + 360) % 360;

        let currentAngle = 0;

        for (const item of this.dataList) {
            const weight = Number(item.weight);

            const angle = (weight / this.totalWeight) * 360;

            if (pointerAngle >= currentAngle && pointerAngle < currentAngle + angle) {
                return item;
            }

            currentAngle += angle;
        }

        return this.dataList[0];
    }

    private drawWheel(): void {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.save();

        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate((this.rotation * Math.PI) / 180);
        this.ctx.translate(-this.centerX, -this.centerY);

        this.drawCanvas();

        this.ctx.restore();

        this.drawCenterCircle();
        this.drawArrow();
    }

    private initCtxValues(): void {
        if (this.element instanceof HTMLCanvasElement) {
            this.ctx = this.element.getContext('2d');
            this.width = this.element.width;
            this.height = this.element.height;
            this.centerX = this.element.width / 2;
            this.centerY = this.element.height / 2;
            this.radius = Math.min(this.centerX, this.centerY) - 30;
        }
    }

    private generateColorsCollection(): void {
        while (this.colors.length < this.dataList.length) {
            const color = CreatorCanvas.generateRandomColor();
            if (!this.colors.includes(color)) {
                this.colors.push(color);
            }
        }
    }

    private countTotalWeight(): void {
        this.totalWeight = this.dataList.reduce((sum, item) => sum + Number(item.weight), 0);
    }

    private drawSectors(): void {
        if (!this.totalWeight || this.dataList.length < 2) return;

        this.startAngle = 0;

        this.dataList.forEach((item, index) => {
            const weight = Number(item.weight);

            this.sectorAngle = (weight / this.totalWeight) * Math.PI * 2;

            this.endAngle = this.startAngle + this.sectorAngle;

            if (this.ctx) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.centerX, this.centerY);
                this.ctx.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle);
                this.ctx.closePath();

                this.ctx.fillStyle = this.colors[index];
                this.ctx.fill();

                this.ctx.strokeStyle = '#fcedd8';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }

            this.drawSectorText(item);

            this.startAngle = this.endAngle;
        });
    }

    private drawSectorText(item: DecisionItem): void {
        if (this.ctx instanceof CanvasRenderingContext2D) {
            this.ctx.save();
            this.ctx.translate(this.centerX, this.centerY);
            this.ctx.rotate(this.startAngle + this.sectorAngle / 2);
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = 'grey';
            this.ctx.font = 'bold 20px Corbel sans-serif';

            const maxWidth = this.radius - 45;
            const maxLength = 15;

            let displayText = item.title.slice(0, maxLength);

            while (displayText.length > 0 && this.ctx.measureText(`${displayText}...`).width > maxWidth) {
                displayText = displayText.slice(0, -1);
            }

            if (displayText.length < item.title.length) {
                displayText = `${displayText}...`;
            }

            this.ctx.strokeStyle = '#fcedd8';
            this.ctx.fillStyle = '#000';
            this.ctx.lineWidth = 2;
            this.ctx.strokeText(displayText, this.radius - 20, 5);
            this.ctx.fillText(displayText, this.radius - 20, 5);
            this.ctx.restore();
        }
    }

    private drawArrow(): void {
        const arrowLength: number = 30;
        const arrowheadWidth: number = 30;

        if (this.ctx instanceof CanvasRenderingContext2D) {
            this.ctx.strokeStyle = '#fcedd8';
            this.ctx.lineWidth = 3;

            const arrowStartX = this.centerX;
            const arrowStartY = this.centerY - this.radius - arrowLength + 25;

            this.ctx.beginPath();
            this.ctx.moveTo(arrowStartX - arrowheadWidth / 2, arrowStartY - arrowLength);
            this.ctx.lineTo(arrowStartX, arrowStartY - arrowLength + 45);
            this.ctx.lineTo(arrowStartX + arrowheadWidth / 2, arrowStartY - arrowLength);
            this.ctx.closePath();
            this.ctx.fillStyle = '#fcedd8';
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    private drawCenterCircle(): void {
        const radius: number = 20;

        if (this.ctx instanceof CanvasRenderingContext2D) {
            this.ctx.fillStyle = '#fcedd8';
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.strokeStyle = 'grey';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    private setCanvasSize(parameters: CanvasParameters): void {
        if (this.element && 'setAttribute' in this.element) {
            this.element.setAttribute('width', parameters.width);
            this.element.setAttribute('height', parameters.height);
        }
    }
}
