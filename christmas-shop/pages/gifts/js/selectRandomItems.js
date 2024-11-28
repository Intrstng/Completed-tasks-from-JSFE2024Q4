import { randomInteger } from './util.js';
import { getDataByLink } from '../scripts';

export const selectRandomItems = async () => {
    const data = await getDataByLink('./js/gifts.json');
    const result = [];

    if (data) {
        const filteredData = [...data];
        const itemsToSelect = Math.min(4, filteredData.length);

        for (let i = 0; i < itemsToSelect; i++) {
            const randomIdx = randomInteger(0, filteredData.length - 1);
            result.push(filteredData[randomIdx]);
            filteredData.splice(randomIdx, 1);
        }
        return result;
    }
};

selectRandomItems().then(selectedItems => {
    console.log(selectedItems);
});