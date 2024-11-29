import { CreateCard } from './createCard.js';
import { selectRandomItems } from './selectRandomItems.js';
import { RANDOM_CARDS_QUANTITY } from '../scripts.js';

const generateCardsFromData = (cardsData, container) => {
    const cardItems = cardsData.map(card => new CreateCard({
            name: card.name,
            category: card.category,
        }).getCard()
    )
    container.innerHTML = '';
    container.append(...cardItems);
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