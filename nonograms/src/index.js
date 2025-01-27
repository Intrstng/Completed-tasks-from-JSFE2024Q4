import './styles.scss';
import { optionsData, templates } from './templates.js';
import scoresImg from '../assets/scores.png';
import soundOnImg from '../assets/sound-on.png';
import soundOffImg from '../assets/sound-off.png';
import lightImg from '../assets/light.png';
import darkImg from '../assets/dark.png';
import { getRandomInteger } from './utils/getRandomInteger';
import { generateEmptyPlayboardArray } from './utils/generateEmptyPlayboardArray';

let gamePlayboardToGuess = [];
let currentGamePlayboard = [];

function createGameLayout() {
  const board = document.createElement('div');
  board.id = 'board';

  const header = document.createElement('h1');
  header.id = 'header';
  header.textContent = 'Nonograms game';

  const controls = document.createElement('div');
  controls.id = 'controls';

  const scoresButton = document.createElement('button');
  scoresButton.id ='scoresButton';
  scoresButton.className = 'controls-button';
  const scoresLogo = document.createElement('img');
  scoresLogo.setAttribute('src', scoresImg);
  scoresLogo.setAttribute('alt', 'Scores button');
  scoresButton.append(scoresLogo);

  const soundButton = document.createElement('button');
  soundButton.id ='soundButton';
  soundButton.className = 'controls-button';
  const soundLogo = document.createElement('img');
  soundLogo.setAttribute('src', soundOnImg);
  soundLogo.setAttribute('alt', 'Sound button');
  soundButton.append(soundLogo);

  const themeButton = document.createElement('button');
  themeButton.id ='themeButton';
  themeButton.className = 'controls-button';
  const themeLogo = document.createElement('img');
  themeLogo.setAttribute('src', lightImg);
  themeLogo.setAttribute('alt', 'Theme button');
  themeButton.append(themeLogo);

  controls.append(scoresButton, soundButton, themeButton);

  const gameOptions = document.createElement('div');
  gameOptions.id = 'gameOptions';

  const difficultyLabel = document.createElement('label');
  difficultyLabel.setAttribute('for', 'sizeSelector');
  difficultyLabel.innerText = 'Select size of board and template:';

  const sizeSelectorWrapper = document.createElement('div');
  sizeSelectorWrapper.className = 'size-select-wrapper';

  const sizeSelector = document.createElement('select');
  sizeSelector.id = 'sizeSelector';

  optionsData.forEach((data) => {
    const level = document.createElement('option');
    level.setAttribute('value', data.size);
    level.textContent = data.name;
    sizeSelector.append(level);
  })

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

  gameOptions.append(difficultyLabel, sizeSelectorWrapper, templateSelectorWrapper, randomGameButton)

  const timer = document.createElement('p');
  timer.id = 'timer';

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

  const resetGameButton = document.createElement('button');
  resetGameButton.id = 'resetGameBtn';
  resetGameButton.textContent = 'Reset Game';
  resetGameButton.className = 'game-button';

  const solutionButton = document.createElement('button');
  solutionButton.id = 'solutionBtn';
  solutionButton.textContent = 'Show Solution';
  solutionButton.className = 'game-button';

  buttonContainer.append(saveGameButton, continueGameButton, resetGameButton, solutionButton);

  board.append(header, controls, gameOptions, timer, buttonContainer, playBoard);
  document.body.append(board);
  selectInitTemplate();
  createGamePlayBoard(playBoard, templates, templateSelector.value);
}

