import './styles.scss';
import { optionsData, templates } from './templates.js';


function createGameLayout() {
  const board = document.createElement('div');
  board.id = '#board';

  const header = document.createElement('h1');
  header.id = '#header';
  header.textContent = 'Nonograms game';

  const controls = document.createElement('div');
  controls.id = '#controls';

  const scoresButton = document.createElement('button');
  scoresButton.id ='#scoresButton';

  const soundButton = document.createElement('button');
  soundButton.id ='#soundButton';

  const themeButton = document.createElement('button');
  themeButton.id ='#themeButton';

  controls.append(scoresButton, soundButton, themeButton);

  const gameOptions = document.createElement('div');
  gameOptions.id = '#gameOptions';

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
      templateOption.setAttribute('value', template.size);
      templateOption.textContent = template.name;
      templateSelector.append(templateOption);
    }
  });

  const randomGameButton = document.createElement('button');
  randomGameButton.id = '#randomGameBtn';
  randomGameButton.textContent = 'Random Game'

  gameOptions.append(difficultyLabel, sizeSelector, templateSelector, randomGameButton)

  const timer = document.createElement('p');
  timer.id = '#timer';

  const playBoard = document.createElement('div');
  playBoard.id = '#playBoard';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttonContainer';

  const saveGameButton = document.createElement('button');
  saveGameButton.id = '#saveGameBtn';
  saveGameButton.textContent = 'Save Game';

  const continueGameButton = document.createElement('button');
  continueGameButton.id = '#continueGameBtn';
  continueGameButton.textContent = 'Continue Game';

  const resetGameButton = document.createElement('button');
  resetGameButton.id = '#resetGameBtn';
  resetGameButton.textContent = 'Reset Game';

  const solutionButton = document.createElement('button');
  solutionButton.id = '#solutionBtn';
  solutionButton.textContent = 'Show Solution';

  buttonContainer.append(saveGameButton, continueGameButton, resetGameButton, solutionButton);

  board.append(header, controls, gameOptions, timer, playBoard, buttonContainer);
  document.body.append(board);
}

document.addEventListener('DOMContentLoaded', createGameLayout);