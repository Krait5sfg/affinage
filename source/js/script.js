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
const sliderButtonLeft = document.querySelector(`.slider__button-left`);
const sliderButtonRight = document.querySelector(`.slider__button-right`);
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
    sliderListElement.removeEventListener('click', onSliderListElementClick);
  }
  if (windowWidth > 1023) {
    offset = getOffsetForDesktop(numberActiveSlider, 5);
    sliderListElement.style.left = `${offset}px`;
    removeEventListeners();
    sliderListElement.addEventListener(`click`, onSliderListElementClick);
    sliderMainImageElement.setAttribute(`src`, sliderItemActive.dataset.source);
  }

  numberActiveSlider === 1 ? sliderButtonLeft.disabled = true : sliderButtonLeft.disabled = false;
  numberActiveSlider === sliderElements.length ? sliderButtonRight.disabled = true : sliderButtonRight.disabled = false;
});

//start position
if (windowWidth < 1024) {
  offset = -(numberActiveSlider - 1) * SLIDER_WIDTH;
  sliderListElement.style.left = `${offset}px`;
  addEventListeners();
  sliderListElement.removeEventListener('click', onSliderListElementClick);
}
if (windowWidth > 1023) {
  offset = getOffsetForDesktop(numberActiveSlider, 5);
  sliderListElement.style.left = `${offset}px`;
  removeEventListeners();
  sliderMainImageElement.setAttribute(`src`, sliderItemActive.dataset.source);
  sliderListElement.addEventListener(`click`, onSliderListElementClick);
}

sliderButtonLeft.addEventListener(`click`, () => {
  setTimeout(() => {
    sliderMainImageElement.classList.remove(`slider__main-image--fade-in`);
  }, 1000);

  numberActiveSlider--;
  if (numberActiveSlider === 1) {
    sliderButtonLeft.disabled = true;
  }
  if (sliderButtonRight.disabled) {
    sliderButtonRight.disabled = false;
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
  if (numberActiveSlider === sliderElements.length) {
    sliderButtonRight.disabled = true;
  }
  if (sliderButtonLeft.disabled) {
    sliderButtonLeft.disabled = false;
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

function onSliderListElementClick(evt) {

  if (evt.target.classList.contains(`slider__list`)) {
    return false;
  }

  setTimeout(() => {
    sliderMainImageElement.classList.remove(`slider__main-image--fade-in`);
  }, 1000);

  numberActiveSlider = +evt.target.dataset.number;
  sliderItemActive.classList.remove(`slider__item--active`);
  sliderItemActive = evt.target;
  sliderImageTitleElement.textContent = sliderItemActive.dataset.title;
  sliderCurrentNumberElement.textContent = `${sliderItemActive.dataset.number} `;
  sliderItemActive.classList.add(`slider__item--active`);

  sliderMainImageElement.setAttribute(`src`, sliderItemActive.dataset.source);
  sliderMainImageElement.classList.add(`slider__main-image--fade-in`);

  numberActiveSlider === 1 ? sliderButtonLeft.disabled = true : sliderButtonLeft.disabled = false;
  numberActiveSlider === sliderElements.length ? sliderButtonRight.disabled = true : sliderButtonRight.disabled = false;
};

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

//postition the pin on map

//start position on modile
const mapContainer = document.querySelector(`.map__container`);
const mapPin = document.querySelector(`.map__pin`);
let widthMapContainer = mapContainer.offsetWidth;

setTopValue(widthMapContainer);

const resizeObserver = new ResizeObserver((entries) => {
  widthMapContainer = entries[0].target.offsetWidth;
  setTopValue(widthMapContainer);
});

resizeObserver.observe(mapContainer);

function setTopValue(containerWidth) {
  let ratio = 2.6;

  if (containerWidth > 699) {
    mapPin.style.top = `20%`;
    return false;
  }

  switch (true) {
    case containerWidth > 399 && containerWidth < 500:
      ratio = 2.5;
      break;
    case containerWidth > 499 && containerWidth < 600:
      ratio = 2.4;
      break;
    case containerWidth > 599:
      ratio = 2.3;
      break;
    default:
      ratio = 2.6;
  }
  mapPin.style.top = `${containerWidth / ratio}px`;
}

//ajax
const jsAjax = document.querySelector(`.js-ajax`);
const biographyList = document.querySelector(`.biography__list`);
let isActive = false;
jsAjax.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (!isActive) {
    isActive = true;
    jsAjax.textContent = `скрыть`;

    fetch(`./mock/mock.json`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((value) => {
        return Object.entries(value);
      })
      .then((values) => {
        values.forEach((data) => {
          const liElement = createLiElement(data);
          biographyList.appendChild(liElement);
        })
      });
  } else {
    isActive = false;
    jsAjax.textContent = `читать больше`;
    console.log(biographyList.children.length);

    for (let x = biographyList.children.length - 1; x > 0; x--) {
      if (biographyList.children[x].classList.contains(`biography__item--ajax`)) {
        biographyList.children[x].remove();
      }
    }
  }
});

function createLiElement(values) {
  const liElement = document.createElement(`li`);
  const yearElement = document.createElement(`p`);
  const textElement = document.createElement(`p`);

  liElement.classList.add(`biography__item`);
  liElement.classList.add(`biography__item--ajax`);
  yearElement.classList.add(`biography__year`);
  textElement.classList.add(`biography__text`);

  yearElement.textContent = values[0];
  textElement.textContent = values[1];

  liElement.appendChild(yearElement);
  liElement.appendChild(textElement);

  return liElement;
}