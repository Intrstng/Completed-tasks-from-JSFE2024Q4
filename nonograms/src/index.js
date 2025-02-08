import './styles.scss';
import { optionsData, templates } from './templates.js';
import scoresImg from '../assets/scores.png';
import soundOnImg from '../assets/sound-on.png';
import soundOffImg from '../assets/sound-off.png';
import lightImg from '../assets/light.png';
import darkImg from '../assets/dark.png';
import { getRandomInteger } from './utils/getRandomInteger.js';
import { generateEmptyPlayboardArray } from './utils/generateEmptyPlayboardArray.js';
import { audio } from './utils/audio.js';
import {
  addSnackbarNotification,
  fillModalWindowWithCongrats,
  generateModalWindow,
} from './utils/modalWindow.js';
import {
  fillSlideMenuWithScoreData,
  generateSlideMenuLayout,
  slideMenu,
} from './utils/scoresMenu.js';
import { saveGameProgress, saveWinResults } from './utils/saveGame.js';
import { themeToggle } from './utils/themeToggle.js';
import { addHandleCellClick, removeHandleCellClick } from './utils/handlers.js';

let gamePlayBoardToGuess = [];
export let currentGamePlayBoard = [];
let mute = false;
let theme = 'light';
let isGameStarted = false;
let isGameFinished = false;
let rowCluesLength = 1;
let isShownSolution = false;

function createGameLayout() {
  const board = document.createElement('div');
  board.id = 'board';

  const header = document.createElement('h1');
  header.id = 'header';
  header.textContent = 'Nonograms game';

  const controls = document.createElement('div');
  controls.id = 'controls';

  const scoresButton = document.createElement('button');
  scoresButton.id = 'scoresButton';
  scoresButton.className = 'controls-button';
  const scoresLogo = document.createElement('img');
  scoresLogo.setAttribute('src', scoresImg);
  scoresLogo.setAttribute('alt', 'Scores button');
  scoresButton.append(scoresLogo);

  const soundButton = document.createElement('button');
  soundButton.id = 'soundButton';
  soundButton.className = 'controls-button';
  const soundLogo = document.createElement('img');
  soundLogo.className = 'sound-logo';
  soundLogo.setAttribute('src', soundOnImg);
  soundLogo.setAttribute('alt', 'Sound button');
  soundButton.append(soundLogo);

  const themeButton = document.createElement('button');
  themeButton.id = 'themeButton';
  themeButton.className = 'controls-button';
  const themeLogo = document.createElement('img');
  themeLogo.classList.add('theme-logo');
  themeLogo.setAttribute('src', lightImg);
  themeLogo.setAttribute('alt', 'Theme button');
  themeButton.append(themeLogo);

  controls.append(scoresButton, soundButton, themeButton);

  const gameOptions = document.createElement('div');
  gameOptions.id = 'gameOptions';

  const difficultyLabel = document.createElement('label');
  difficultyLabel.setAttribute('for', 'sizeSelector');
  difficultyLabel.innerText = 'Select size of board and template';

  const sizeSelectorWrapper = document.createElement('div');
  sizeSelectorWrapper.className = 'size-select-wrapper';

  const sizeSelector = document.createElement('select');
  sizeSelector.id = 'sizeSelector';

  optionsData.forEach(data => {
    const level = document.createElement('option');
    level.setAttribute('value', data.size);
    level.className = 'size-option';
    level.textContent = data.name;
    sizeSelector.append(level);
  });

  const templateSelectorWrapper = document.createElement('div');
  templateSelectorWrapper.className = 'template-select-wrapper';

  const templateSelector = document.createElement('select');
  templateSelector.id = 'templateSelector';

  const randomGameButton = document.createElement('button');
  randomGameButton.id = 'randomGameBtn';
  randomGameButton.textContent = 'Random Game';
  randomGameButton.className = 'game-button';

  sizeSelectorWrapper.append(sizeSelector);
  templateSelectorWrapper.append(templateSelector);

  gameOptions.append(
    difficultyLabel,
    sizeSelectorWrapper,
    templateSelectorWrapper,
    randomGameButton
  );

  const timer = document.createElement('p');
  timer.id = 'timer';

  const minutes = document.createElement('span');
  minutes.className = 'minutes';
  minutes.innerText = '00';

  const seconds = document.createElement('span');
  seconds.className = 'seconds';
  seconds.innerText = '00';

  const colon = document.createElement('span');
  colon.className = 'colon';
  colon.innerText = ':';

  timer.append(minutes, colon, seconds);

  const playBoard = document.createElement('div');
  playBoard.id = 'playBoard';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';

  const saveGameButton = document.createElement('button');
  saveGameButton.id = 'saveGameBtn';
  saveGameButton.textContent = 'Save Game';
  saveGameButton.className = 'game-button';

  const continueGameButton = document.createElement('button');
  continueGameButton.id = 'continueGameBtn';
  continueGameButton.textContent = 'Continue Game';
  continueGameButton.className = 'game-button';

  const storedGameProgress = localStorage.getItem('gameProgress');
  continueGameButton.disabled = !storedGameProgress;

  const resetGameButton = document.createElement('button');
  resetGameButton.id = 'resetGameBtn';
  resetGameButton.textContent = 'Reset Game';
  resetGameButton.className = 'game-button';

  const solutionButton = document.createElement('button');
  solutionButton.id = 'solutionBtn';
  solutionButton.textContent = 'Show Solution';
  solutionButton.className = 'game-button';

  buttonContainer.append(
    saveGameButton,
    continueGameButton,
    resetGameButton,
    solutionButton
  );

  board.append(
    header,
    controls,
    gameOptions,
    timer,
    buttonContainer,
    playBoard
  );
  document.body.append(board);
  selectInitTemplate();
  createGamePlayBoard(playBoard, templates, templateSelector.value);
}

