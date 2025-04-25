import type { ElementParameters } from '../../../types';
import CreatorElement from '../../components/creator-element';
import type { SvgElement } from './types';
import { Attributes, SVG_Attributes } from '../../../types';

export function createSvg(elements: SvgElement[], fillColor: string, viewBox: string, id?: string): SVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, SVG_Attributes.SVG);
    if (id != null) {
        svg.setAttribute(SVG_Attributes.CLASS, `svg-icon svg-icon-${id.toLowerCase()}`);
    }
    svg.setAttribute(SVG_Attributes.VIEW_BOX, viewBox);
    svg.setAttribute(SVG_Attributes.STYLE, `enable-background:new ${viewBox}`);
    svg.setAttribute(SVG_Attributes.FILL, SVG_Attributes.NONE);

    const g = document.createElementNS(svgNS, SVG_Attributes.G);
    g.setAttribute(SVG_Attributes.ID, SVG_Attributes.MAIN_GROUP);

    elements.forEach(item => {
        const element = document.createElementNS(svgNS, item.type);
        for (const [key, value] of Object.entries(item.attrs)) {
            if (key === 'fill') {
                element.setAttribute(key, fillColor);
            } else {
                element.setAttribute(key, value);
            }
        }
        g.append(element);
    });

    svg.append(g);

    return svg;
}

export function generateLogoLink(
    parameters: ElementParameters,
    svgElements: SvgElement[],
    container: CreatorElement,
    link: string,
    color: string,
    viewBox: string,
    id: string
): void {
    const creatorLink = new CreatorElement(parameters);
    const linkElement: HTMLElement | HTMLCanvasElement | null = creatorLink.getElement();

    if (linkElement && linkElement instanceof HTMLElement) {
        linkElement.setAttribute(Attributes.HREF, link);
        linkElement.setAttribute(Attributes.TARGET, Attributes.BLANK);
    }

    const svgLogo = createSvg(svgElements, color, viewBox, id);
    creatorLink.addInnerElement(svgLogo);
    container.addInnerElement(creatorLink);
}
