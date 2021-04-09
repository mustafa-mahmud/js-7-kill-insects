'use strict';

const gameStartBtn = document.querySelector('.game-start');
const screensEl = document.querySelectorAll('.screen');
const insectBtns = document.querySelectorAll('ul li button');
const gameContainerEl = document.querySelector('.game-container');
const scoreEl = document.querySelector('.score');
const timeEl = document.querySelector('.time');

let insectData = {};
let score = 0;
let seconds = 0;
let minutes = 0;

function switchScreen(index) {
  screensEl[index].classList.add('switch');
}

function killInsect(e) {
  e.target.parentElement.classList.add('kill');
  setTimeout(() => {
    e.target.parentElement.remove();
  }, 500);

  score++;
  scoreEl.textContent = `Score: ${score}`;

  setTimeout(createInsects, 1000);
  setTimeout(createInsects, 1500);
}

function timeStart() {
  seconds++;
  setTimeout(timeStart, 1000);

  if (seconds % 60 === 0) minutes++;
  const min = minutes < 10 ? `0${minutes}` : minutes;
  const sec = seconds < 10 ? `0${seconds}` : seconds;

  timeEl.textContent = `Time: ${min}:${sec}`;

  if (seconds === 60) seconds = 0;
}

function createInsects() {
  const randomRotate = Math.random() * 360;
  const div = document.createElement('div');
  div.classList.add('insect');
  div.innerHTML = `
	<img src="${insectData.src}" alt="${insectData.alt}" style="transform: rotate(${randomRotate}deg)" />
	`;

  const { x, y } = leftRight();

  div.style.left = `${x}px`;
  div.style.top = `${y}px`;

  div.addEventListener('click', killInsect);

  gameContainerEl.appendChild(div);
}

function leftRight() {
  const width = window.innerWidth;
  const hieght = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (hieght - 200) + 100;

  return { x, y };
}

function insectInfo(e) {
  if (e.target.localName !== 'img') return;

  const src = e.target.src;
  const alt = e.target.alt;

  insectData = { src, alt };

  setTimeout(createInsects, 1000);
  setTimeout(timeStart, 1000);

  switchScreen(1);
}

gameStartBtn.addEventListener('click', () => {
  switchScreen(0);
});
insectBtns.forEach((btn) => {
  btn.addEventListener('click', insectInfo);
});
