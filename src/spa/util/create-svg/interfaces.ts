import type { ShapeAttributes, ShapeElementType } from './types';

export interface LineAttributes {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    stroke: string;
}

export interface PathAttributes {
    d: string;
    stroke: string;
}

export interface CircleAttributes {
    cx: string;
    cy: string;
    r: string;
    stroke: string;
}

export interface PolylineAttributes {
    points: string;
    stroke: string;
}

export interface ShapeElement {
    type: ShapeElementType;
    attrs: ShapeAttributes;
}
