import { keysDigit, keysLetter } from './keyboard.js';

function createStartLayout() {
  const title = document.createElement('h1');
  title.textContent = 'Simon says Game';

  const gameContainer = document.createElement('div');
  gameContainer.id = 'gameContainer';

  const label = document.createElement('label');
  label.setAttribute('for', 'difficulty');
  label.textContent = 'Select difficulty level:';
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

  select.addEventListener('change', () => {
    select.blur();
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

  document.body.append(title, gameContainer, output);
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
      output.value += key.textContent;
    };
    key.addEventListener('click', clickHandler);
    keyClickHandlers.push({ key, clickHandler });
  });

  keydownHandler = event => {
    if (isKeyPressed) return;

    const key = event.key.toUpperCase();
    if (Array.from(keys).some(k => k.textContent === key)) {
      output.value += key; // Adds character to the input field
      isKeyPressed = true;
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

function startGame() {
  console.log('Start!');
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
      const keyButton = document.createElement('div');
      keyButton.classList.add('key', 'digit');
      keyButton.textContent = key.char;
      keyButton.dataset.charCode = key.charCode;

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
      const keyButton = document.createElement('div');
      keyButton.classList.add('key', 'letter');
      console.log(currentLetterKeys[i]);
      keyButton.textContent = currentLetterKeys[i]?.char;
      keyButton.dataset.charCode = currentLetterKeys[i]?.charCode;

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

document.addEventListener('DOMContentLoaded', function () {
  drawKeyboard();
});

createStartLayout();
