import { Constants } from '../../../types';

export function getRandomCarName(data: Constants): string {
    const { brands, models } = data;
    const brandIndex: number = Math.floor(Math.random() * brands.length);
    const modelIndex: number = Math.floor(Math.random() * models.length);

    return `${brands[brandIndex]} ${models[modelIndex]}`;
}
