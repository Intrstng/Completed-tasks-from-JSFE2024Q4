import type { Car, TableRecord, Winner } from '../../../types';
import { CONSTANTS } from '../../state/initial-state';
import { COLORS } from '../../../constants/constants';

export function createTableRecords(cars: Array<Car>, winners: Array<Winner>): Array<TableRecord> {
    return winners.map(winner => {
        const car = cars.find(car => car && car.id === winner.id);
        return car
            ? {
                  wins: winner.wins,
                  time: winner.time / CONSTANTS.milliseconds,
                  name: car ? car.name : 'Unknown winners name',
                  color: car ? car.color : COLORS.black,
              }
            : {
                  wins: 0,
                  time: 0,
                  name: '',
                  color: '',
              };
    });
}
