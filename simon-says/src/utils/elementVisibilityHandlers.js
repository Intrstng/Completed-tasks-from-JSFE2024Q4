export function toggleDisableStartButton(flag) {
  const button = document.querySelector('#startButton');
  button.disabled = flag;
}

export function toggleDisableSelect(flag) {
  const difficulty = document.querySelector('#difficulty');
  difficulty.disabled = flag;
}

export function toggleDisableRepeatButton(flag) {
  const repeatButton = document.querySelector('#repeat');
  repeatButton.disabled = flag;
}

export function toggleDisableNewGameButton(flag) {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.disabled = flag;
}

export function toggleElementVisibility(id) {
  const element = document.querySelector(id);
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

export function hideMessage() {
  const message = document.querySelector('#message');
  message.textContent = '';
  message.classList.add('hidden');
}

export function showMessage(text) {
  const message = document.querySelector('#message');
  message.textContent = text;
  toggleElementVisibility('#message');
}

export function clearOutputField() {
  const output = document.getElementById('output');
  output.value = '';
}
