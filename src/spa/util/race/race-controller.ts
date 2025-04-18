import type SessionStorageState from '../../state/session-storage-state';
import type ApiController from '../../api/api-controller';
import type {
    AnimateCarRacingCB,
    AnimationFrame,
    AppState,
    Car,
    EngineData,
    RaceWinnerMessage,
    ResponseObject,
} from '../../../types';
import { AppStateKeys, Description } from '../../../types';
import {
    allGarageButtonsToggleDisable,
    carButtonToggleDisable,
    raceButtonToggleDisable,
    toggleDisabledAllCarButtons,
    toggleDisabledDragRaceControlButtons,
    toggleDisabledManageCarButtons,
    togglePaginationButtons,
} from '../button/button-disable-toggle';
import { changeSvgStrokeColor } from '../create-svg/create-svg';
import { COLORS } from '../../../constants/constants';
import { CSS_BUTTON } from '../button/button-classes';
import { CONSTANTS } from '../../state/initial-state';
import CreatorElement from '../creator-element';
import type { CarController } from '../car/car-controller';
import { PaginationController } from '../pagination/pagination-controller';
import CreatorDialog from '../dialog/dialog-creator';
import { getCarIconFromLayout } from '../create-svg/create-svg';
import { animateCarRacing } from './animate-car-racing';

export class RaceController {
    private readonly state: SessionStorageState;
    private api: ApiController;
    private carController: CarController | null;
    private paginationController: PaginationController | null;
    private readonly finishCreator: CreatorElement | null;
    private dialogContainer: CreatorElement | null;
    private readonly dialog: CreatorDialog | null;
    private readonly getCarIconFromLayout: (id: number) => HTMLElement | null;
    private animateCarRacing: AnimateCarRacingCB | null;

    constructor(
        state: SessionStorageState,
        api: ApiController,
        carController: CarController,
        paginationController: PaginationController,
        dialogContainer: CreatorElement,
        finish: CreatorElement,
        dialog: CreatorDialog
    ) {
        this.state = state;
        this.api = api;
        this.carController = carController;
        this.paginationController = paginationController;
        this.dialogContainer = dialogContainer;
        this.finishCreator = finish;
        this.dialog = dialog;
        this.getCarIconFromLayout = getCarIconFromLayout;
        this.animateCarRacing = animateCarRacing;
    }

    public getTrackDistance(car: HTMLElement): number {
        const carRect: DOMRect = car.getBoundingClientRect();
        let finishRect: DOMRect | null = null;
        if (this.finishCreator instanceof CreatorElement) {
            const element = this.finishCreator.getElement();
            if (element) {
                finishRect = element.getBoundingClientRect();
            } else {
                console.error('Element is null');
            }
        }

        const carCenterPoint = carRect.left + carRect.width / 2;
        let finishCenterPoint: number;

        if (finishRect) {
            finishCenterPoint = finishRect.left + finishRect.width / 2;
        }

        return finishCenterPoint - carCenterPoint;
    }

    public startRaceCar = async (id: number, isDragRace?: boolean): Promise<ResponseObject | undefined> => {
        toggleDisabledAllCarButtons(id, true);
        toggleDisabledDragRaceControlButtons(true);
        raceButtonToggleDisable(true);
        const carIcon: HTMLElement | null = this.getCarIconFromLayout(id);
        let trackDistance: number;

        if (carIcon) {
            trackDistance = this.getTrackDistance(carIcon);
        }

        const carEngineData: EngineData | undefined = await this.api.startEngine(id);
        if (!carEngineData) return;

        const { velocity, distance }: EngineData = carEngineData;
        const raceTime: number = Math.round(distance / velocity);

        const currentAnimation: AnimationFrame = this.animateCarRacing(id, carIcon, raceTime, trackDistance);

        const response = await this.api.driveCar(id);

        if (!response) return;

        const currentAnimationState = this.state.getState();
        const newAnimationState = {
            ...currentAnimationState,
            animation: [...currentAnimationState.animation, currentAnimation],
        };
        this.state.setState(newAnimationState);

        if (!response.success) {
            const currentAnimationID: number | null = currentAnimation.animationID;
            if (currentAnimationID) {
                changeSvgStrokeColor(String(id), COLORS.red);
                globalThis.cancelAnimationFrame(currentAnimationID);
                if (isDragRace) {
                    throw new Error('Car`s engine is broken...');
                }
            }
        }
        const carBackButtonID: string = `${CSS_BUTTON.BUTTON_BACK}-${id}`;
        carButtonToggleDisable(carBackButtonID, false);
        toggleDisabledDragRaceControlButtons(false);
        return {
            ...response,
            carID: id,
            time: raceTime,
        };
    };

