export class ScrollToTop {
    constructor() {
        this.scrollToTopButton = document.getElementById('scrollToTop');
        this.addScrollHandlers();
        this.moveUp();
    }

    toggleScrollButtonVisibility = () => {
        if (window.innerWidth <= 768 && (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)) {
            this.scrollToTopButton?.classList.add('scroll-to-top_active');
        } else {
            if (this.scrollToTopButton?.classList.contains('scroll-to-top_active')) {
                this.scrollToTopButton.classList.remove('scroll-to-top_active');
            }
        }
    }

    addScrollHandlers = () => {
        window.addEventListener('scroll', this.toggleScrollButtonVisibility);
        this.scrollToTopButton && this.scrollToTopButton.addEventListener('click', this.moveUp);
    }

    moveUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}