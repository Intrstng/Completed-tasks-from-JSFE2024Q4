import { keysDigit, keysLetter } from './keyboard.js';
import { generateRandomString } from './utils/generateRandomString.js';
import {
  highLightCharactersSequentially,
  highLightElement,
} from './utils/keyHighLighters.js';

export const TIME_DELAY = 700;
const roundCounter = 1;
let isKeyboardActive = false;

function createStartLayout() {
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
  startButton.addEventListener('click', startGame);
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
  // repeatButton.addEventListener('click', repeatGame);
  repeatButton.className = 'hidden';
  gameContainer.appendChild(repeatButton);

  const newGameButton = document.createElement('button');
  newGameButton.id = 'newGame';
  newGameButton.textContent = 'New game';
  // newGameButton.addEventListener('click', startGame);
  newGameButton.className = 'hidden';
  gameContainer.appendChild(newGameButton);

  const round = document.createElement('h2');
  round.id = 'round';
  round.textContent = `Round ${roundCounter}`;
  round.className = 'hidden';
  gameContainer.appendChild(round);

  document.body.append(title, gameContainer);
}

let keyClickHandlers = [];
let keydownHandler;
let keyupHandler;

function addHandlers() {
  const output = document.getElementById('output');
  const keys = document.querySelectorAll('.key');
  let isKeyPressed = false;

  keys.forEach(key => {
    const clickHandler = () => {
      if (isKeyboardActive) {
        output.value += key.textContent;
        highLightElement(key, 'user');
      }
    };
    key.addEventListener('click', clickHandler);
    keyClickHandlers.push({ key, clickHandler });
  });

  keydownHandler = event => {
    if (isKeyPressed) return;
    if (isKeyboardActive) {
      const key = event.key.toUpperCase();
      const button = Array.from(keys).find(k => k.textContent === key);

      if (button) {
        output.value += key;
        isKeyPressed = true;
        highLightElement(button, 'user');
      }
    }
  };

  keyupHandler = () => {
    isKeyPressed = false;
  };

  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('keyup', keyupHandler);
}

function removeKeyHandlers() {
  keyClickHandlers.forEach(({ key, handler }) => {
    key.removeEventListener('click', handler);
  });
  keyClickHandlers = [];
}

function removeKeydownHandler() {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
}

function removeKeyUpHandler() {
  if (keyupHandler) {
    document.removeEventListener('keyup', keyupHandler);
    keyupHandler = null;
  }
}

function drawKeyboard(value = 'easy') {
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

function clearOutputField() {
  const output = document.getElementById('output');
  output.value = '';
}

function toggleDisableStartButton() {
  const button = document.querySelector('#startButton');
  button.disabled = !button.disabled;
}

function toggleDisableKeyboard(flag) {
  isKeyboardActive = flag;

  const keyboardKeys = document.querySelectorAll('.key');
  keyboardKeys.forEach(key => {
    key.disabled = !key.disabled;
  });
}

function toggleDisableSelect(flag) {
  const difficulty = document.querySelector('#difficulty');
  difficulty.disabled = flag;
}

function toggleElementVisibility(id) {
  const element = document.querySelector(id);
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

// function addCurrentLevelIndicator(level = 1) {
//
// }

function startGame() {
  const difficulty = document.querySelector('#difficulty').value;
  const stringToGuess = generateRandomString(difficulty, 3).split('');

  clearOutputField();
  toggleDisableSelect(true);
  toggleDisableStartButton();

  toggleElementVisibility('#output');
  toggleElementVisibility('#startButton');
  toggleElementVisibility('#repeat');
  toggleElementVisibility('#newGame');
  toggleElementVisibility('#round');

  toggleDisableKeyboard(false);
  highLightCharactersSequentially(stringToGuess);
  setTimeout(
    () => {
      toggleDisableStartButton();
      toggleDisableKeyboard(true);
    },
    stringToGuess.length * TIME_DELAY + 300
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const savedDifficulty = sessionStorage.getItem('selectedDifficulty');
  if (savedDifficulty) {
    createStartLayout();
    drawKeyboard(savedDifficulty);
    return;
  }
  createStartLayout();
  drawKeyboard();
});
