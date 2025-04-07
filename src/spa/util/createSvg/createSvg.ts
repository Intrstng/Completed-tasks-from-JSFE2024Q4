import { ShapeElement, SvgElements, SvgElementsCollection } from './types';

export function createSVG(elements: Array<ShapeElement>, strokeColor: string, id?: string): SVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', `svg-icon svg-icon-${id.toLowerCase()}`);
    svg.setAttribute('viewBox', '0 0 32 32');
    svg.setAttribute('fill', 'none');

    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('id', 'raceCar');

    elements.forEach(item => {
        const element = document.createElementNS(svgNS, item.type);
        for (const [key, value] of Object.entries(item.attrs)) {
            if (key === 'stroke') {
                element.setAttribute(key, strokeColor);
            } else {
                element.setAttribute(key, value);
            }
        }
        g.appendChild(element);
    });

    svg.appendChild(g);

    return svg;
}

export function changeSvgStrokeColor(id: string, color: string): void {
    const svgID = id.toLowerCase();
    const svgLines: SvgElementsCollection = document.querySelectorAll<SvgElements>(
        `.svg-icon-${svgID} line, .svg-icon-${svgID} path, .svg-icon-${svgID} circle, .svg-icon-${svgID} polyline`
    );
    svgLines.forEach(line => {
        line.setAttribute('stroke', color);
    });
}
