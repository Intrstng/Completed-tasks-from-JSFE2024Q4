import type { ShapeElement, SvgElements, SvgElementsCollection } from './types';

export class SvgManager {
    private svgStore: Record<string, SVGElement> = {};

    public static createSvg(elements: ShapeElement[], strokeColor: string, svgClass?: string): SVGElement {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');

        if (svgClass) {
            svg.setAttribute('class', `svg-icon svg-icon-${svgClass.toLowerCase()}`);
        }

        svg.setAttribute('viewBox', '0 0 32 32');
        svg.setAttribute('fill', 'none');

        const g = document.createElementNS(svgNS, 'g');
        g.setAttribute('id', 'raceCar');

        elements.forEach(item => {
            const element = document.createElementNS(svgNS, item.type);
            for (const [key, value] of Object.entries(item.attrs)) {
                element.setAttribute(key, key === 'stroke' ? strokeColor : value);
            }
            g.append(element);
        });

        svg.append(g);
        return svg;
    }

    public createAndStoreSvg(elements: ShapeElement[], strokeColor: string, id: string): SVGElement {
        const svg = SvgManager.createSvg(elements, strokeColor, id);
        this.svgStore[id] = svg;
        return svg;
    }

    public getSvgById(id: string): SVGElement | null {
        return this.svgStore[id] || null;
    }

    public removeSvg(id: string): void {
        delete this.svgStore[id];
    }

    public clearAllSvgs(): void {
        this.svgStore = {};
    }
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
