export class CreateCard {
    constructor(cardData) {
        this.imgSet = {};
        this.name = cardData.name;
        this.category = cardData.category;
        this.cardData = JSON.stringify(cardData);
        this.titleCategoryClass = this.category.split(' ').at(-1).toLowerCase();
        this.getImdSrcByCategory();
        this.generateCardContent();
    }

    getImdSrcByCategory = () => {
        switch (this.titleCategoryClass) {
            case 'work':
                this.imgSet.responsive = '../../assets/responsive/gift-for-work_responsive.png';
                this.imgSet.src = '../../assets/gift-for-work.png';
                break;
            case 'health':
                this.imgSet.responsive = '../../assets/responsive/gift-for-health_responsive.png';
                this.imgSet.src = '../../assets/gift-for-health.png';
                break;
            case 'harmony':
                this.imgSet.responsive = '../../assets/responsive/gift-for-harmony_responsive.png';
                this.imgSet.src = '../../assets/gift-for-harmony.png';
                break;
            default:
                this.imgSet.responsive = '../../assets/responsive/gift-for-work_responsive.png';
                this.imgSet.src = '../../assets/gift-for-work.png';
        }
    }

    generateCardContent = () => {
        this.card = document.createElement('div');
        this.card.classList.add('cards__content', 'cards__content_hover', 'modal-open');
        this.card.setAttribute('data-description', this.cardData);
        const figure = document.createElement('figure');
        figure.classList.add('cards__item', 'cards__item_hover');

        const picture = document.createElement('picture');

        const source = document.createElement('source');
        source.setAttribute('srcset', this.imgSet.responsive);
        source.setAttribute('media', '(max-width: 1000px)');

        const img = document.createElement('img');
        img.classList.add('cards__img');
        img.setAttribute('src', this.imgSet.src);
        img.setAttribute('alt', `gift for ${this.titleCategoryClass}`);

        const figcaption = document.createElement('figcaption');

        const title = document.createElement('h4');
        title.classList.add('cards__title', this.titleCategoryClass);
        title.innerText = this.category;

        const text = document.createElement('h3');
        text.classList.add('cards__text');
        text.innerText = this.name;

        picture.append(source, img);
        figcaption.append(title, text);
        figure.append(picture, figcaption);
        this.card.append(figure);
    }

    getCard = () => {
        return this.card;
    }
}