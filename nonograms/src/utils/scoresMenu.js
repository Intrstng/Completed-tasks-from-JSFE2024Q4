import closeImg from '../../assets/close.png';
import { audio } from './audio';
import { playSound } from '../index.js';

export function generateSlideMenuLayout() {
  const slidingMenu = document.createElement('div');
  slidingMenu.id = 'slidingMenu';
  slidingMenu.className = 'menu';

  const closeMenuButton = document.createElement('span');
  closeMenuButton.id = 'closeMenuButton';
  closeMenuButton.className = 'close';

  const crossLogo = document.createElement('img');
  crossLogo.src = closeImg;
  crossLogo.alt = 'Close';
  closeMenuButton.appendChild(crossLogo);

  const temporary = document.createElement('p');
  temporary.innerText = `
    <h2>Menu</h2>
    <p>Menu Item 1</p>
    <p>Menu Item 2</p>
    <p>Menu Item 3</p>
`;
  slidingMenu.append(closeMenuButton, temporary);
  document.body.append(slidingMenu);
}

export function slideMenu() {
  const slidingMenu = document.getElementById('slidingMenu');
  const toggleMenuButton = document.getElementById('scoresButton');
  const closeMenuButton = document.getElementById('closeMenuButton');

  toggleMenuButton.addEventListener('click', () => {
    playSound(audio.toggle.src);
    slidingMenu.classList.toggle('open');
  });

  closeMenuButton.addEventListener('click', () => {
    playSound(audio.close.src);
    slidingMenu.classList.remove('open');
  });
}