function createGamePlayBoard(container, templates, value = 'Dinosaur') {
  let rowCluesLength = 1;
  let rowCluesLeftPosition = '';
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
  columnCluesContainer.classList.add('column-clues', `column-clue-size-${templateObject.size}`);

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
  rowCluesContainer.classList.add('row-clues', `row-clue-size-${templateObject.size}`);

  for (let i = 0; i < templateObject.clues[1].length; i++) {
    const rowClueBox = document.createElement('div');
    rowClueBox.className = 'row-clue-box';
    for (let j = 0; j < templateObject.clues[1][i].length; j++) {
      const rowClueItem = document.createElement('span');
      rowClueItem.className = 'row-clue-item';
      rowClueItem.textContent = templateObject.clues[1][i][j];
      rowCluesLength = rowCluesLength <= templateObject.clues[1][i].length ? templateObject.clues[1][i].length : rowCluesLength;
      if (!templateObject.clues[1][i][j]) {
        templateObject.clues[1][i][j] = 0;
        rowClueItem.classList.add('hidden');
      }
      rowClueBox.append(rowClueItem);
    }
    rowCluesContainer.append(rowClueBox);
  }

  switch (rowCluesLength) {
    case 1:
      rowCluesLeftPosition = '-29px';
      break;
    case 2:
      rowCluesLeftPosition = '-54px';
      break;
    case 3:
      rowCluesLeftPosition = '-79px';
      break;
    case 4:
      rowCluesLeftPosition = '-104px';
      break;
    default:
      rowCluesLeftPosition = '-29px';
  }

  rowCluesContainer.style.left = rowCluesLeftPosition;

  container.prepend(columnCluesContainer);
  mainBoard.append(rowCluesContainer);
  container.append(mainBoard);
  gamePlayboardToGuess = templateObject.playboard;
}

function addControlsHandlers() {
  const sizeSelector = document.querySelector('#sizeSelector');
  sizeSelector.addEventListener('change', reselectTemplate);

  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.addEventListener('change', redrawPlayboard);

  const randomGameButton = document.querySelector('#randomGameBtn');
  randomGameButton.addEventListener('click', selectRandomTemplate);

  addHandleCellClick();
}

function addHandleCellClick() {
  const mainBoard = document.querySelector('.main-board');
  mainBoard.addEventListener('click', handleCellClick);
}

function handleCellClick(e) {
  addCellHandlers(e)
}

function redrawPlayboard() {
  const playBoard = document.querySelector('#playBoard');
  const sizeSelector = document.querySelector('#sizeSelector');
  const templateSelector = document.querySelector('#templateSelector');
  playBoard.innerHTML = '';
  playBoard.className = '';
  currentGamePlayboard = generateEmptyPlayboardArray(sizeSelector.value);
  createGamePlayBoard(playBoard, templates, templateSelector.value);

  removeHandleCellClick();
  addHandleCellClick();
}

function reselectTemplate() {
  selectInitTemplate();
  redrawPlayboard();
}

function removeHandleCellClick() {
  const mainBoard = document.querySelector('.main-board');
  mainBoard.removeEventListener('click', handleCellClick);
}

function selectInitTemplate() {
  const sizeSelector = document.querySelector('#sizeSelector');
  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.innerHTML = '';
  currentGamePlayboard = generateEmptyPlayboardArray(sizeSelector.value);

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




function addCellHandlers(e) {
  let target = e.target.closest('.row-cell');
  if (!target) return;
  highlightCell(target);
}

function highlightCell(cell) {
  if (cell.classList.contains('highlight')) {
    cell.classList.remove('highlight');
    currentGamePlayboard[cell.dataset.rowIndex][cell.dataset.cellIndex] = 0;
    return;
  }
  cell.classList.add('highlight');
  currentGamePlayboard[cell.dataset.rowIndex][cell.dataset.cellIndex] = 1;
  checkForWin(gamePlayboardToGuess, currentGamePlayboard);
  // console.log(currentGamePlayboard);
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
                  console.log('Win')
                  return true;
}

function selectRandomTemplate() {
  const availableTemplates = document.querySelectorAll('.template-option');

  const randomIndex = getRandomInteger(0, availableTemplates.length - 1);
  const templateSelector = document.querySelector('#templateSelector');
  templateSelector.value = availableTemplates[randomIndex].value;
  redrawPlayboard();
}

document.addEventListener('DOMContentLoaded', createGameLayout);
document.addEventListener('DOMContentLoaded', addControlsHandlers);