function toggleDisableGameButtons(disableResetBtn = true) {
  const saveGameButton = document.querySelector('#saveGameBtn');
  const continueGameButton = document.querySelector('#continueGameBtn');
  saveGameButton.disabled = !isGameStarted;
  const storedGameProgress = localStorage.getItem('gameProgress');
  continueGameButton.disabled = !storedGameProgress;

  if (disableResetBtn) {
    const resetGameButton = document.querySelector('#resetGameBtn');
    resetGameButton.disabled = !isGameStarted;
  }
}

function createGamePlayBoard(container, templates, value = 'Dinosaur') {
  rowCluesLength = 1;
  const templateObject = templates.find(t => t.name === value);

  const playBoard = document.querySelector('#playBoard');
  playBoard.classList.add(`playboard-size-${templateObject.size}`);

  const mainBoard = document.createElement('div');
  mainBoard.classList.add('main-board', `size-${templateObject.size}`);

  for (let i = 0; i < templateObject.size; i++) {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'row';
    rowContainer.style.gridTemplateColumns = `repeat(${templateObject.size}, 25px)`;
    for (let j = 0; j < templateObject.size; j++) {
      const rowCell = document.createElement('div');
      rowCell.className = 'row-cell';
      rowCell.dataset.rowIndex = String(i);
      rowCell.dataset.cellIndex = String(j);
      rowContainer.append(rowCell);
    }
    mainBoard.append(rowContainer);
  }

  const columnCluesContainer = document.createElement('div');
  columnCluesContainer.classList.add(
    'column-clues',
    `column-clue-size-${templateObject.size}`
  );

  for (let i = 0; i < templateObject.clues[0].length; i++) {
    const columnClueBox = document.createElement('div');
    columnClueBox.className = 'column-clue-box';
    for (let j = 0; j < templateObject.clues[0][i].length; j++) {
      const columnClueItem = document.createElement('span');
      columnClueItem.className = 'column-clue-item';
      columnClueItem.textContent = templateObject.clues[0][i][j];
      if (!templateObject.clues[0][i][j]) {
        templateObject.clues[0][i][j] = 0;
        columnClueItem.classList.add('hidden');
      }
      columnClueBox.append(columnClueItem);
    }
    columnCluesContainer.append(columnClueBox);
  }

  const rowCluesContainer = document.createElement('div');
  rowCluesContainer.classList.add(
    'row-clues',
    `row-clue-size-${templateObject.size}`
  );

  for (let i = 0; i < templateObject.clues[1].length; i++) {
    const rowClueBox = document.createElement('div');
    rowClueBox.classList.add(
      'row-clue-box',
      `row-clue-box-size-${templateObject.size}`
    );
    for (let j = 0; j < templateObject.clues[1][i].length; j++) {
      const rowClueItem = document.createElement('span');
      rowClueItem.className = 'row-clue-item';
      rowClueItem.textContent = templateObject.clues[1][i][j];
      rowCluesLength =
        rowCluesLength <= templateObject.clues[1][i].length
          ? templateObject.clues[1][i].length
          : rowCluesLength;
      if (!templateObject.clues[1][i][j]) {
        templateObject.clues[1][i][j] = 0;
        rowClueItem.classList.add('hidden');
      }
      rowClueBox.append(rowClueItem);
    }
    rowCluesContainer.append(rowClueBox);
  }

  container.prepend(columnCluesContainer);
  mainBoard.append(rowCluesContainer);
  container.append(mainBoard);
  gamePlayBoardToGuess = templateObject.playboard;

  updateRowCluesPosition();
}

