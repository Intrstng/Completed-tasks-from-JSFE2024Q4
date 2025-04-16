import SessionStorageState from '../../state/session-storage-state';
import ApiController from '../../api/api-controller';
import {
    AnimationFrame,
    AppState,
    AppStateKeys,
    Car,
    Description,
    EngineData,
    RaceWinnerMessage,
    ResponseObject,
} from '../../../types';
import {
    allGarageButtonsToggleDisable,
    carButtonToggleDisable,
    raceButtonToggleDisable,
    toggleDisabledAllCarButtons,
    toggleDisabledDragRaceControlButtons,
    toggleDisabledManageCarButtons,
    togglePaginationButtons,
} from '../button/button-disable-toggle';
import { changeSvgStrokeColor } from '../createSvg/createSvg';
import { COLORS } from '../../../constants/constants';
import { CSS_BUTTON } from '../button/button-classes';
import { CONSTANTS } from '../../state/initial-state';
import CreatorElement from '../creator-element';
import { CarController } from '../car/car-controller';
import { PaginationController } from '../pagination/pagination-controller';
import CreatorDialog from '../dialog/dialog-creator';
import { dialogContentParameters, dialogParameters } from '../dialog/dialog-view-parameters';

export class RaceController {
    private readonly state: SessionStorageState;
    private api: ApiController;
    private carController: CarController | null;
    private paginationController: PaginationController | null;
    private finishCreator: CreatorElement | null;
    private dialogContainer: CreatorElement | null;
    private dialog: CreatorDialog | null;

    constructor(
        state: SessionStorageState,
        api: ApiController,
        carController: CarController,
        paginationController: PaginationController,
        dialogContainer: CreatorElement,
        finish: CreatorElement
    ) {
        this.state = state;
        this.api = api;
        this.carController = carController;
        this.paginationController = paginationController;
        this.dialogContainer = dialogContainer;
        this.finishCreator = finish;

        this.dialog = new CreatorDialog(dialogParameters, dialogContentParameters);
    }

    public addDialog(): void {
        this.dialogContainer.addInnerElement(this.dialog.getElement());
    }

    public getTrackDistance(car: HTMLElement): number {
        const carRect = car.getBoundingClientRect();
        const finishRect = this.finishCreator.getElement().getBoundingClientRect();

        const carCenterPoint = carRect.left + carRect.width / 2;
        const finishCenterPoint = finishRect.left + finishRect.width / 2;

        return finishCenterPoint - carCenterPoint;
    }

    public startRaceCar = async (id: number, isDragRace?: boolean): Promise<ResponseObject | undefined> => {
        toggleDisabledAllCarButtons(id, true);
        toggleDisabledDragRaceControlButtons(true);
        raceButtonToggleDisable(true);
        let carIcon: HTMLElement = this.carController.getCarIconFromLayout(id);
        const trackDistance: number = this.getTrackDistance(carIcon);

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
            const currentAnimationID: number = currentAnimation.animationID;
            if (currentAnimationID) {
                changeSvgStrokeColor(String(id), COLORS.red);
                window.cancelAnimationFrame(currentAnimationID);
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

    public async startDragRace(): Promise<void> {
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
                    } else if (winnerResponse !== true) {
                        if (typeof winnerResponse !== 'boolean') {
                            const bestTime = time < winnerResponse.time ? time : winnerResponse.time;
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
                this.paginationController.toggleDisabledForPaginationButtons();
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

    public resetDragRace(): void {
        const allCars: Array<Car> = this.state.getState()[AppStateKeys.CARS];
        allCars.forEach(car => this.backFromRaceForCar(car.id));
    }

    public async backFromRaceForCar(id: number): Promise<void> {
        try {
            toggleDisabledAllCarButtons(id, false);
            toggleDisabledDragRaceControlButtons(false);
            raceButtonToggleDisable(false);
            const currentCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === id);
            const currentState: AppState = this.state.getState();
            let carAnimationCollection: Array<AnimationFrame> = currentState[AppStateKeys.ANIMATION];
            const currentAnimationID = carAnimationCollection.find(animation => animation.carID === id);

            if (currentAnimationID) {
                window.cancelAnimationFrame(currentAnimationID.animationID);
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
            const car = this.carController.getCarIconFromLayout(id);
            car.style.transform = `translateX(0px)`;
        } catch (error: unknown) {
            console.error('Error occurred:', error instanceof Error ? error.message : String(error));
        }
    }

    private showWinnersMessage(data: RaceWinnerMessage): void {
        const winnersCar: Car = this.state.getState()[AppStateKeys.CARS].find(car => car.id === data.carID);
        const winnersName = winnersCar.name || Description.WINNER;

        this.dialog.setDialogNameField(winnersName);
        this.dialog.setDialogTimeField(String(data.time));
        this.dialog.showDialog();
        this.dialog.closeDialogByTimeout(CONSTANTS.dialogDelay);
    }

    private animateCarRacing(carID: number, car: HTMLElement, duration: number, trackDistance: number): AnimationFrame {
        let start: number | null = null;
        const animationDataCollection: AnimationFrame = { carID, animationID: null, distance: 0 };

        const animate = (timestamp: number) => {
            if (!start) {
                start = timestamp;
            }

            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
            const left = trackDistance * progress; // The position based on progress

            car.style.transform = `translateX(${left}px)`;
            animationDataCollection.distance = Math.round(left);

            if (progress < 1) {
                animationDataCollection.animationID = window.requestAnimationFrame(animate);
            }
        };

        animationDataCollection.animationID = window.requestAnimationFrame(animate);
        return animationDataCollection;
    }
}
