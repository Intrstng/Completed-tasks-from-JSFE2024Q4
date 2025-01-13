import { TIME_DELAY } from '../index.js';

export function highLightElement(element, control) {
  let classActive;

  if (control === 'pc') {
    classActive = 'active-pc';
  } else if (control === 'user') {
    classActive = 'active-user';
  }

  element.classList.add(classActive);
  setTimeout(() => {
    element.classList.remove(classActive);
  }, 300);
}

function highLightButtonWithSymbolToRemember(char) {
  const button = document.querySelector(`[data-char="${char}"]`);
  if (button) {
    highLightElement(button, 'pc');
  }
}

export function highLightCharactersSequentially(chars) {
  let index = 0;

  const interval = setInterval(() => {
    if (index < chars.length) {
      highLightButtonWithSymbolToRemember(chars[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  }, TIME_DELAY);
}