function updateRowCluesPosition() {
  let rowCluesLeftPosition = '';
  const rowCluesContainer = document.querySelector('.row-clues');
  const screenWidth = window.innerWidth;

  switch (rowCluesLength) {
    case 1:
      rowCluesLeftPosition = screenWidth <= 550 ? '-24px' : '-29px';
      break;
    case 2:
      rowCluesLeftPosition = screenWidth <= 550 ? '-44px' : '-54px';
      break;
    case 3:
      rowCluesLeftPosition = screenWidth <= 550 ? '-64px' : '-79px';
      break;
    case 4:
      rowCluesLeftPosition = screenWidth <= 550 ? '-84px' : '-104px';
      break;
    default:
      rowCluesLeftPosition = '-29px';
  }
  rowCluesContainer.style.left = rowCluesLeftPosition;
}

function addControlsHandlers() {
  const slidingMenu = document.getElementById('slidingMenu');
  const scoresButton = document.querySelector('#scoresButton');
  scoresButton.addEventListener('click', () => {
    playSound(audio.toggle.src);
    slidingMenu.classList.toggle('open');
    fillSlideMenuWithScoreData();
  });

  const soundButton = document.querySelector('#soundButton');
  soundButton.addEventListener('click', toggleMuteSound);

  const themeButton = document.querySelector('#themeButton');
  themeButton.addEventListener('click', toggleTheme);

  const sizeSelector = document.querySelector('#sizeSelector');
  sizeSelector.addEventListener('change', reselectTemplate);

  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.addEventListener('change', redrawPlayBoard);

  const randomGameButton = document.querySelector('#randomGameBtn');
  randomGameButton.addEventListener('click', selectRandomTemplate);

  const saveGameButton = document.querySelector('#saveGameBtn');
  saveGameButton.addEventListener('click', () => saveGameProgress(elapsedTime));

  const continueGameButton = document.querySelector('#continueGameBtn');
  continueGameButton.addEventListener('click', continueGame);

  const resetGameButton = document.querySelector('#resetGameBtn');
  resetGameButton.addEventListener('click', resetGame);

  const showSolutionButton = document.querySelector('#solutionBtn');
  showSolutionButton.addEventListener('click', showSolution);

  addHandleCellClick();
  toggleDisableGameButtons();
  slideMenu();
}

function toggleMuteSound() {
  const soundLogo = document.querySelector('.sound-logo');
  if (!mute) {
    soundLogo.setAttribute('src', soundOffImg);
    soundLogo.classList.add('sound-off');
  } else {
    soundLogo.setAttribute('src', soundOnImg);
    soundLogo.classList.remove('sound-off');
  }
  mute = !mute;
  playSound(audio.toggle.src);
}

function toggleTheme() {
  const themeLogo = document.querySelector('.theme-logo');
  playSound(audio.toggle.src);
  themeToggle();
  if (theme === 'light') {
    theme = 'dark';
    themeLogo.setAttribute('src', darkImg);
  } else {
    theme = 'light';
    themeLogo.setAttribute('src', lightImg);
  }
}

function showSolution() {
  isShownSolution = true;
  const showSolutionButton = document.querySelector('#solutionBtn');
  showSolutionButton.disabled = isShownSolution;
  isGameStarted = false;
  isGameFinished = true;
  toggleDisableGameButtons(false);
  const value = document.querySelector('#templateSelector').value;
  const sourcePlayBoard = templates.find(t => t.name === value);

  if (!sourcePlayBoard) {
    return;
  }

  for (let i = 0; i < sourcePlayBoard.playboard.length; i++) {
    const rowToHighlight = document.querySelectorAll(`[data-row-index="${i}"]`);
    for (let j = 0; j < rowToHighlight.length; j++) {
      rowToHighlight[j].classList.remove('highlight');
      if (sourcePlayBoard.playboard[i][j] === 1) {
        rowToHighlight[j].classList.add('highlight');
      }
    }
  }
  resetTimer();
}

