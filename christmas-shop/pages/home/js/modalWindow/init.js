// Modal window MVC
// Global initialization
// Injected in fillGiftsSectionWithCards function
import { ModalView } from './view.js';
import { ModalModel } from './model.js';
import { ModalController } from './controller.js';

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