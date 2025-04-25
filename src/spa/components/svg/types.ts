import type { ElementParameters } from '../../../types';
import type CreatorElement from '../creator-element';

type SvgElementAttributes = {
    class: string;
    d: string;
    fill: string;
};

export type SvgElement = {
    type: 'path' | 'circle' | 'rect' | 'line' | 'polygon' | 'polyline';
    attrs: SvgElementAttributes;
};

export type GenerateLogoLink = (
    parameters: ElementParameters,
    svgElements: SvgElement[],
    container: CreatorElement,
    link: string,
    color: string,
    viewBox: string,
    id: string
) => void;
