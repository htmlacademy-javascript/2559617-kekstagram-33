import { renderPhotos } from './miniature-creating.js';

const dataErrorTemplate = document.querySelector('#data-error').content;
const messageContainer = document.createElement('div');

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((miniatures) => {
    renderPhotos(miniatures);
  })
  .catch((error) => {
    const errorMessage = dataErrorTemplate.cloneNode(true);
    messageContainer.appendChild(errorMessage);
    document.body.appendChild(messageContainer);
    // eslint-disable-next-line no-console
    console.error('Ошибка загрузки данных c сервера:', error);
  });
