import closeImg from '../../assets/close.png';
import { audio } from './audio';
import { playSound } from '../index.js';

export function generateSlideMenuLayout() {
  const slidingMenu = document.createElement('div');
  slidingMenu.id = 'slidingMenu';
  slidingMenu.className = 'menu';

  const closeMenuButton = document.createElement('span');
  closeMenuButton.id = 'closeMenuButton';
  closeMenuButton.className = 'close';

  const crossLogo = document.createElement('img');
  crossLogo.src = closeImg;
  crossLogo.alt = 'Close';
  closeMenuButton.appendChild(crossLogo);

  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'resultsContainer';

  const scoresTitle = document.createElement('h2');
  scoresTitle.className = 'scores-title';
  scoresTitle.textContent = 'High Score Table';

  const noScoresMessage = document.createElement('h3');
  noScoresMessage.className = 'no-scores-message';

  resultsContainer.append(scoresTitle);
  createScoreTable(resultsContainer);
  resultsContainer.append(noScoresMessage);
  slidingMenu.append(closeMenuButton, resultsContainer);
  document.body.append(slidingMenu);
}

export function slideMenu() {
  const slidingMenu = document.getElementById('slidingMenu');
  const toggleMenuButton = document.getElementById('scoresButton');
  const closeMenuButton = document.getElementById('closeMenuButton');

  toggleMenuButton.addEventListener('click', () => {
    playSound(audio.toggle.src);
    slidingMenu.classList.toggle('open');
    fillSlideMenuWithScoreData();
  });

  closeMenuButton.addEventListener('click', () => {
    playSound(audio.close.src);
    slidingMenu.classList.remove('open');
  });
}

function createScoreTable(container) {
  const headContent = ['Position', 'Template', 'Level', 'Time'];
  const scoresTable = document.createElement('table');
  scoresTable.className = 'score-table';
  const tableHead = document.createElement('thead');
  const tableRow = document.createElement('tr');
  const tableBody = document.createElement('tbody');
  tableBody.className = 'table-body';

  headContent.forEach(content => {
    const cell = document.createElement('th');
    cell.className = 'table-head-cell';
    cell.textContent = content;
    tableRow.append(cell);
  })

  tableHead.append(tableRow);
  scoresTable.append(tableHead, tableBody);
  container.append(scoresTable);
}

function fillSlideMenuWithScoreData() {
  const resultsContainer = document.querySelector('.table-body');
  const noScoresMessage = document.querySelector('.no-scores-message');
  const storedData = localStorage.getItem('winResults');
  let lastFiveItemsAsc = [];
  resultsContainer.innerHTML = '';
  if (storedData) {
    lastFiveItemsAsc = JSON.parse(storedData).slice(-5).sort((a, b) => a.time - b.time);
    noScoresMessage.innerHTML = '';

    lastFiveItemsAsc.forEach((scoreRecords, index) => {
      const calculatedMinutes = `${String(Math.floor(scoreRecords.time / 60)).padStart(2, '0')}`
      const calculatedSeconds = `${String(scoreRecords.time % 60).padStart(2, '0')}`;

      const scoreRow = document.createElement('tr');
      scoreRow.className = 'scoreRow';

      const positionCell = document.createElement('td');
      positionCell.textContent = String(index + 1);
      const templateCell = document.createElement('td');
      templateCell.textContent = scoreRecords.template;
      const levelCell = document.createElement('td');
      levelCell.textContent = scoreRecords.level;
      const timeCell = document.createElement('td');
      timeCell.textContent = `${calculatedMinutes}:${calculatedSeconds}`;

      scoreRow.append(positionCell, templateCell, levelCell, timeCell);
      resultsContainer.append(scoreRow);
    });
  } else {
    resultsContainer.innerHTML = '';
    const emptyRow = document.createElement('tr');
    for (let i = 1; i <= 4; i++) {
      const emptyCell = document.createElement('td');
      emptyCell.className = 'empty-cell';
      emptyCell.textContent = '...';
      emptyRow.append(emptyCell);
    }
    resultsContainer.append(emptyRow);
    noScoresMessage.textContent = 'No saved high scores';
  }
  resultsContainer.append()
}