import {
  addHandlers,
  moveToTheNextRound,
  removeKeydownHandler,
  removeKeyHandlers,
  removeKeyUpHandler,
  repeatSequence,
  initGame,
  startNewGame,
  toggleDisableKeyboard,
} from '../index.js';
import { clearOutputField } from './elementVisibilityHandlers.js';
import { keysDigit, keysLetter } from '../keyboard.js';

export function createStartLayout(counter) {
  const title = document.createElement('h1');
  title.textContent = 'Simon says Game';

  const gameContainer = document.createElement('div');
  gameContainer.id = 'gameContainer';

  const label = document.createElement('label');
  label.setAttribute('for', 'difficulty');
  label.textContent = 'Select difficulty level';
  gameContainer.appendChild(label);

  const select = document.createElement('select');
  select.id = 'difficulty';

  const levels = ['Easy', 'Medium', 'Hard'];
  levels.forEach(element => {
    const option = document.createElement('option');
    option.value = element.toLowerCase();
    option.textContent = element;
    select.appendChild(option);
  });
  gameContainer.appendChild(select);

  const savedDifficulty = sessionStorage.getItem('selectedDifficulty');
  if (savedDifficulty) {
    select.value = savedDifficulty;
  }

  select.addEventListener('change', () => {
    sessionStorage.setItem('selectedDifficulty', select.value);
    select.blur();
    toggleDisableKeyboard(false);
    removeKeyHandlers();
    removeKeydownHandler();
    removeKeyUpHandler();
    drawKeyboard(select.value);
  });

  const startButton = document.createElement('button');
  startButton.id = 'startButton';
  startButton.textContent = 'Start';
  startButton.addEventListener('click', initGame);
  gameContainer.appendChild(startButton);

  const output = document.createElement('input');
  output.id = 'output';
  output.setAttribute('type', 'text');
  output.readOnly = true;
  output.className = 'hidden';
  gameContainer.appendChild(output);

  const repeatButton = document.createElement('button');
  repeatButton.id = 'repeat';
  repeatButton.textContent = 'Repeat the sequence';
  repeatButton.addEventListener('click', repeatSequence);
  repeatButton.className = 'hidden';
  gameContainer.appendChild(repeatButton);

  const nextRound = document.createElement('button');
  nextRound.id = 'nextRound';
  nextRound.textContent = 'Next round';
  nextRound.addEventListener('click', moveToTheNextRound);
  nextRound.className = 'hidden';
  gameContainer.appendChild(nextRound);

  const newGameButton = document.createElement('button');
  newGameButton.id = 'newGame';
  newGameButton.textContent = 'New game';
  newGameButton.addEventListener('click', startNewGame);
  newGameButton.className = 'hidden';
  gameContainer.appendChild(newGameButton);

  const round = document.createElement('h2');
  round.id = 'round';
  round.textContent = `Round ${counter}`;
  round.className = 'hidden';
  gameContainer.appendChild(round);

  const message = document.createElement('p');
  message.id = 'message';
  message.className = 'hidden';

  document.body.append(title, gameContainer, message);
}

export function drawKeyboard(value = 'easy') {
  let currentDigitKeys = null;
  let currentLetterKeys = null;

  const keyboardDigit = document.createElement('div');
  const keyboardLetter = document.createElement('div');

  keyboardDigit.id = 'keyboardDigit';
  keyboardLetter.id = 'keyboardLetter';

  switch (value) {
    case 'easy':
      currentDigitKeys = keysDigit;
      break;
    case 'medium':
      currentLetterKeys = keysLetter;
      break;
    case 'hard':
      currentDigitKeys = keysDigit;
      currentLetterKeys = keysLetter;
      break;
    default:
      console.error('Unknown difficulty level entered:', value);
      break;
  }

  if (currentDigitKeys) {
    currentDigitKeys.forEach(key => {
      const keyButton = document.createElement('button');
      keyButton.classList.add('key', 'digit');
      keyButton.textContent = key.char;
      keyButton.dataset.char = key.char;

      keyboardDigit.append(keyButton);
    });
  }

  if (currentLetterKeys) {
    const row_1 = document.createElement('div');
    const row_2 = document.createElement('div');
    const row_3 = document.createElement('div');
    row_1.classList.add('row', 'row-1');
    row_2.classList.add('row', 'row-2');
    row_3.classList.add('row', 'row-3');

    for (let i = 0; i <= currentLetterKeys.length; i++) {
      const keyButton = document.createElement('button');
      keyButton.classList.add('key', 'letter');
      keyButton.textContent = currentLetterKeys[i]?.char;
      keyButton.dataset.char = currentLetterKeys[i]?.char.toLowerCase();

      if (i >= 0 && i < 10) {
        row_1.append(keyButton);
      }

      if (i >= 10 && i <= 18) {
        row_2.append(keyButton);
      }

      if (i >= 19 && i <= 25) {
        row_3.append(keyButton);
      }
    }
    keyboardLetter.append(row_1, row_2, row_3);
  }

  updateKeyboardOnScreen('#keyboardDigit', keyboardDigit);
  updateKeyboardOnScreen('#keyboardLetter', keyboardLetter);

  clearOutputField();
  addHandlers();
}

function updateKeyboardOnScreen(id, keyboard) {
  const keyboardOnScreen = document.querySelector(id);
  if (!keyboardOnScreen) {
    document.body.append(keyboard);
  } else {
    keyboardOnScreen.innerHTML = '';
    keyboardOnScreen.append(...keyboard.childNodes);
  }
}
