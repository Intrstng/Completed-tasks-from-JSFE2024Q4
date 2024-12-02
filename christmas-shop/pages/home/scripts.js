import { Burger } from './js/burgerMenu.js';
import { countdown } from './js/countdown.js';
import { Controller } from './js/controller.js';
import { ScrollToTop } from './js/scrollToTop.js';
import { getPathToCardsData } from './js/utils.js';
import { ModalView } from './js/modalWindow/view.js';
import { ModalModel } from './js/modalWindow/model.js';
import { ModalController } from './js/modalWindow/controller.js';


// Filling Gift cards (random and by category), switching between them by clicking on tabs
export const PATH_TO_FILE = `${getPathToCardsData()}/gifts.json`;
export const RANDOM_CARDS_QUANTITY = 4;

export const appController = new Controller(PATH_TO_FILE);

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
// Injected in fillGiftsSectionWithCards function
export function modalWindowInitialization() {
    const appModalView = new ModalView();
    const appModalModel = new ModalModel();
    const appModalController = new ModalController();
    const container = document.querySelector("#best");
    const modalWindow = document.querySelector("#my-custom-modal");
    const overlay = document.querySelector("#modal-overlay");

    appModalView.init(container, modalWindow, overlay);
    appModalModel.init(appModalView);
    appModalController.init(appModalModel, modalWindow, container);
}

if (window.location.href.includes('/home/')) {
    modalWindowInitialization();
}


// Slider
if (window.location.href.includes('/home/')) {
    const carousel = document.querySelector('.carousel__line');
    const prevBtn = document.querySelector('.carousel__btn-prev');
    const nextBtn = document.querySelector('.carousel__btn-next');
    const windowWidth = window.innerWidth;
    let maxWidth = carousel.scrollWidth;
    let maxOffset = maxWidth - windowWidth;
    const WIDTH_SCREEN_TABLET = 768;
    const STEPS_DESKTOP = 3;
    const STEPS_MOBILE = 6;
    let currentOffset = 0;
    let stepNumber = window.innerWidth > WIDTH_SCREEN_TABLET ? STEPS_DESKTOP : STEPS_MOBILE;
    let stepWidth = Math.ceil(maxOffset / stepNumber);

    function rightMoveSlider() {
        prevBtn.disabled = false;
        if (currentOffset + stepWidth >= maxOffset) {
            currentOffset = maxOffset;
            nextBtn.disabled = true;
        } else {
            currentOffset += stepWidth;
        }
        carousel.style.marginLeft = -currentOffset + 'px';
    }

    function leftMoveSlider() {
        nextBtn.disabled = false;
        if (currentOffset - stepWidth <= 0) {
            currentOffset = 0;
            prevBtn.disabled = true;
        } else {
            currentOffset -= stepWidth;
        }
        carousel.style.marginLeft = -currentOffset + 'px';
    }
    document.querySelector('.carousel__btn-prev').addEventListener('click', leftMoveSlider);
    document.querySelector('.carousel__btn-next').addEventListener('click', rightMoveSlider);
}
