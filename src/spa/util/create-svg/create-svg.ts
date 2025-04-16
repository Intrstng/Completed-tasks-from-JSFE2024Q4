import { CSS_GARAGE } from '../../view/main/garage/garage-classes';
import type { ShapeElement, SvgElements, SvgElementsCollection } from './types';

export function createSvg(elements: Array<ShapeElement>, strokeColor: string, id?: string): SVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    if (id != null) {
        svg.setAttribute('class', `svg-icon svg-icon-${id.toLowerCase()}`);
    }
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
        g.append(element);
    });

    svg.append(g);

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

export function getCarIconFromLayout(id: number): HTMLElement | null {
    const carIconCollection: NodeListOf<Element> = document.querySelectorAll(`.${CSS_GARAGE.SVG_ICON}-${id}`);
    let carIcon: HTMLElement | null = null;
    if (carIconCollection.length > 0) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        carIcon = carIconCollection[0] as HTMLElement;
    }
    return carIcon;
}
