import { keysCombined, keysDigit, keysLetter } from './keyboard.js';

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

  document.body.append(title);
  document.body.append(gameContainer);
  document.body.append(output);
}

let keyClickHandlers = [];
let keydownHandler;

function addHandlers() {
  const output = document.getElementById('output');
  const keys = document.querySelectorAll('.key');

  keys.forEach(key => {
    const clickHandler = () => {
      output.value += key.textContent;
    };
    key.addEventListener('click', clickHandler);
    keyClickHandlers.push({ key, clickHandler });
  });

  keydownHandler = event => {
    const key = event.key.toUpperCase();
    if (Array.from(keys).some(k => k.textContent === key)) {
      output.value += key;
    }
  };

  document.addEventListener('keydown', keydownHandler);
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

function startGame() {
  console.log('Start!');
}

function drawKeyboard(value = 'easy') {
  let keys;
  const keyboard = document.createElement('div');
  keyboard.id = 'keyboard';

  switch (value) {
    case 'easy':
      keys = keysDigit;
      break;
    case 'medium':
      keys = keysLetter;
      break;
    case 'hard':
      keys = keysCombined;
      break;
    default:
      console.error('Unknown difficulty level entered:', value);
      break;
  }

  keys.forEach(key => {
    const keyButton = document.createElement('div');
    keyButton.className = 'key';
    keyButton.textContent = key.char;
    keyButton.dataset.charCode = key.charCode;
    keyboard.append(keyButton);
  });

  const keyboardOnScreen = document.querySelector('#keyboard');
  if (!keyboardOnScreen) {
    document.body.append(keyboard);
  } else {
    keyboardOnScreen.innerHTML = '';
    keyboardOnScreen.append(...keyboard.childNodes);
  }

  clearOutputField();
  addHandlers();
}

function clearOutputField() {
  const output = document.getElementById('output');
  output.value = '';
}

document.addEventListener('DOMContentLoaded', function () {
  drawKeyboard();
});

createStartLayout();
