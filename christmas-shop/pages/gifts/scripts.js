import { Burger } from '../home/js/burgerMenu.js';
import { ScrollToTop } from './js/scrollToTop.js';
import { categorySwitcher } from './js/categorySwitcher.js';


const burger = new Burger();
burger.toggleBurgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTop();
});





// const path = require('path');
// const fs = require('fs').promises;
//
// const getDataFromFile = async (folder, fileName) => {
//     try {
//         const filePath = path.join(process.cwd(), folder, fileName);
//         const jsonData = await fs.readFile(filePath, 'utf-8');
//         return JSON.parse(jsonData);
//     } catch (error) {
//         console.error('Error reading data:', error);
//     }
// }
//
// getDataFromFile('js', 'gifts.json').then(data => {
//     if (data) {
//         console.log(data);
//     }
// });


export const getDataByLink = async (link) => {
    try {
        const res = await fetch(link);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

// const result = [];
// getDataByLink('./js/gifts.json').then(data => {
//     if (data) {
//         const filteredData = [...data];
//         for (let i = 1; i <= 4; i++) {
//             const randomIdx = randomInteger(1, filteredData.length);
//             result.push(randomIdx);
//             filteredData.splice(randomIdx, 1);
//         }
//     } else {
//         return [0, 1, 2, 3];
//     }
// });
// console.log(result);

getDataByLink('./js/gifts.json').then(data => categorySwitcher(data));
