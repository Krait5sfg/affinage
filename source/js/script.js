'use strict';

//слайдер
const slider = document.querySelector(`.slider__list`);
let activeElement = document.querySelector(`.slider__item--active`);
let number = +activeElement.dataset.number;

const slideTitle = document.querySelector(`.slider__image-title`);
const slideCurrentNumberElement = document.querySelector(`.slider__current-number`);
const overallNumber = document.querySelectorAll(`.slider__item`).length;
document.querySelector(`.slider__overall-number`).textContent = ` ${overallNumber - 2}`;

setSlideTitle();
setSlideNumber();

slider.scrollLeft = 170;

let start;
let change;

slider.addEventListener('touchstart', (evt) => {
  start = evt.touches[0].clientX; // координаты прикосновения
});

slider.addEventListener('touchmove', (evt) => {
  evt.preventDefault();
  change = start - evt.touches[0].clientX; //evt.touches[0].clientX координаты где палец оторвался от экрана
});

slider.addEventListener('touchend', (evt) => {
  activeElement.classList.remove('slider__item--active');

  if (change > 0) {
    try {
      slider.scrollLeft += 220;
      number++;
      if (slider.querySelector(`[data-number="${number}"]`)) { }
      activeElement = slider.querySelector(`[data-number="${number}"]`);
      activeElement.classList.add(`slider__item--active`);
    } catch (error) {
      number--;
      slider.scrollLeft -= 170;
      activeElement = slider.querySelector(`[data-number="${number}"]`);
      activeElement.classList.add(`slider__item--active`);
    }
  } else {
    try {
      number--;
      slider.scrollLeft -= 220;
      activeElement = slider.querySelector(`[data-number="${number}"]`);
      activeElement.classList.add(`slider__item--active`);
    } catch (error) {
      number++;
      slider.scrollLeft += 170;
      activeElement = slider.querySelector(`[data-number="${number}"]`);
      activeElement.classList.add(`slider__item--active`);
    }
  }
  setSlideTitle();
  setSlideNumber();
});

function setSlideTitle() {
  slideTitle.textContent = activeElement.dataset.description;
}

function setSlideNumber() {
  slideCurrentNumberElement.textContent = `${activeElement.dataset.number} /`;
}