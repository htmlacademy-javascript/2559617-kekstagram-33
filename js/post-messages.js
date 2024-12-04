import { closeOverlay } from './form.js';

const messageContainer = document.createElement('div');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const submitButton = document.querySelector('#upload-submit');

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
export const handleSuccess = (data) => {
  messageContainer.innerHTML = '';

  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  closeOverlay();

  successButton.addEventListener('click', () => {
    messageContainer.remove();
  });

  messageContainer.appendChild(successMessage);
  document.body.appendChild(messageContainer);
  // eslint-disable-next-line no-console
  console.log('Успешная отправка данных:', data);
};


export const handleError = (error) => {
  messageContainer.innerHTML = '';
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    messageContainer.remove();
  });

  messageContainer.appendChild(errorMessage);
  document.body.appendChild(messageContainer);
  // eslint-disable-next-line no-console
  console.error('Произошла ошибка:', error);
};
