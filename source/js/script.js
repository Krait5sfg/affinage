'use strict';

//слайдер
const SLIDER_WIDTH = 220;
const SLIDER_WIDTH_DESKTOP = 800;
let start;
let change;
let offset = 0;

const sliderElements = document.querySelectorAll(`.slider__item`);
const limitRightOffset = (sliderElements.length - 1) * SLIDER_WIDTH;
const sliderListElement = document.querySelector(`.slider__list`);
const sliderImageTitleElement = document.querySelector(`.slider__image-title`);
let sliderItemActive = sliderListElement.querySelector(`.slider__item--active`);
let numberActiveSlider = sliderItemActive.dataset.number;
const sliderCurrentNumberElement = document.querySelector(`.slider__current-number`);
const sliderOverallNumberElement = document.querySelector(`.slider__overall-number`);
const sliderButtonLeft = document.querySelector(`.slider__left`);
const sliderButtonRight = document.querySelector(`.slider__right`);
const sliderMainImageElement = document.querySelector(`.slider__main-image`);

sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;
sliderOverallNumberElement.textContent = `/ ${sliderElements.length}`;

let windowWidth = document.documentElement.offsetWidth;
window.addEventListener(`resize`, () => {
  windowWidth = document.documentElement.offsetWidth;
  if (windowWidth < 1024) {
    offset = -(numberActiveSlider - 1) * SLIDER_WIDTH;
    sliderListElement.style.left = `${offset}px`;
    addEventListeners();
  }
  if (windowWidth > 1023) {
    offset = getOffsetForDesktop(numberActiveSlider, 5);
    sliderListElement.style.left = `${offset}px`;
    removeEventListeners();
  }
});

//start position
if (windowWidth < 1024) {
  offset = -(numberActiveSlider - 1) * SLIDER_WIDTH;
  sliderListElement.style.left = `${offset}px`;
  addEventListeners();
}
if (windowWidth > 1023) {
  offset = getOffsetForDesktop(numberActiveSlider, 5);
  sliderListElement.style.left = `${offset}px`;
  removeEventListeners();
  sliderMainImageElement.setAttribute(`src`, sliderItemActive.dataset.source);
}

sliderButtonLeft.addEventListener(`click`, () => {
  setTimeout(() => {
    sliderMainImageElement.classList.remove(`slider__main-image--fade-in`);
  }, 1000);

  numberActiveSlider--;
  if (numberActiveSlider === 0 || numberActiveSlider < 0) {
    numberActiveSlider++;
    return false;
  }

  sliderItemActive.classList.remove(`slider__item--active`);

  sliderItemActive = sliderListElement.querySelector(`[data-number="${numberActiveSlider}"]`);
  sliderItemActive.classList.add(`slider__item--active`);
  sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
  sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;
  sliderMainImageElement.setAttribute(`src`, sliderItemActive.dataset.source);
  sliderMainImageElement.classList.add(`slider__main-image--fade-in`);

  offset = getOffsetForDesktop(numberActiveSlider, 5);
  sliderListElement.style.left = `${offset}px`;
});

sliderButtonRight.addEventListener(`click`, () => {
  setTimeout(() => {
    sliderMainImageElement.classList.remove(`slider__main-image--fade-in`);
  }, 1000);

  numberActiveSlider++;
  if (numberActiveSlider > sliderElements.length) {
    numberActiveSlider--;
    return false;
  }

  sliderItemActive.classList.remove(`slider__item--active`);

  sliderItemActive = sliderListElement.querySelector(`[data-number="${numberActiveSlider}"]`);
  sliderItemActive.classList.add(`slider__item--active`);
  sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
  sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;
  sliderMainImageElement.setAttribute(`src`, sliderItemActive.dataset.source);
  sliderMainImageElement.classList.add(`slider__main-image--fade-in`);

  offset = getOffsetForDesktop(numberActiveSlider, 5);
  sliderListElement.style.left = `${offset}px`;
});

function onSliderListElementsTouchEnd() {
  sliderItemActive.classList.remove(`slider__item--active`);

  if (change > 0) {

    if (Math.abs(offset) === limitRightOffset) {
      return false;
    }

    numberActiveSlider++;
    sliderItemActive = sliderListElement.querySelector(`[data-number="${numberActiveSlider}"]`);
    sliderItemActive.classList.add(`slider__item--active`);
    sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
    sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;

    offset -= SLIDER_WIDTH;
    sliderListElement.style.left = `${offset}px`;
  } else {

    if (offset === 0) {
      return false;
    }

    numberActiveSlider--;
    sliderItemActive = sliderListElement.querySelector(`[data-number="${numberActiveSlider}"]`);
    sliderItemActive.classList.add(`slider__item--active`);
    sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
    sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;

    offset += SLIDER_WIDTH;
    sliderListElement.style.left = `${offset}px`;
  }
};

function onSliderListElementTouchStart(evt) {
  start = evt.touches[0].clientX;
}

function onSliderListElementTouchMove(evt) {
  evt.preventDefault();
  let touch = evt.touches[0];
  change = start - touch.clientX;
}

function getOffsetForDesktop(numberActiveSlider, divisionNumber) {
  let offsetIndex = numberActiveSlider / divisionNumber;
  // return offsetIndex < 1 || offsetIndex === 1 ? 0 : -Math.floor(offsetIndex) * SLIDER_WIDTH_DESKTOP;
  if (offsetIndex < 1 || offsetIndex === 1) {
    return 0;
  } else if (offsetIndex > 1 && !Number.isInteger(offsetIndex)) {
    return -Math.floor(offsetIndex) * SLIDER_WIDTH_DESKTOP;
  } else if (offsetIndex > 1 && Number.isInteger(offsetIndex)) {
    return -(offsetIndex - 1) * SLIDER_WIDTH_DESKTOP;
  }
}

function removeEventListeners() {
  sliderListElement.removeEventListener('touchstart', onSliderListElementTouchStart);
  sliderListElement.removeEventListener('touchmove', onSliderListElementTouchMove);
  sliderListElement.removeEventListener('touchend', onSliderListElementsTouchEnd);
}

function addEventListeners() {
  sliderListElement.addEventListener('touchstart', onSliderListElementTouchStart);
  sliderListElement.addEventListener('touchmove', onSliderListElementTouchMove);
  sliderListElement.addEventListener('touchend', onSliderListElementsTouchEnd);
}