function continueGame() {
  isGameStarted = false;
  isGameFinished = false;
  const saveGameButton = document.querySelector('#saveGameBtn');
  const continueGameButton = document.querySelector('#continueGameBtn');
  const resetGameButton = document.querySelector('#resetGameBtn');
  saveGameButton.disabled = true;
  continueGameButton.disabled = true;
  resetGameButton.disabled = false;

  const storedGameProgress = localStorage.getItem('gameProgress');
  if (!storedGameProgress) {
    return;
  }

  const storedGameData = JSON.parse(storedGameProgress);
  const storedPlayBoard = storedGameData.progress;
  const sizeSelector = document.querySelector('#sizeSelector');
  sizeSelector.value = String(storedGameData.size);
  selectInitTemplate();
  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.value = storedGameData.template;
  redrawPlayBoard();
  currentGamePlayBoard = [...storedPlayBoard];
  elapsedTime = Number(storedGameData.timer) || 0;
  updateTimerDisplay('.minutes', '.seconds');

  for (let i = 0; i < storedPlayBoard.length; i++) {
    const rowToHighlight = document.querySelectorAll(`[data-row-index="${i}"]`);
    for (let j = 0; j < rowToHighlight.length; j++) {
      rowToHighlight[j].classList.remove('highlight');
      if (storedPlayBoard[i][j] === 1) {
        rowToHighlight[j].classList.add('highlight');
      }
    }
  }
  activateShowSolutionButton();
}

function activateShowSolutionButton() {
  isShownSolution = false;
  const showSolutionButton = document.querySelector('#solutionBtn');
  showSolutionButton.disabled = isShownSolution;
}

function redrawPlayBoard() {
  isGameStarted = false;
  isGameFinished = false;
  resetTimer();
  activateShowSolutionButton();
  const playBoard = document.querySelector('#playBoard');
  const sizeSelector = document.querySelector('#sizeSelector');
  const templateSelector = document.querySelector('#templateSelector');
  const continueGameButton = document.querySelector('#continueGameBtn');
  const storedGameProgress = localStorage.getItem('gameProgress');
  continueGameButton.disabled = !storedGameProgress;

  playBoard.innerHTML = '';
  playBoard.className = '';
  currentGamePlayBoard = generateEmptyPlayboardArray(sizeSelector.value);
  createGamePlayBoard(playBoard, templates, templateSelector.value);
  removeHandleCellClick();
  addHandleCellClick();
}

function reselectTemplate() {
  selectInitTemplate();
  redrawPlayBoard();
}

function selectInitTemplate() {
  const sizeSelector = document.querySelector('#sizeSelector');
  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.innerHTML = '';
  currentGamePlayBoard = generateEmptyPlayboardArray(sizeSelector.value);

  templates.forEach(template => {
    if (template.size === Number(sizeSelector.value)) {
      const templateOption = document.createElement('option');
      templateOption.className = 'template-option';
      templateOption.setAttribute('value', template.name);
      templateOption.textContent = template.name;
      templateSelector.append(templateOption);
    }
  });
}

export function addCellHandlers(e) {
  if (!isGameFinished) {
    let target = e.target.closest('.row-cell');
    if (!target) return;
    if (!isGameStarted) toggleTimer();
    isGameStarted = true;
    toggleDisableGameButtons();
    highlightCell(target);
  }
}

export function addContextMenuCellHandlers(e) {
  if (!isGameFinished) {
    let target = e.target.closest('.row-cell');
    if (!target) return;
    e.preventDefault();
    if (!isGameStarted) toggleTimer();
    isGameStarted = true;
    toggleDisableGameButtons();
    crossOutCell(target);
  }
}

function highlightCell(cell) {
  cell.classList.remove('cross-visible');
  if (cell.classList.contains('highlight')) {
    cell.classList.remove('highlight');
    playSound(audio.undoClick.src);
    currentGamePlayBoard[cell.dataset.rowIndex][cell.dataset.cellIndex] = 0;
    checkForWin(gamePlayBoardToGuess, currentGamePlayBoard);
    return;
  }
  cell.classList.add('highlight');
  playSound(audio.leftClick.src);
  currentGamePlayBoard[cell.dataset.rowIndex][cell.dataset.cellIndex] = 1;
  checkForWin(gamePlayBoardToGuess, currentGamePlayBoard);
}

