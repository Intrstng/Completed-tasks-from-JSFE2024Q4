export function slider() {
    const carousel = document.querySelector('.carousel__line');
    const prevBtn = document.querySelector('.carousel__btn-prev');
    const nextBtn = document.querySelector('.carousel__btn-next');
    let windowWidth = window.innerWidth;
    let maxWidth = carousel.scrollWidth;
    let maxOffset = maxWidth - windowWidth;
    const WIDTH_SCREEN_TABLET = 768;
    const STEPS_DESKTOP = 3;
    const STEPS_MOBILE = 6;
    let currentOffset = 0;
    let stepNumber = window.innerWidth > WIDTH_SCREEN_TABLET ? STEPS_DESKTOP : STEPS_MOBILE;
    let stepWidth = Math.ceil(maxOffset / stepNumber);

    function rightMoveSlider() {
        updateWidthData();
        prevBtn.disabled = false;
        if (currentOffset + stepWidth >= maxOffset) {
            currentOffset = maxOffset;
            nextBtn.disabled = true;
        } else {
            currentOffset += stepWidth;
        }
        carousel.style.marginLeft = -currentOffset + 'px';
    }

    function leftMoveSlider() {
        updateWidthData();
        nextBtn.disabled = false;
        if (currentOffset - stepWidth <= 0) {
            currentOffset = 0;
            prevBtn.disabled = true;
        } else {
            currentOffset -= stepWidth;
        }
        carousel.style.marginLeft = -currentOffset + 'px';
    }

    function updateWidthData() {
        maxWidth = carousel.scrollWidth;
        windowWidth = window.innerWidth;
        stepNumber = window.innerWidth > WIDTH_SCREEN_TABLET ? STEPS_DESKTOP : STEPS_MOBILE;
        maxOffset = maxWidth - windowWidth;
        stepWidth = Math.ceil(maxOffset / stepNumber);
    }

    function watchResize() {
        updateWidthData();
        currentOffset = 0;
        prevBtn.disabled = true;
        nextBtn.disabled = false;
        carousel.style.marginLeft = -currentOffset + 'px';
    }

    window.addEventListener('resize', watchResize);
    document.querySelector('.carousel__btn-prev').addEventListener('click', leftMoveSlider);
    document.querySelector('.carousel__btn-next').addEventListener('click', rightMoveSlider);
}