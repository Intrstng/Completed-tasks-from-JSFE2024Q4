import { generateRandomString } from './utils/generateRandomString.js';
import {
  highLightCharactersSequentially,
  highLightElement,
  highLightOutputField,
} from './utils/keyHighLighters.js';
import {
  clearOutputField,
  hideMessage,
  showMessage,
  toggleDisableNewGameButton,
  toggleDisableRepeatButton,
  toggleDisableSelect,
  toggleDisableStartButton,
  toggleElementVisibility,
} from './utils/elementVisibilityHandlers.js';
import { createStartLayout, drawKeyboard } from './utils/layoutConstructor.js';

export const TIME_DELAY = 700;
let roundCounter = 1;
let repeatCounter = 0;
let isKeyboardActive = false;
let isReadyToListenUser = false;
let isFinished = false;
let stringToGuess = '';

let keyClickHandlers = [];
let keydownHandler;
let keyupHandler;

export function initGame() {
  const difficulty = document.querySelector('#difficulty').value;
  stringToGuess = generateRandomString(difficulty, roundCounter).split('');
  isReadyToListenUser = false;
  clearOutputField();
  toggleElementVisibility('#output');
  toggleElementVisibility('#startButton');
  toggleElementVisibility('#repeat');
  toggleElementVisibility('#newGame');
  toggleElementVisibility('#round');

  toggleDisableKeyboard(false);
  toggleDisableNewGameButton(true);
  toggleDisableSelect(true);
  toggleDisableStartButton(true);
  toggleDisableRepeatButton(true);

  highLightCharactersSequentially(stringToGuess);
  temporaryDisableKeyboardAndClicks();
}

export function startNewGame() {
  roundCounter = 1;
  repeatCounter = 0;
  hideMessage();
  isReadyToListenUser = false;
  isFinished = false;
  clearOutputField();
  toggleDisableSelect(false);
  toggleDisableStartButton(false);
  document.querySelector('#output').classList.add('hidden');
  document.querySelector('#repeat').classList.add('hidden');
  document.querySelector('#newGame').classList.add('hidden');
  document.querySelector('#round').classList.add('hidden');
  document.querySelector('#nextRound').classList.add('hidden');
  document.querySelector('#startButton').classList.remove('hidden');
  const round = document.querySelector('#round');
  round.textContent = `Round ${roundCounter}`;
}

export function moveToTheNextRound() {
  const round = document.querySelector('#round');
  round.textContent = `Round ${roundCounter}`;

  hideMessage();
  initGame();
  repeatCounter = 0;

  toggleDisableRepeatButton(true);
  toggleElementVisibility('#output');
  toggleElementVisibility('#round');
  toggleElementVisibility('#startButton');
  toggleElementVisibility('#nextRound');
  toggleElementVisibility('#newGame');
}

function temporaryDisableKeyboardAndClicks() {
  setTimeout(
    () => {
      toggleDisableStartButton(false);
      toggleDisableNewGameButton(false);

      if (repeatCounter < 1) {
        toggleDisableRepeatButton(false);
      } else {
        toggleDisableRepeatButton(true);
      }

      toggleDisableKeyboard(true);
      isReadyToListenUser = true;
    },
    stringToGuess.length * TIME_DELAY + 300
  );
}

export function repeatSequence() {
  repeatCounter++;
  toggleDisableRepeatButton(true);
  clearOutputField();
  hideMessage();
  if (isReadyToListenUser && !isFinished) {
    highLightCharactersSequentially(stringToGuess);
    temporaryDisableKeyboardAndClicks();
  }
}

function checkIfStringsAreEqual(sampleStr, subStr) {
  const originalString = sampleStr.join('');

  if (originalString.toLowerCase().startsWith(subStr.toLowerCase())) {
    if (originalString.length === subStr.length) {
      toggleDisableKeyboard(false);
      highLightOutputField('success');
      // Actions for the final level
      roundCounter++;
      if (roundCounter > 5) {
        showMessage(
          'YOU ARE A WINNER!!! Congratulations! Click the ‘New Game’ button to start the game from the beginning'
        );
        isFinished = true;
        roundCounter = 1;
        toggleDisableRepeatButton(true);
        return;
      }

      toggleElementVisibility('#repeat');
      toggleElementVisibility('#nextRound');
      showMessage(
        'You win this round!!! Click ‘Next round‘ button to continue'
      );
    }
  } else {
    toggleDisableKeyboard(false);
    highLightOutputField('lose');
    if (repeatCounter >= 1) {
      isFinished = true;
      showMessage('You lose. Click ‘New game‘ button to play again');
    } else {
      highLightOutputField('lose');
      showMessage(
        'You lose. Try one more time. Click ‘Repeat the sequence‘ button to continue'
      );
    }
  }
}

export function addHandlers() {
  const output = document.getElementById('output');
  const keys = document.querySelectorAll('.key');
  let isKeyPressed = false;

  keys.forEach(key => {
    const clickHandler = () => {
      if (isKeyboardActive) {
        output.value += key.textContent;
        highLightElement(key, 'user');
        checkIfStringsAreEqual(stringToGuess, output.value);
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
        checkIfStringsAreEqual(stringToGuess, output.value);
      }
    }
  };

  keyupHandler = () => {
    isKeyPressed = false;
  };

  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('keyup', keyupHandler);
}

export function removeKeyHandlers() {
  keyClickHandlers.forEach(({ key, handler }) => {
    key.removeEventListener('click', handler);
  });
  keyClickHandlers = [];
}

export function removeKeydownHandler() {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
}

export function removeKeyUpHandler() {
  if (keyupHandler) {
    document.removeEventListener('keyup', keyupHandler);
    keyupHandler = null;
  }
}

export function toggleDisableKeyboard(flag) {
  isKeyboardActive = flag;

  const keyboardKeys = document.querySelectorAll('.key');
  keyboardKeys.forEach(key => {
    key.disabled = !flag;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const savedDifficulty = sessionStorage.getItem('selectedDifficulty');
  if (savedDifficulty) {
    createStartLayout(roundCounter);
    drawKeyboard(savedDifficulty);
    return;
  }
  createStartLayout(roundCounter);
  drawKeyboard();
});
