export const generateModalOverlay = () => {
    const modalGiftsOverlay = document.createElement('div');
    modalGiftsOverlay.classList.add('modal-overlay', 'modal_closed');
    modalGiftsOverlay.id = 'modal-overlay';
    return modalGiftsOverlay;
}

export const generateModalWindowLayout = () => {
    const modalGiftsOverlay = document.createElement('figure');
    modalGiftsOverlay.classList.add('modal', 'modal_closed');
    modalGiftsOverlay.id = 'my-custom-modal';
    modalGiftsOverlay.innerHTML = `<picture>
            <source class="modal__img-source" srcset="" media="(max-width: 640px)">
            <img class="modal__img" src="" alt="gift">
          </picture>
          <figcaption>
            <h4 class="modal__title"></h4>
            <h3 class="modal__text"></h3>
            <p class="modal__description"></p>
            <h4 class="modal__superpowers-title">Adds superpowers to:</h4>
            <div class="modal__superpowers-content">
              <div class="modal__superpowers">
                <p class="modal__superpower-item">Live</p>
                <p class="modal__superpower-item">Create</p>
                <p class="modal__superpower-item">Love</p>
                <p class="modal__superpower-item">Dream</p>
              </div>
              <div class="modal__points">
                <p class="modal__point-item live-point"></p>
                <p class="modal__point-item create-point"></p>
                <p class="modal__point-item love-point"></p>
                <p class="modal__point-item dream-point"></p>
              </div>
              <div class="modal__rating">
                <div class="modal__rating-item live-rating"></div>
                <div class="modal__rating-item create-rating"></div>
                <div class="modal__rating-item love-rating"></div>
                <div class="modal__rating-item dream-rating"></div>
              </div>
            </div>
          </figcaption>
          <a href="#best" class="modal__close modal__close_hover" id="modal-close" title="Close modal window"><img src="../../assets/twitter.svg" alt="close modal window button"></a>`;
    return modalGiftsOverlay;
}
