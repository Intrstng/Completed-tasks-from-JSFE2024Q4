import closeImg from '../../assets/close.png';
import { playSound } from '../index.js';
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

  const congratulation = document.createElement('div');
  congratulation.className = 'congrats';

  const congratsText = document.createElement('h2');
  congratsText.className = 'congrats-text';

  const modalSeconds = document.createElement('span');
  modalSeconds.id = 'modalSeconds';

  const congratsTextEnding = document.createElement('span');
  congratsTextEnding.className = 'congrats-text-end';

  congratulation.append(congratsText, modalSeconds, congratsTextEnding);
  modalContent.append(closeModalButton, congratulation);
  modal.append(modalContent);
  document.body.append(modal);
  addModalHandlers();
}

export function fillModalWindowWithCongrats() {
  const congratsText = document.querySelector('.congrats-text');
  const modalSeconds = document.querySelector('#modalSeconds');
  const congratsTextEnding = document.querySelector('.congrats-text-end');
  const timerResult = localStorage.getItem('timer');

  if (timerResult) {
    congratsText.textContent = "Well done! You've solved the nonogram in ";
    modalSeconds.textContent = timerResult;
    congratsTextEnding.innerText = ' seconds';
  } else {
    congratsText.textContent = "Well done! You've solved the nonogram";
  }
}

export function addSnackbarNotification() {
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.className = 'notification';
  document.body.append(notification);
}

function addModalHandlers() {
  const modal = document.getElementById('modal');
  const closeModalButton = document.getElementById('closeModalButton');

  closeModalButton.addEventListener('click', () => {
    playSound(audio.close.src);
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
