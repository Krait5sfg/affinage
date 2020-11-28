'use strict';

//слайдер
let start;
let change;
let offset = 0;

const sliderElements = document.querySelectorAll(`.slider__item`);
const limitRightOffset = (sliderElements.length - 1) * 220;
const sliderListElement = document.querySelector(`.slider__list`);
const sliderImageTitleElement = document.querySelector(`.slider__image-title`);
let sliderItemActive = sliderListElement.querySelector(`.slider__item--active`);
let numberActiveSlider = sliderItemActive.dataset.number;
const sliderCurrentNumberElement = document.querySelector(`.slider__current-number`);
const sliderOverallNumberElement = document.querySelector(`.slider__overall-number`);

sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;
sliderOverallNumberElement.textContent = `/ ${sliderElements.length}`;

sliderListElement.addEventListener('touchstart', (evt) => {
  start = evt.touches[0].clientX;
});

sliderListElement.addEventListener('touchmove', (evt) => {
  evt.preventDefault();
  let touch = evt.touches[0];
  change = start - touch.clientX;
});

sliderListElement.addEventListener('touchend', slideShow);

function slideShow() {

  if (change > 0) {

    if (Math.abs(offset) === limitRightOffset) {
      return false;
    }

    numberActiveSlider++;
    sliderItemActive = sliderListElement.querySelector(`[data-number="${numberActiveSlider}"]`);
    sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
    sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;

    offset -= 220;
    sliderListElement.style.left = `${offset}px`;
  } else {

    if (offset === 0) {
      return false;
    }

    numberActiveSlider--;
    sliderItemActive = sliderListElement.querySelector(`[data-number="${numberActiveSlider}"]`);
    sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
    sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;

    offset += 220;
    sliderListElement.style.left = `${offset}px`;
  }
};