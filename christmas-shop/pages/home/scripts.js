import { Burger } from './js/burgerMenu.js';
import { countdown } from './js/countdown.js';
import { Controller } from './js/controller.js';
import { ScrollToTop } from './js/scrollToTop.js';
import { getPathToCardsData } from './js/utils.js';
import { ModalView } from './js/modalWindow/view.js';
import { ModalModel } from './js/modalWindow/model.js';
import { ModalController } from './js/modalWindow/controller.js';
import { leftMoveSlider, rightMoveSlider } from './js/slider.js';


// Filling Gift cards (random and by category), switching between them by clicking on tabs
export const PATH_TO_FILE = `${getPathToCardsData()}/gifts.json`;
export const RANDOM_CARDS_QUANTITY = 4;

export const appController = new Controller(PATH_TO_FILE);

await appController.loadData();
appController.addHandlers()
appController.cons()


// Burger menu
export const burger = new Burger();
burger.toggleBurgerMenu();


// Scroll Up button
new ScrollToTop();


// Countdown
countdown();

let modalWindow
// Modal window
// Global initialization
if (window.location.href.includes('/home/')) {
    const appModalView = new ModalView();
    const appModalModel = new ModalModel();
    const appModalController = new ModalController();
    const container = document.querySelector("#best");
    modalWindow = document.querySelector("#my-custom-modal");
    const overlay = document.querySelector("#modal-overlay");

    appModalView.init(container, modalWindow, overlay);
    appModalModel.init(appModalView);
    appModalController.init(appModalModel, modalWindow, container);
} else if (window.location.href.includes('/gifts/')) {
    // generateCardsFromData(data, cardsContainer);
}


// Slider
document.querySelector('.carousel__btn-prev').addEventListener('click', leftMoveSlider);
document.querySelector('.carousel__btn-next').addEventListener('click', rightMoveSlider);
