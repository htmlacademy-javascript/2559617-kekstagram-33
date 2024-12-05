/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import { closeOverlay } from './form.js';
import { isEscapeKey } from './util.js';

const messageContainer = document.createElement('div');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const submitButton = document.querySelector('#upload-submit');

const dataErrorTemplate = document.querySelector('#data-error').content;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

export const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

export const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

let isErrorMessageShown = false;

const closeMessage = () => {
  messageContainer.remove();
  document.removeEventListener('click', closeMessage);
  document.removeEventListener('keydown', onDocumentEscPress);
  isErrorMessageShown = false;
};

const onDocumentEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

export const handleSuccess = (data) => {
  messageContainer.innerHTML = '';
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  closeOverlay();

  successButton.addEventListener('click', closeMessage);
  messageContainer.appendChild(successMessage);
  document.body.appendChild(messageContainer);
  document.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentEscPress);
  console.log('Успешная отправка данных:', data);
};


export const handleError = (error) => {
  messageContainer.innerHTML = '';
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  errorButton.addEventListener('click', closeMessage);
  messageContainer.appendChild(errorMessage);
  document.body.appendChild(messageContainer);
  document.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentEscPress);
  isErrorMessageShown = true;
  console.error('Произошла ошибка:', error);
};

export const getDataError = (error) => {
  const errorMessage = dataErrorTemplate.cloneNode(true);
  messageContainer.appendChild(errorMessage);
  document.body.appendChild(messageContainer);
  console.error('Ошибка загрузки данных c сервера:', error);
};

export { isErrorMessageShown };

