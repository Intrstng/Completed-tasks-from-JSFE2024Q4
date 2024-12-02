import { Burger } from './js/burgerMenu.js';
import { countdown } from './js/countdown.js';
import { AppController } from './js/appController.js';
import { ScrollToTop } from './js/scrollToTop.js';
import { getPathToCardsData } from './js/utils.js';
import { modalWindowInitialization } from './js/modalWindow/init.js';
import { slider } from './js/slider.js';

export const PATH_TO_FILE = `${getPathToCardsData()}/gifts.json`;
export const RANDOM_CARDS_QUANTITY = 4;

export const appController = new AppController(PATH_TO_FILE);
await appController.loadData();
appController.addHandlers()

// Burger menu
export const burger = new Burger();
burger.toggleBurgerMenu();

// Scroll Up button
new ScrollToTop();

// Countdown
countdown();

// Modal window MVC
// Global initialization
if (window.location.href.includes('/home/')) {
    modalWindowInitialization();
}

// Slider
if (window.location.href.includes('/home/')) {
    slider();
}
