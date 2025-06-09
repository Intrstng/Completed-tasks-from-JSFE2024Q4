import type { CircleAttributes, LineAttributes, PathAttributes, PolylineAttributes } from './interfaces';

export type ShapeAttributes = LineAttributes | PathAttributes | CircleAttributes | PolylineAttributes;

export type ShapeElementType = 'line' | 'path' | 'circle' | 'polyline';

export type SvgElements = SVGLineElement | SVGPathElement | SVGCircleElement | SVGPolylineElement;

export type SvgElementsCollection = NodeListOf<SvgElements>;
