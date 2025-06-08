import type { AppStateKeys, Description } from './enums';
import type { Car, RaceWinner } from './types';

export type Winner = {
    id: number;
    wins: number;
    time: number;
};

export type TableRecord = {
    wins: number;
    time: number;
    name: string;
    color: string;
};

export type Input = {
    createName: string;
    createColor: string;
    updateName: string;
    updateColor: string;
};

export type Buttons = {
    start: boolean;
    reset: boolean;
};

export type Animation = {
    id: number | null;
    distance: number;
};

export type AnimationFrame = {
    carID: number;
    animationID: number | null;
    distance: number;
};

export type EngineData = {
    velocity: number;
    distance: number;
};

export type DriveData = {
    success: boolean;
};

export type AppState = {
    [AppStateKeys.CARS]: Car[];
    [AppStateKeys.WINNERS]: Winner[];
    [AppStateKeys.ANIMATION]: AnimationFrame[];
    [AppStateKeys.WINNERS_DATA]: Car[];
    [AppStateKeys.SELECTED_CAR]: Car;
    [AppStateKeys.CARS_QUANTITY]: number;
    [AppStateKeys.WINNERS_QUANTITY]: number;
    [AppStateKeys.MAIN_PAGE]: string;
    [AppStateKeys.GARAGE_PAGE]: number;
    [AppStateKeys.WINNERS_PAGE]: number;
    [AppStateKeys.ORDER_WINS]: Description.ASC | Description.DESC;
    [AppStateKeys.ORDER_TIME]: Description.ASC | Description.DESC;
    [AppStateKeys.SORT_TYPE]: Description.SORT_WINS | Description.SORT_TIME;
    [AppStateKeys.WINNER]: Array<RaceWinner>;
    [AppStateKeys.WINS_SORT_ACTIVE]: boolean;
    [AppStateKeys.TIME_SORT_ACTIVE]: boolean;
    [AppStateKeys.IS_UPDATE_ACTIVE]: boolean;
    [AppStateKeys.INPUT_DATA]: Input;
    [AppStateKeys.BUTTONS_STATE]: Buttons;
};

export type Constants = {
    baseURL: string;
    carsOnPage: number;
    winnersOnPage: number;
    carsToGenerate: number;
    brands: Array<string>;
    models: Array<string>;
    dialogDelay: number;
    resetRaceDelay: number;
    milliseconds: number;
    brandType: string;
};

export type QueryParameters = {
    key: string;
    value: number | string;
};

export type CarPayload = {
    name: string;
    color: string;
};
