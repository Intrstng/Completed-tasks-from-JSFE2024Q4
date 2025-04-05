type LineAttrs = {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    stroke: string;
};

type PathAttrs = {
    d: string;
    stroke: string;
};

type CircleAttrs = {
    cx: string;
    cy: string;
    r: string;
    stroke: string;
};

type PolylineAttrs = {
    points: string;
    stroke: string;
};

type ShapeAttrs = LineAttrs | PathAttrs | CircleAttrs | PolylineAttrs;

type ShapeElementType = 'line' | 'path' | 'circle' | 'polyline';

export type ShapeElement = {
    type: ShapeElementType;
    attrs: ShapeAttrs;
};

export type SvgElements = SVGLineElement | SVGPathElement | SVGCircleElement | SVGPolylineElement;

export type SvgElementsCollection = NodeListOf<SvgElements>;
