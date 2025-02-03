import { currentGamePlayboard } from '../index.js';
import { optionsData } from '../templates';

export function saveGameProgress(time) {
  const sizeSelector = document.querySelector('#sizeSelector');
  const templateSelector = document.querySelector('#templateSelector');
  const saveGameButton = document.querySelector('#saveGameBtn');
  const continueGameButton = document.querySelector('#continueGameBtn');
  // const timerResult = localStorage.getItem('timer') || '0';
  continueGameButton.disabled = false;

  const progress = {
    size: sizeSelector.value,
    template: templateSelector.value,
    timer: time,
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

export function saveWinResults(time) {
  const levelValue = document.querySelector('#sizeSelector').value;
  const template = document.querySelector('#templateSelector').value;
  const level = optionsData.find(el => el.size === Number(levelValue)).name  || 'Level unknown';

  const winResult = {
    level,
    template,
    time
  }
  let data = [];
  const storedData = localStorage.getItem('winResults');
  if (storedData) {
    data = JSON.parse(storedData);
    data.push(winResult);
  } else {
    data = [winResult];
  }

  localStorage.setItem('winResults', JSON.stringify(data));
}
