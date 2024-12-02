export function ModalModel() {
    let myModalView;

    this.init = function (view) {
        myModalView = view;
    }

    this.openModal = function () {
        myModalView.myModalShow();
        myModalView.myModalOverlayShow();
        myModalView.disableDocumentScroll();
    }

    this.closeModal = function () {
        myModalView.myModalHide();
        myModalView.myModalOverlayHide();
        myModalView.clearModalWindowContent();
        myModalView.activateDocumentScroll();
    }

    this.getData = function (cardData) {
        const parsedCardData = JSON.parse(cardData);
        const ratingObject = {...parsedCardData.superpowers};
        const ratingArray = Object.entries(ratingObject);
        const cardCategory = parsedCardData.category.split(' ').at(-1).toLowerCase();
        const parsedRating = ratingArray.reduce((arr, rating) => {
            arr[rating[0]] = Math.floor(Number(rating[1]) / 100);
            return arr;
        }, {});
        const imgSources = this.getImageSources(cardCategory);
        myModalView.printViewData(parsedCardData, parsedRating, imgSources, cardCategory);
    }

    this.getImageSources = function (cardCategory) {
        const imgSources = {
            src: '',
            srcset: ''
        }
        switch (cardCategory) {
            case 'work':
                imgSources.src = '../../assets/modal/For_work.png';
                imgSources.srcset = '../../assets/modal/responsive/For_work-responsive.png';
                break;
            case 'health':
                imgSources.src = '../../assets/modal/For_health.png';
                imgSources.srcset = '../../assets/modal/responsive/For_health-responsive.png';
                break;
            case 'harmony':
                imgSources.src = '../../assets/modal/For_harmony.png';
                imgSources.srcset = '../../assets/modal/responsive/For_harmony-responsive.png';
                break;
            default:
                imgSources.src = '../../assets/modal/For_work.png';
                imgSources.srcset = '../../assets/modal/responsive/For_work-responsive.png';
        }
        return imgSources;
    }
}