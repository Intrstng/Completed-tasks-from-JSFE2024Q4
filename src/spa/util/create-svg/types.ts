interface SvgElementAttributes {
    class: string;
    d: string;
    fill: string;
}

interface SvgElement {
    type: 'path' | 'circle' | 'rect' | 'line' | 'polygon' | 'polyline';
    attrs: SvgElementAttributes;
}