import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

const PLANS__BUTTONS__CONTAINER = document.querySelector('.tab__buttons');
const PLANS__BUTTONS = document.querySelectorAll('.tab__button');
const TABS = document.querySelectorAll('.tab__list');
const VIDEO_ELEMENT = document.querySelector('.video');
const VIDEO_OPTIONS = {
  allowfullscreen: true,
  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  src: 'https://www.youtube.com/embed/9TZXsZItgdw',
  frameborder: 0,
  width: '364px',
  height: '228px',
};

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();
  setupVideo(VIDEO_ELEMENT);

  PLANS__BUTTONS__CONTAINER.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab__button')) {
      PLANS__BUTTONS.forEach(button => button.classList.remove('tab__button--active'));
      e.target.classList.add('tab__button--active');
      TABS.forEach(el => el.style.display = 'none');
      TABS.forEach(el => {
        if (el.dataset.list === e.target.dataset.plan) {
          el.style.display = 'flex';
        }
      });
    }
  });
  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

const setupVideo = (video) => {
  let link = video.querySelector('.video__link');
  let button = video.querySelector('.video__border');

  video.addEventListener('click', () => {
    let iframe = createIframe();

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
};

const createIframe = () => {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', VIDEO_OPTIONS.allowfullscreen);
  iframe.setAttribute('allow', VIDEO_OPTIONS.allow);
  iframe.setAttribute('src', VIDEO_OPTIONS.src);
  iframe.setAttribute('frameborder', VIDEO_OPTIONS.frameborder);
  iframe.setAttribute('width', VIDEO_OPTIONS.width);
  iframe.setAttribute('height', VIDEO_OPTIONS.height);
  iframe.classList.add('video__image');

  return iframe;
};


// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
