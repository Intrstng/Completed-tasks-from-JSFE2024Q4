import { currentGamePlayboard } from '../index.js';

export function saveGameProgress() {
  const sizeSelector = document.querySelector('#sizeSelector');
  const templateSelector = document.querySelector('#templateSelector');
  const saveGameButton = document.querySelector('#saveGameBtn');
  const timerResult = localStorage.getItem('timer') || '0';

  const progress = {
    size: sizeSelector.value,
    template: templateSelector.value,
    timer: timerResult,
    progress: currentGamePlayboard,
  }
  localStorage.setItem('gameProgress', JSON.stringify(progress));
  saveGameButton.disabled = true;
  showSnackbarNotification('Game progress saved!');
}

export function showSnackbarNotification(text) {
  const notification = document.getElementById('notification');
  notification.style.display = 'block';
  notification.style.opacity = '1';
  notification.textContent = text;

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 500);
  }, 2000);
}
