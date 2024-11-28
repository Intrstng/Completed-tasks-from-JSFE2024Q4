export class Burger {
    hamburger = document.querySelector('.hamburger');
    navigationMenu = document.querySelector('.nav__list');
    navigationLinks = document.querySelectorAll('.nav__link');

    toggleBurgerMenu = () => {
        this.hamburger.addEventListener('click', this.openBurgerMenu);
        this.navigationLinks.forEach(link => link.addEventListener('click', this.closeBurgerMenu));
        this.closeBurgerMenuOnResize();
    }

    closeBurgerMenuOnResize = () => {
        window.addEventListener('resize', this.closeBurgerMenu);
    }

    openBurgerMenu = () => {
        this.hamburger.classList.toggle('hamburger_active');
        this.navigationMenu.classList.toggle('nav__list_active');
        document.body.classList.toggle('no-scroll');
    }

    closeBurgerMenu = () => {
        this.hamburger.classList.remove('hamburger_active');
        this.navigationMenu.classList.remove('nav__list_active');
        document.body.classList.remove('no-scroll');
    }
}