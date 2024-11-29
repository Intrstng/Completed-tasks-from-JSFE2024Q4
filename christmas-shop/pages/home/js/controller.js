import { fillGiftsSectionWithCards } from './fillGiftsSectionWithCards.js';

export class Controller {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
        this.data = [];
    }

    loadData = async () => {
        this.data = await this.dataLoader.getDataByLink();
        fillGiftsSectionWithCards(this.data);
    }

    addHandlers = () => {
        if (window.location.href.includes('/gifts/')) {

            this.categorySwitcher(this.data);
        }
        //     const tabsCollection = document.querySelectorAll('[data-category]');
        // add listeners to open modal windows
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
}