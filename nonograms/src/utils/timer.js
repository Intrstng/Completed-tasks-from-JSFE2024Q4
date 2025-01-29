// let timerInterval;
// let elapsedTime = 0;
// //
// // document.addEventListener('DOMContentLoaded', () => {
// //   if (localStorage.getItem('timer')) {
// //     elapsedTime = parseInt(localStorage.getItem('timer'), 10);
// //     updateTimerDisplay();
// //   }
// // })
//
//   if (localStorage.getItem('timer')) {
//     elapsedTime = parseInt(localStorage.getItem('timer'), 10);
//     updateTimerDisplay();
//   }
//
// function updateTimerDisplay() {
//   const minutesDisplay = document.querySelector('.minutes');
//   const secondsDisplay = document.querySelector('.seconds');
//   console.log(minutesDisplay)
//   const minutes = Math.floor(elapsedTime / 60);
//   const seconds = elapsedTime % 60;
//   minutesDisplay.innerText = `${String(minutes).padStart(2, '0')}`
//   secondsDisplay.innerText = `${String(seconds).padStart(2, '0')}`;
// }
//
// function startTimer() {
//   timerInterval = setInterval(() => {
//     elapsedTime++;
//     updateTimerDisplay();
//   }, 1000);
// }
//
// export function stopTimer() {
//   clearInterval(timerInterval);
//   localStorage.setItem('timer', elapsedTime);
// }
//
// export function toggleTimer() {
//   if (timerInterval) {
//     stopTimer();
//     timerInterval = null;
//   } else {
//     startTimer();
//   }
// }
