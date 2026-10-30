import type { DecisionItem } from '../../../types';

export type EaseOutSineCB = (x: number) => number;

export type RandomRangeCB = (min: number, max: number) => number;

export type GetPercentCB = (input: number, min: number, max: number) => number;

export type SpinUpdateCallback = (option: DecisionItem) => void;
export type SpinCompleteCallback = (option: DecisionItem) => void;
