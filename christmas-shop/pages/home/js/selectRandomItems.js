import { randomInteger } from './utils.js';

export const selectRandomItems = (data, quantity) => {
    const result = [];

    if (data) {
        const filteredData = [...data];
        const itemsToSelect = Math.min(quantity, filteredData.length);

        for (let i = 0; i < itemsToSelect; i++) {
            const randomIdx = randomInteger(0, filteredData.length - 1);
            result.push(filteredData[randomIdx]);
            filteredData.splice(randomIdx, 1);
        }
        return result;
    }
};