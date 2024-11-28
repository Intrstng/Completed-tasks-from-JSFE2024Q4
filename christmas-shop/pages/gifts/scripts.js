import { Burger } from '../home/js/burgerMenu.js';
import { ScrollToTop } from './js/scrollToTop.js';


const burger = new Burger();
burger.toggleBurgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTop();
});