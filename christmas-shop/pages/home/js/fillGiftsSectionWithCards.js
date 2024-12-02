import { CreateCard } from './createCard.js';
import { selectRandomItems } from './selectRandomItems.js';
import { RANDOM_CARDS_QUANTITY } from '../scripts.js';
import { shuffleArray } from './utils.js';

const generateCardsFromData = (cardsData, container) => {
    const cardItems = cardsData.map(card => new CreateCard(card).getCard()
    )
    const shuffledCardItems = shuffleArray(cardItems);
    container.innerHTML = '';
    container.append(...shuffledCardItems);
}

export const fillGiftsSectionWithCards = (data) => {
    const cardsContainer = document.querySelector('.cards');

    if (window.location.href.includes('/home/')) {
        const randomGiftData = selectRandomItems(data, RANDOM_CARDS_QUANTITY);
        generateCardsFromData(randomGiftData, cardsContainer);
    } else if (window.location.href.includes('/gifts/')) {
        generateCardsFromData(data, cardsContainer);
    }
}