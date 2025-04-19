import { ElementParameters } from '../../../types';
import CreatorElement from '../creator-element';

export function createSvg(elements: any, fillColor: string, viewBox: string, id?: string): SVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    if (id != null) {
        svg.setAttribute('class', `svg-icon svg-icon-${id.toLowerCase()}`);
    }
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('style', `enable-background:new ${viewBox}`);
    svg.setAttribute('fill', 'none');

    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('id', 'mainGroup');

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

export function generateLogoLink(parameters: ElementParameters, svgElements: SvgElement[], container: CreatorElement, link: string, color: string, viewBox: string, id: string): void {
    const creatorLink = new CreatorElement(parameters);
    creatorLink.getElement().setAttribute('href', link);
    creatorLink.getElement().setAttribute('target', '_blank');
    const svgLogo = createSvg(svgElements, color, viewBox, id);
    creatorLink.addInnerElement(svgLogo);
    container.addInnerElement(creatorLink);
}
