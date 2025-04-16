import type { AnimationFrame } from '../../../types';

export function animateCarRacing(
    carID: number,
    car: HTMLElement,
    duration: number,
    trackDistance: number
): AnimationFrame {
    let start: number | null = null;
    const animationDataCollection: AnimationFrame = { carID, animationID: null, distance: 0 };

    const animate = (timestamp: number): void => {
        if (!start) {
            start = timestamp;
        }

        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
        const left = trackDistance * progress; // The position based on progress

        car.style.transform = `translateX(${left}px)`;
        animationDataCollection.distance = Math.round(left);

        if (progress < 1) {
            animationDataCollection.animationID = globalThis.requestAnimationFrame(animate);
        }
    };

    animationDataCollection.animationID = globalThis.requestAnimationFrame(animate);
    return animationDataCollection;
}
