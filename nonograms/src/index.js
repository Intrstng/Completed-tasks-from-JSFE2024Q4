import './styles.scss';
import { optionsData, templates } from './templates.js';
import scoresImg from '../assets/scores.png';
import soundOnImg from '../assets/sound-on.png';
import soundOffImg from '../assets/sound-off.png';
import lightImg from '../assets/light.png';
import darkImg from '../assets/dark.png';


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

  const sizeSelector = document.createElement('select');
  sizeSelector.id = 'sizeSelector';

  optionsData.forEach((data) => {
    const level = document.createElement('option');
    level.setAttribute('value', data.size);
    level.textContent = data.name;
    sizeSelector.append(level);
  })

  const templateSelector = document.createElement('select');
  sizeSelector.id = 'templateSelector';

  templates.forEach(template => {
    if (template.size === Number(sizeSelector.value)) {
      const templateOption = document.createElement('option');
      templateOption.setAttribute('value', template.name);
      templateOption.textContent = template.name;
      templateSelector.append(templateOption);
    }
  });

  const randomGameButton = document.createElement('button');
  randomGameButton.id = 'randomGameBtn';
  randomGameButton.textContent = 'Random Game';
  randomGameButton.className = 'game-button';

  gameOptions.append(difficultyLabel, sizeSelector, templateSelector, randomGameButton)

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

  createGamePlayBoard(playBoard, templates, 'Brigantine');

  board.append(header, controls, gameOptions, timer, buttonContainer, playBoard);
  document.body.append(board);
}

function createGamePlayBoard(container, templates, value = 'Dinosaur') {
  const templateObject = templates.find(t => t.name === value);

  container.classList.add(`size-${templateObject.size}`);

  const mainBoard = document.createElement('div');
  mainBoard.className = 'main-board';

  for (let i = 0; i < templateObject.size; i++) {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'row';
    rowContainer.style.gridTemplateColumns = `repeat(${templateObject.size}, 30px)`;
    for (let j = 0; j < templateObject.size; j++) {
      const rowCell = document.createElement('div');
      rowCell.className = 'row-cell';
      rowContainer.append(rowCell);
    }
    mainBoard.append(rowContainer);
  }

  const columnCluesContainer = document.createElement('div');
  columnCluesContainer.className = 'column-clues';

  for (let i = 0; i < templateObject.clues[0].length; i++) {
    const columnClueBox = document.createElement('div');
    columnClueBox.className = 'column-clue-box';
    for (let j = 0; j < templateObject.clues[0][i].length; j++) {
      const columnClueItem = document.createElement('span');
      columnClueItem.className = 'column-clue-item';
      columnClueItem.textContent = templateObject.clues[0][i][j];
      columnClueBox.append(columnClueItem);
    }
    columnCluesContainer.append(columnClueBox);
  }

  const rowCluesContainer = document.createElement('div');
  rowCluesContainer.className = 'row-clues';

  for (let i = 0; i < templateObject.clues[1].length; i++) {
    const rowClueBox = document.createElement('div');
    rowClueBox.className = 'row-clue-box';
    for (let j = 0; j < templateObject.clues[1][i].length; j++) {
      const rowClueItem = document.createElement('span');
      rowClueItem.className = 'row-clue-item';
      rowClueItem.textContent = templateObject.clues[1][i][j];
      rowClueBox.append(rowClueItem);
    }
    rowCluesContainer.append(rowClueBox);
  }
  container.append(mainBoard, columnCluesContainer, rowCluesContainer);
}

document.addEventListener('DOMContentLoaded', createGameLayout);