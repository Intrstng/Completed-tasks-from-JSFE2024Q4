import { Burger } from './js/burgerMenu.js';
import { countdown } from './js/countdown.js';
import { DataLoader } from './js/dataLoader.js';
import { Controller } from './js/controller.js';
import { ScrollToTop } from '../gifts/js/scrollToTop.js';

// Filling Gift cards (random and by category), switching between them by clicking on tabs
export const PATH_TO_FILE = './js/gifts.json';
export const RANDOM_CARDS_QUANTITY = 4;

export const dataLoader = new DataLoader(PATH_TO_FILE);
export const controller = new Controller(dataLoader);

await controller.loadData();
controller.addHandlers()
controller.cons()


// Burger menu
export const burger = new Burger();
burger.toggleBurgerMenu();


// Scroll Up button
new ScrollToTop();


// Countdown
countdown();