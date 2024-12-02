import { burger, appController } from '../home/scripts.js';


burger.toggleBurgerMenu();
await appController.loadData();

const a  = document.querySelector('.gifts__title')
console.log(a)