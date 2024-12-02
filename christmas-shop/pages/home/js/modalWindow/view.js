export function ModalView() {
    let myModal, myModalOverlay,myContainer,modalImageSource, modalImage, title, text, descriptionField, livePoint, createPoint, lovePoint, dreamPoint, liveRating, createRating, loveRating, dreamRating, imageRatingLink, imageRatingLinkLight;

        this.init = function (container, containerModal, overlay) {
        myContainer = container;
        myModal = containerModal;
        myModalOverlay = overlay;
        imageRatingLink = '../../assets/modal/snowflake.svg';
        imageRatingLinkLight = '../../assets/modal/snowflake-light.svg';
        modalImageSource = myContainer.querySelector('.modal__img-source');
        modalImage = myContainer.querySelector('.modal__img');
        title = myContainer.querySelector('.modal__title');
        text = myContainer.querySelector('.modal__text');
        descriptionField = myContainer.querySelector('.modal__description');
        livePoint = myContainer.querySelector('.live-point');
        createPoint = myContainer.querySelector('.create-point');
        lovePoint = myContainer.querySelector('.love-point');
        dreamPoint = myContainer.querySelector('.dream-point');
        liveRating = myContainer.querySelector('.live-rating');
        createRating = myContainer.querySelector('.create-rating');
        loveRating = myContainer.querySelector('.love-rating');
        dreamRating = myContainer.querySelector('.dream-rating');
    }

    this.myModalShow = function () {
        myModal.classList.remove('modal_closed');
    }

    this.myModalHide = function () {
        myModal.classList.add('modal_closed');
    }

    this.myModalOverlayShow = function () {
        myModalOverlay.classList.remove('modal_closed');
    }

    this.myModalOverlayHide = function () {
        myModalOverlay.classList.add('modal_closed');
    }

    this.disableDocumentScroll = function () {
        document.body.classList.add('no-scroll');
    }

    this.activateDocumentScroll = function () {
        document.body.classList.remove('no-scroll');
    }

    this.printViewData = function (cardData, rating, imgSources) {
        const { name, category, description, superpowers: { live, create, love, dream } } = cardData;
        modalImageSource.setAttribute('srcset', imgSources.srcset);
        modalImage.setAttribute('src', imgSources.src);
        title.innerText = category;
        text.innerText = name;
        descriptionField.innerText = description;
        livePoint.innerText = live;
        createPoint.innerText = create;
        lovePoint.innerText = love;
        dreamPoint.innerText = dream;

        for (let i = 1; i <= 5; i++) {
            const imageLiveLinkRating = document.createElement('img');
            const imageCreateLinkRating = document.createElement('img');
            const imageLoveLinkRating = document.createElement('img');
            const imageDreamLinkRating = document.createElement('img');

            const imgLiveLink = i <= rating.live ? imageRatingLink : imageRatingLinkLight;
            const imgCreateLink = i <= rating.create ? imageRatingLink : imageRatingLinkLight;
            const imgLoveLink = i <= rating.love ? imageRatingLink : imageRatingLinkLight;
            const imgDreamLink = i <= rating.dream ? imageRatingLink : imageRatingLinkLight;

            imageLiveLinkRating.setAttribute('src', imgLiveLink);
            imageCreateLinkRating.setAttribute('src', imgCreateLink);
            imageLoveLinkRating.setAttribute('src', imgLoveLink);
            imageDreamLinkRating.setAttribute('src', imgDreamLink);

            imageLiveLinkRating.setAttribute('alt', 'snowflake rating');
            imageCreateLinkRating.setAttribute('alt', 'snowflake rating');
            imageLoveLinkRating.setAttribute('alt', 'snowflake rating');
            imageDreamLinkRating.setAttribute('alt', 'snowflake rating');

            liveRating.append(imageLiveLinkRating);
            createRating.append(imageCreateLinkRating);
            loveRating.append(imageLoveLinkRating);
            dreamRating.append(imageDreamLinkRating);
        }
    }

    this.clearModalWindowContent = function () {
        modalImageSource.setAttribute('srcset', '');
        modalImage.setAttribute('src', '');
        title.innerText = '';
        text.innerText = '';
        descriptionField.innerText = '';
        livePoint.innerText = '';
        createPoint.innerText = '';
        lovePoint.innerText = '';
        dreamPoint.innerText = '';
        liveRating.innerHTML = '';
        createRating.innerHTML = '';
        loveRating.innerHTML = '';
        dreamRating.innerHTML = '';
    }
}