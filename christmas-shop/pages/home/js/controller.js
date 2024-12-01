import { fillGiftsSectionWithCards } from './fillGiftsSectionWithCards.js';
import { getDataByLink } from './getDataByLink.js';

export class Controller {
    constructor(link) {
        this.link = link;
        this.data = [];
    }

    loadData = async () => {
        this.data = await getDataByLink(this.link);
        fillGiftsSectionWithCards(this.data);
    }

    addHandlers = () => {
        if (window.location.href.includes('/gifts/')) {
            this.categorySwitcher(this.data);
        }
                    // const giftCardCollection = document.querySelectorAll('[data-type]');
                    // giftCardCollection.forEach(card => card.addEventListener('click', this.cons))
    }


                                            cons = () => {
                                                console.log(this.data)
                                            }


    categorySwitcher = (data) => {
        const tabsCollection = document.querySelectorAll('[data-category]');

        tabsCollection.forEach(tab => {
            tab.addEventListener('click', () => {
                this.selectTab(tab);
                this.selectCategory(data, tab);
            });
        })
    }

    selectCategory = (data, tab) => {
        const { dataset: { category } } = tab;
        const filteredDataByCategory = category === 'All' ? data : data.filter(item => item.category.toLowerCase() === category.toLowerCase());
        fillGiftsSectionWithCards(filteredDataByCategory);
    }

    selectTab = (tab) => {
        const tabsCollection = document.querySelectorAll('[data-category]');

        tabsCollection.forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active');
    }

    getData = () => {
        return this.data;
    }
}