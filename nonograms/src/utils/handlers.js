import { addCellHandlers, addContextMenuCellHandlers } from '../index.js';

export function addHandleCellClick() {
  const mainBoard = document.querySelector('.main-board');
  mainBoard.addEventListener('click', addCellHandlers);
  mainBoard.addEventListener('contextmenu', addContextMenuCellHandlers);
}

export function removeHandleCellClick() {
  const mainBoard = document.querySelector('.main-board');
  mainBoard.removeEventListener('click', addCellHandlers);
  mainBoard.removeEventListener('contextmenu', addContextMenuCellHandlers);
}
