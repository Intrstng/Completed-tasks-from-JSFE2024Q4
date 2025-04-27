// import CreatorElement from '../creator-element';
// import type { CanvasParameters, DecisionItem } from '../../../types';
// import type LocalStorageState from '../../state/local-storage-state';
//
// export default class CreatorCanvas extends CreatorElement {
//     private colors: Array<string>;
//     private ctx: CanvasRenderingContext2D | null;
//     private dataList: Array<DecisionItem>;
//     private totalWeight: number | null;
//     private sectorAngle: number;
//     private startAngle: number;
//     private endAngle: number;
//     private centerX: number;
//     private centerY: number;
//     private radius: number;
//
//     constructor(parameters: CanvasParameters, appState: LocalStorageState) {
//         super(parameters);
//         this.dataList = CreatorCanvas.mixArrayValues(
//             appState.getState().list.filter(item => item.title && item.weight)
//         );
//         this.colors = [];
//         this.ctx = null;
//         this.totalWeight = 0;
//         this.sectorAngle = 0;
//         this.startAngle = 0;
//         this.endAngle = 0;
//         this.centerX = 0;
//         this.centerY = 0;
//         this.radius = 0;
//
//         this.createElement(parameters);
//         this.initCtxValues();
//         this.drawCanvas();
//         this.drawCenterCircle();
//         this.drawArrow();
//     }
//
//     private static mixArrayValues(array: Array<DecisionItem>): Array<DecisionItem> {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j: number = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     }
//
//     private static generateRandomColor(): string {
//         return `#${Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
//     }
//
//     public createElement(parameters: CanvasParameters): void {
//         this.element = document.createElement('canvas');
//
//         if (parameters.textContent) {
//             this.setTextContent(parameters.textContent);
//         }
//
//         if (parameters.classNames && parameters.classNames.length > 0) {
//             parameters.classNames.forEach(name => {
//                 if (this.element && 'classList' in this.element) {
//                     this.element.classList.add(name);
//                 }
//             });
//         }
//
//         if (parameters.width && parameters.height) {
//             this.setCanvasSize(parameters);
//         }
//     }
//
//     public drawCanvas(): void {
//         if (this.element instanceof HTMLCanvasElement) {
//             this.generateColorsCollection();
//             this.countTotalWeight();
//             this.drawSectors();
//         }
//     }
//
//     public setTextContent(text: string = ''): void {
//         if (this.element) {
//             this.element.textContent = text;
//         }
//     }
//
//     private initCtxValues(): void {
//         if (this.element instanceof HTMLCanvasElement) {
//             this.ctx = this.element.getContext('2d');
//             this.centerX = this.element.width / 2;
//             this.centerY = this.element.height / 2;
//             this.radius = Math.min(this.centerX, this.centerY) - 30;
//         }
//     }
//
//     private generateColorsCollection(): void {
//         while (this.colors.length < this.dataList.length) {
//             const color = CreatorCanvas.generateRandomColor();
//             if (!this.colors.includes(color)) {
//                 this.colors.push(color);
//             }
//         }
//     }
//
//     private countTotalWeight(): void {
//         this.totalWeight = this.dataList.reduce((sum, item) => {
//             const weight = Number.parseFloat(item.weight);
//             return Number.isNaN(weight) ? sum : sum + weight;
//         }, 0);
//     }
//
//     private countSectorAngles(weight: number): void {
//         if (this.totalWeight) {
//             this.sectorAngle = (weight / this.totalWeight) * 2 * Math.PI;
//             this.endAngle = this.startAngle + this.sectorAngle;
//         }
//     }
//
//     private drawSectors(): void {
//         this.dataList.forEach((item, index) => {
//             const weight = Number.parseFloat(item.weight);
//             if (Number.isNaN(weight)) {
//                 console.error(`Invalid weight for item ${item.id}: ${item.weight}`);
//                 return;
//             }
//
//             this.countSectorAngles(weight);
//
//             if (this.ctx instanceof CanvasRenderingContext2D) {
//                 /**
//                  * Sector
//                  */
//                 this.ctx.beginPath();
//                 this.ctx.moveTo(this.centerX, this.centerY);
//                 this.ctx.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle);
//                 this.ctx.closePath();
//                 this.ctx.fillStyle = this.colors[index];
//                 this.ctx.fill();
//                 /**
//                  * Sector outline
//                  */
//                 this.ctx.strokeStyle = '#fcedd8';
//                 this.ctx.lineWidth = 1;
//                 this.ctx.stroke();
//             }
//
//             /**
//              * Text
//              */
//             this.drawSectorText(item);
//
//             /**
//              * Update init angle for the next sector
//              */
//             this.startAngle = this.endAngle;
//         });
//     }
//
//     private drawSectorText(item: DecisionItem): void {
//         if (this.ctx instanceof CanvasRenderingContext2D) {
//             /**
//              * Text
//              */
//             this.ctx.save();
//             this.ctx.translate(this.centerX, this.centerY);
//             /**
//              * Rotate text to circle center
//              */
//             this.ctx.rotate(this.startAngle + this.sectorAngle / 2);
//             this.ctx.textAlign = 'right';
//             this.ctx.fillStyle = 'grey';
//             this.ctx.font = 'bold 20px Corbel sans-serif';
//
//             const maxLength: number = 15;
//             const displayText = item.title.length > maxLength ? item.title.slice(0, maxLength) + '...' : item.title;
//             /**
//              * Text outline
//              */
//             this.ctx.strokeStyle = '#fcedd8';
//             this.ctx.lineWidth = 2;
//             this.ctx.strokeText(displayText, this.radius - 20, 5);
//
//             this.ctx.fillText(displayText, this.radius - 20, 5);
//             this.ctx.restore();
//         }
//     }
//
//     private drawArrow(): void {
//         const arrowLength: number = 30;
//         const arrowheadWidth: number = 30;
//
//         if (this.ctx instanceof CanvasRenderingContext2D) {
//             this.ctx.strokeStyle = '#fcedd8';
//             this.ctx.strokeStyle = 'grey';
//             this.ctx.lineWidth = 3;
//             /**
//              * Start arrow coordinates
//              */
//             const arrowStartX = this.centerX;
//             const arrowStartY = this.centerY - this.radius - arrowLength + 25;
//             /**
//              * Arrow
//              */
//             this.ctx.beginPath();
//             this.ctx.moveTo(arrowStartX - arrowheadWidth / 2, arrowStartY - arrowLength);
//             this.ctx.lineTo(arrowStartX, arrowStartY - arrowLength + 45);
//             this.ctx.lineTo(arrowStartX + arrowheadWidth / 2, arrowStartY - arrowLength);
//             this.ctx.closePath();
//             this.ctx.fillStyle = '#fcedd8';
//             this.ctx.fill();
//             this.ctx.stroke();
//         }
//     }
//
//     private drawCenterCircle(): void {
//         const radius: number = 20;
//
//         if (this.ctx instanceof CanvasRenderingContext2D) {
//             this.ctx.fillStyle = CreatorCanvas.generateRandomColor();
//             /**
//              * Draw the cap at the center
//              */
//             this.ctx.beginPath();
//             this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI);
//             this.ctx.fill();
//
//             /**
//              * Cap outline
//              */
//             this.ctx.strokeStyle = '#fcedd8';
//             this.ctx.lineWidth = 1;
//             this.ctx.stroke();
//         }
//     }
//
//     private setCanvasSize(parameters: CanvasParameters): void {
//         if (this.element && 'setAttribute' in this.element) {
//             this.element.setAttribute('width', parameters.width);
//             this.element.setAttribute('height', parameters.height);
//         }
//     }
// }

