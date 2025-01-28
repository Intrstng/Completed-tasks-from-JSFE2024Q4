import leftClickSound from '../../assets/sounds/left-click.mp3';
import rightClickSound from '../../assets/sounds/right-click.mp3';
import undoClickSound from '../../assets/sounds/undo.mp3';
import winSound from '../../assets/sounds/win.mp3';
import failSound from '../../assets/sounds/fail.mp3';
import toggleSound from '../../assets/sounds/toggle.mp3';

export const audio = {
  leftClick: {
    src: new Audio(leftClickSound),
  },
  rightClick: {
    src: new Audio(rightClickSound),
  },
  undoClick: {
    src: new Audio(undoClickSound),
  },
  win: {
    src: new Audio(winSound),
  },
  fail: {
    src: new Audio(failSound),
  },
  toggle: {
    src: new Audio(toggleSound),
  }
}
