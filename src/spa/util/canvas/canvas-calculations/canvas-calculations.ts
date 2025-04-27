export function easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
}

export function randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPercent(input: number, min: number, max: number): number {
    return ((input - min) * 100) / (max - min) / 100;
}
