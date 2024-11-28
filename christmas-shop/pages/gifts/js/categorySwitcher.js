
export const categorySwitcher = (data) => {
    const tabsCollection = document.querySelectorAll('[data-category]');

    tabsCollection.forEach(tab => {
        // tab.addEventListener('click', function () { selectCategory(this) });
        tab.addEventListener('click', () => {
            selectTab(tab);
            selectCategory(data, tab);
        });
    })
}

const selectCategory = (data, tab) => {
    const { dataset: { category } } = tab;
    return category === 'All' ? data : data.filter(item => item.category.toLowerCase() === category.toLowerCase());
}

const selectTab = (tab) => {
    const tabsCollection = document.querySelectorAll('[data-category]');

    tabsCollection.forEach(tab => {
        tab.classList.remove('active');
    })
    tab.classList.add('active');
}

