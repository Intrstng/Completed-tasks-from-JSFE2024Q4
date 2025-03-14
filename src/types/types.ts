export type LocalStorageItem = {
    [key: string]: any;
};

export type AppState = {
    isTurning: boolean;
    mute: boolean;
    list: [{ id: string; title: string; weight: string }];
    lastId: string;
};
