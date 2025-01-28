import closeImg from '../../assets/close.png';
import { playSound } from '../index';
import { audio } from './audio';

export function generateModalWindow() {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeModalButton = document.createElement('span');
  closeModalButton.id = 'closeModalButton';
  closeModalButton.className = 'close';

  const crossLogo = document.createElement('img');
  crossLogo.src = closeImg;
  crossLogo.alt = 'Close';
  closeModalButton.appendChild(crossLogo);

  const timer = document.createElement('span');
  timer.id = 'timer';

  const congratulation = document.createElement('h2');
  congratulation.className = 'congrats';
  congratulation.textContent = `Well done! You\'ve solved the nonogram in ${timer} seconds!`;

  modalContent.append(closeModalButton, congratulation);
  modal.append(modalContent);
  document.body.append(modal);
  addModalHandlers();
}

function addModalHandlers() {
  const modal = document.getElementById('modal');
  const closeModalButton = document.getElementById('closeModalButton');

  closeModalButton.addEventListener('click', () => {
    playSound(audio.close.src);
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
