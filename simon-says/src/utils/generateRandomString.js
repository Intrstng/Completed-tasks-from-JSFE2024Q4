import { keysCombined, keysDigit, keysLetter } from '../keyboard.js';
import { getRandomInteger } from './getRandomInteger.js';

export function generateRandomString(difficulty = 'easy', level = 1) {
  let charList;
  let result = '';

  switch (difficulty) {
    case 'easy':
      charList = keysDigit;
      break;
    case 'medium':
      charList = keysLetter;
      break;
    case 'hard':
      charList = keysCombined;
      break;
    default:
      charList = keysDigit;
      break;
  }

  for (let i = 1; i <= level * 2; i++) {
    const randomIndex = getRandomInteger(0, charList.length - 1);
    result += charList[randomIndex].char.toLocaleLowerCase();
  }
  console.log(
    `%cKeyboard character sequence for %c${difficulty} %cdifficulty and level %c${level} %cis: %c${result}`,
    'color: green;',
    'color: red;',
    'color: green;',
    'color: blue;',
    'color: green;',
    'color: magenta;'
  );
  return result;
}
