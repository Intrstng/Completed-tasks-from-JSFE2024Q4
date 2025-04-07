import { CarPayload } from '../../../types';
import { CONSTANTS } from '../../state/initial-state';
import { getRandomCarName } from './generate-random-car-name';
import { generateRandomColor } from './generate-random-color';

export function generateCarsCollection(): Array<CarPayload> {
    return Array.from({ length: CONSTANTS.carsToGenerate }, () => ({
        name: getRandomCarName(CONSTANTS),
        color: generateRandomColor(),
    }));
}
