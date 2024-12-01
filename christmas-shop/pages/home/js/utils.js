export const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getPathToCardsData = () => window.location.href.includes('/gifts/') ? '../home/js' : './js';