function crossOutCell(cell) {
  cell.classList.remove('highlight');
  cell.classList.toggle('cross-visible');
  playSound(audio.rightClick.src);
  currentGamePlayBoard[cell.dataset.rowIndex][cell.dataset.cellIndex] = 0;
  checkForWin(gamePlayBoardToGuess, currentGamePlayBoard);
}

function resetGame() {
  const sizeSelector = document.querySelector('#sizeSelector');
  currentGamePlayBoard = generateEmptyPlayboardArray(sizeSelector.value);
  redrawPlayBoard();

  if (!isGameFinished) {
    resetTimer();
  } else {
    elapsedTime = 0;
    updateTimerDisplay('.minutes', '.seconds');
  }
  isGameStarted = false;
  isGameFinished = false;
  toggleDisableGameButtons();
}

function checkForWin(sourcePlayBoard, currentPlayBoard) {
  if (sourcePlayBoard.length !== currentPlayBoard.length) {
    return false;
  }

  for (let i = 0; i < sourcePlayBoard.length; i++) {
    if (sourcePlayBoard[i].length !== currentPlayBoard[i].length) {
      return false;
    }
    for (let j = 0; j < sourcePlayBoard[i].length; j++) {
      if (sourcePlayBoard[i][j] !== currentPlayBoard[i][j]) {
        return false;
      }
    }
  }
  console.log('Win!');
  isGameFinished = true;
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  playSound(audio.win.src);
  if (isGameStarted) toggleTimer();
  fillModalWindowWithCongrats();

  saveWinResults(elapsedTime);
  isGameStarted = false;
  const saveGameButton = document.querySelector('#saveGameBtn');
  saveGameButton.disabled = !isGameStarted;
  elapsedTime = 0;
  fillSlideMenuWithScoreData();
}

async function selectRandomTemplate() {
  const sizeSelector = document.querySelector('#sizeSelector');
  const randomSizeIndex = getRandomInteger(0, optionsData.length - 1);
  const randomSizeValue = optionsData[randomSizeIndex].size;
  sizeSelector.value = String(randomSizeValue);
  resetTimer();
  selectInitTemplate();
  const availableTemplates = templates.filter(t => t.size === randomSizeValue);
  const randomTemplateIndex = getRandomInteger(
    0,
    availableTemplates.length - 1
  );
  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.value = availableTemplates[randomTemplateIndex].name;
  redrawPlayBoard();
  isGameStarted = false;
  isGameFinished = false;
  toggleDisableGameButtons();
  activateShowSolutionButton();
}

export function playSound(sound) {
  if (!mute) {
    sound.currentTime = 0;
    sound.play();
  }
}

/* Timer */
let timerInterval;
let elapsedTime = 0;

if (localStorage.getItem('timer')) {
  elapsedTime = parseInt(localStorage.getItem('timer'), 10);
}

export function updateTimerDisplay(minutes, seconds) {
  const minutesDisplay = document.querySelector(minutes);
  const secondsDisplay = document.querySelector(seconds);
  const calculatedMinutes = Math.floor(elapsedTime / 60);
  const calculatedSeconds = elapsedTime % 60;
  minutesDisplay.innerText = `${String(calculatedMinutes).padStart(2, '0')}`;
  secondsDisplay.innerText = `${String(calculatedSeconds).padStart(2, '0')}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    elapsedTime++;
    updateTimerDisplay('.minutes', '.seconds');
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
  localStorage.setItem('timer', elapsedTime);
}

export function toggleTimer() {
  if (timerInterval) {
    stopTimer();
    timerInterval = null;
  } else {
    startTimer();
  }
}

function resetTimer() {
  elapsedTime = 0;
  updateTimerDisplay('.minutes', '.seconds');
  if (timerInterval) {
    stopTimer();
    timerInterval = null;
  }
}

/* Preload audio to cash */
(function () {
  for (let sound in audio) {
    if (audio[sound]?.src) {
      audio[sound].src.load();
    }
  }
})();

generateModalWindow();
addSnackbarNotification();
generateSlideMenuLayout();
document.addEventListener('DOMContentLoaded', createGameLayout);
document.addEventListener('DOMContentLoaded', addControlsHandlers);
document.addEventListener('DOMContentLoaded', () =>
  updateTimerDisplay('.minutes', '.seconds')
);
window.addEventListener('beforeunload', () => {
  elapsedTime = 0;
  localStorage.removeItem('timer');
});
window.addEventListener('resize', updateRowCluesPosition);
