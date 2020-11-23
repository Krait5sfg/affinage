'use strict';

//слайдер
var slider = document.querySelector('.slider__list');
slider.scrollTo(100, 0); //стартовая позиция слайдера

var currentNumberImageContainer = document.querySelector('.slider__current-number');
var overallNumberImageContainer = document.querySelector('.slider__overall-number');
var targetsElements = document.querySelectorAll('.slider__item');
var imageTitleContainer = document.querySelector('.slider__image-title');

overallNumberImageContainer.textContent = '/ ' + targetsElements.length;

var option = {
  root: slider,
  rootMargin: '0px',
  threshold: 1.0
};

var callback = function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      currentNumberImageContainer.textContent = entry.target.dataset.number + ' ';
      imageTitleContainer.textContent = entry.target.dataset.description;
    }
  });
}

var observer = new IntersectionObserver(callback, option);

var targetsElements = document.querySelectorAll('.slider__item');
targetsElements.forEach(function (element) {
  observer.observe(element);
});
