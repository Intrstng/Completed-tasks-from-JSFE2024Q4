export function ModalController() {
    let myModalContainer;
    let myContainer;
    let myModalModel;
    let modalOverlay;

    this.init = function (model, containerModal, containerMain) {
        myModalModel = model;
        myModalContainer = containerModal;
        myContainer = containerMain;

        const cardsOpenModalCollection = myContainer.querySelectorAll('.modal-open');
        modalOverlay = myContainer.querySelector("#modal-overlay");

        cardsOpenModalCollection.forEach(card => card.addEventListener('click', () => this.openModal(card.dataset.description)));
        const btnModalClose = myModalContainer.querySelector('.modal__close');

        btnModalClose.addEventListener('click', (e) => this.closeModalByClickOnCloseBtn(e));

        modalOverlay.addEventListener('click',  (e) => this.hideModal(e));
    }

    this.openModal = function (cardData) {
        myModalModel.getData(cardData);
        myModalModel.openModal();
    }

    this.hideModal = function (e) {
        if (e.target === modalOverlay) {
            myModalModel.closeModal();
        }
    }

    this.closeModalByClickOnCloseBtn = function (e) {
        e.preventDefault();
        myModalModel.closeModal();
    }
}