import CreatorElement from '../creator-element';
import type { CanvasParameters, DecisionItem } from '../../../types';
import type LocalStorageState from '../../state/local-storage-state';
import type { EaseOutSineCB, GetPercentCB, RandomRangeCB } from './types';
import { easeOutSine, getPercent, randomRange } from './canvas-calculations/canvas-calculations';

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
    private speed: number = 0;
    private pause: boolean = true;
    private currentDeg: number = 0;
    private width: number = 0;
    private height: number = 0;
    private step: number;
    private easeOutSine: EaseOutSineCB = easeOutSine;
    private randomRange: RandomRangeCB = randomRange;
    private getPercent: GetPercentCB = getPercent;
    private maxRotation: number = this.randomRange(360 * 3, 360 * 6);

    constructor(parameters: CanvasParameters, appState: LocalStorageState) {
        super(parameters);

        this.dataList = CreatorCanvas.mixArrayValues(
            appState.getState().list.filter(item => item.title && item.weight)
        );

        this.step = 360 / this.dataList.length;

        this.createElement(parameters);
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
        if (this.element instanceof HTMLCanvasElement) {
            this.generateColorsCollection();
            this.countTotalWeight();
            this.drawSectors();
        }
    }

    public setTextContent(text: string = ''): void {
        if (this.element) {
            this.element.textContent = text;
        }
    }

    public spin(): void {
        if (this.speed !== 0) return;
        this.maxRotation = this.randomRange(360 * 3, 360 * 6);
        this.currentDeg = 0;
        this.pause = false;
        globalThis.requestAnimationFrame(this.animateSpinning.bind(this));
    }

    private drawWheel(): void {
        this.drawCanvas();
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
        this.totalWeight = this.dataList.reduce((sum, item) => {
            const weight = Number.parseFloat(item.weight);
            return Number.isNaN(weight) ? sum : sum + weight;
        }, 0);
    }

    private countSectorAngles(weight: number): void {
        if (this.totalWeight) {
            this.sectorAngle = (weight / this.totalWeight) * 2 * Math.PI;
            this.endAngle = this.startAngle + this.sectorAngle;
        }
    }

    private drawSectors(): void {
        this.dataList.forEach((item, index) => {
            const weight = Number.parseFloat(item.weight);
            if (Number.isNaN(weight)) {
                console.error(`Invalid weight for item ${item.id}: ${item.weight}`);
                return;
            }

            this.countSectorAngles(weight);

            if (this.ctx instanceof CanvasRenderingContext2D) {
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

            const maxLength: number = 15;
            const displayText = item.title.length > maxLength ? item.title.slice(0, maxLength) + '...' : item.title;
            this.ctx.strokeStyle = '#fcedd8';
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

    private animateSpinning(): void {
        if (this.pause) return;

        this.speed = this.easeOutSine(this.getPercent(this.currentDeg, this.maxRotation, 0)) * 20;
        if (this.speed < 0.01) {
            this.speed = 0;
            this.pause = true;
        }
        this.currentDeg += this.speed;

        this.ctx!.clearRect(0, 0, this.width, this.height);
        this.drawCanvas();
        this.drawCenterCircle();
        this.drawArrow();

        globalThis.requestAnimationFrame(this.animateSpinning.bind(this));
    }
}
