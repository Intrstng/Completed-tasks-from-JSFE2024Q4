document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const sliderItems = document.querySelectorAll('.slider-item');
    const leftButton = document.querySelector('.slider-button.left');
    const rightButton = document.querySelector('.slider-button.right');
    let currentIndex = 0;
    let itemsPerClick = getItemsPerClick();

    function getItemsPerClick() {
        const width = window.innerWidth;
        if (width >= 768) {
            return 3;
        } else if (width >= 380) {
            return 6;
        } else {
            return sliderItems.length; // All items in one click for very small screens
        }
    }

    function updateButtons() {
        leftButton.disabled = currentIndex === 0;
        rightButton.disabled = currentIndex >= sliderItems.length - itemsPerClick;
    }

    function moveSlider() {
        const itemWidth = sliderItems[0].offsetWidth;
        const offset = -currentIndex * itemWidth;
        slider.style.transform = `translateX(${offset}px)`;
    }

    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= itemsPerClick;
            if (currentIndex < 0) currentIndex = 0;
            moveSlider();
            updateButtons();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < sliderItems.length - itemsPerClick) {
            currentIndex += itemsPerClick;
            if (currentIndex > sliderItems.length - itemsPerClick) {
                currentIndex = sliderItems.length - itemsPerClick;
            }
            moveSlider();
            updateButtons();
        }
    });

    window.addEventListener('resize', () => {
        itemsPerClick = getItemsPerClick();
        updateButtons();
        moveSlider();
    });

    updateButtons();
});