type LineAttributes = {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    stroke: string;
};

type PathAttributes = {
    d: string;
    stroke: string;
};

type CircleAttributes = {
    cx: string;
    cy: string;
    r: string;
    stroke: string;
};

type PolylineAttributes = {
    points: string;
    stroke: string;
};

type ShapeAttributes = LineAttributes | PathAttributes | CircleAttributes | PolylineAttributes;

type ShapeElementType = 'line' | 'path' | 'circle' | 'polyline';

export type ShapeElement = {
    type: ShapeElementType;
    attrs: ShapeAttributes;
};

export type SvgElements = SVGLineElement | SVGPathElement | SVGCircleElement | SVGPolylineElement;

export type SvgElementsCollection = NodeListOf<SvgElements>;