    public startDragRace(): void {
        toggleDisabledManageCarButtons(true);
        raceButtonToggleDisable(true);
        togglePaginationButtons(true);

        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        const promises: Promise<ResponseObject>[] = allCars.map(car => this.startRaceCar(car.id, true));

        Promise.any(promises)
            .then(async (response: ResponseObject) => {
                if (response && response.carID !== undefined) {
                    const carID: number = response.carID;
                    const time: number = response.time;
                    const winnerResponse = await this.api.checkWinner(carID);

                    if (typeof winnerResponse === 'boolean' && !winnerResponse) {
                        const newApiWinner = { id: carID, wins: 1, time };
                        await this.api.createWinner(newApiWinner);
                    } else if (winnerResponse !== true && typeof winnerResponse !== 'boolean') {
                        let bestTime: number;
                        if (winnerResponse) {
                            bestTime = Math.min(time, winnerResponse.time);
                            await this.api.updateWinner({ time: bestTime, wins: winnerResponse.wins + 1 }, carID);
                        }
                    }
                } else {
                    console.warn('Response does not contain carID:', response);
                }
                const currentWinnerData: RaceWinnerMessage = {
                    carID: response.carID,
                    time: String(response.time / CONSTANTS.milliseconds),
                };
                this.showWinnersMessage(currentWinnerData);
                allGarageButtonsToggleDisable(false);
                if (this.paginationController instanceof PaginationController) {
                    this.paginationController.toggleDisabledForPaginationButtons();
                }
                raceButtonToggleDisable(true);
            })
            .catch(error => {
                if (error instanceof AggregateError) {
                    console.error('All promises were rejected:', error.errors);
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            });
    }

    public async resetDragRace(): Promise<void> {
        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        const promises = allCars.map(car => this.backFromRaceForCar(car.id));
        await Promise.all(promises);
    }

    public backFromRaceForCar = async (id: number): Promise<void> => {
        try {
            toggleDisabledAllCarButtons(id, false);
            toggleDisabledDragRaceControlButtons(false);
            raceButtonToggleDisable(false);
            const currentCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === id);
            const currentState: AppState = this.state.getState();
            let carAnimationCollection: Array<AnimationFrame> = currentState[AppStateKeys.ANIMATION];
            const currentAnimationID = carAnimationCollection.find(animation => animation.carID === id);

            if (currentAnimationID) {
                if (typeof currentAnimationID.animationID === 'number') {
                    globalThis.cancelAnimationFrame(currentAnimationID.animationID);
                }
                carAnimationCollection = carAnimationCollection.filter(animation => animation.carID !== id);
                const updatedState: AppState = {
                    ...currentState,
                    animation: carAnimationCollection,
                };
                this.state.setState(updatedState);
            }
            await this.api.stopEngine(id);
            if (currentCar) {
                const currentCarColor = currentCar.color;
                changeSvgStrokeColor(String(id), currentCarColor);
            }
            const car: HTMLElement | null = this.getCarIconFromLayout(id);
            if ('style' in car) {
                car.style.transform = `translateX(0px)`;
            }
        } catch (error: unknown) {
            console.error('Error occurred:', error instanceof Error ? error.message : JSON.stringify(error));
        }
    };

    private showWinnersMessage(data: RaceWinnerMessage): void {
        const winnersCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === data.carID);
        const winnersName = winnersCar.name || Description.WINNER;

        if (this.dialog instanceof CreatorDialog) {
            this.dialog.setDialogNameField(winnersName);
            this.dialog.setDialogTimeField(String(data.time));
            this.dialog.showDialog();
            this.dialog.closeDialogByTimeout(CONSTANTS.dialogDelay);
        }
    }
}
