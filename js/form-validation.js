import '../vendor/pristine/pristine.min.js';

const dataCommentField = Object.freeze({
  MAX_LENGTH: 140,
  MESSAGE_ERROR: 'Длина комментария не должна превышать 140 символов',
});

const dataHashtagField = Object.freeze({
  MAX_HASHTAG_NUMBERS: 5,
  HASHTAG_NOT_VALID: 'Хэштег должен начинаться с #',
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться',
  MAX_HASHTAG_NUMBERS_EXCEEDED: 'Количество хэштегов должно быть не больше 5',
});

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const isValidHashtag = (hashtag) => HASHTAG_REGEX.test(hashtag);
const uniqValueHashtag = (array) => array.length === new Set(array).size;

const checkOnValidHashtag = (hashtags) => {
  if (!hashtags.every(isValidHashtag)) {
    return dataHashtagField.HASHTAG_NOT_VALID;
  }
  return null;
};

const checkOnNumbersHashtags = (hashtags) => {
  if (hashtags.length > dataHashtagField.MAX_HASHTAG_NUMBERS) {
    return dataHashtagField.MAX_HASHTAG_NUMBERS_EXCEEDED;
  }
  return null;
};

const checkOnDuplicateHashtag = (hashtags) => {
  if (!uniqValueHashtag(hashtags)) {
    return dataHashtagField.DUPLICATE_HASHTAGS;
  }
  return null;
};

const rulesValidationHashtags = [
  checkOnValidHashtag,
  checkOnNumbersHashtags,
  checkOnDuplicateHashtag,
];

let hashtagErrorMessage = [];

const validateHashtagField = (value) => {
  const hashtags = value.trim().split(/\s+/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
  hashtagErrorMessage = [];
  hashtagErrorMessage = rulesValidationHashtags
    .map((validator) => validator(hashtags))
    .filter(Boolean);
  return !hashtagErrorMessage.length;
};

const validateCommentField = (value) => value.length <= dataCommentField.MAX_LENGTH;

const getHashtagErrorMessage = () => hashtagErrorMessage[0] ?? '';
const getCommentErrorMessage = () => dataCommentField.MESSAGE_ERROR;

let formElement;
let hashtagsInput;
let commentField;


export const initValidation = (form, hashtags, comment) => {
  formElement = form;
  hashtagsInput = hashtags;
  commentField = comment;
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  }, false);
  pristine.addValidator(hashtagsInput, validateHashtagField, getHashtagErrorMessage);
  pristine.addValidator(commentField, validateCommentField, getCommentErrorMessage);
  return pristine;
};

export const checkValidateForm = (pristine) => {
  const errorTemplate = document.querySelector('#error').content;
  const successTemplate = document.querySelector('#success').content;
  const messageContainer = document.createElement('div');

  const overlay = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch(
        'https://32.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message || 'Ошибка отправки формы');
            });
          }
          return response.json();
        })
        .then((data) => {
          const successMessage = successTemplate.cloneNode(true);
          const successButton = successMessage.querySelector('.success__button');
          overlay.classList.add('hidden');
          bodyElement.classList.remove('modal-open');
          successButton.addEventListener('click', () => {
            messageContainer.remove();
          });
          messageContainer.appendChild(successMessage);
          document.body.appendChild(messageContainer);
          // eslint-disable-next-line no-console
          console.log('Успешная отправка:', data);
        })
        .catch((error) => {
          const errorMessage = errorTemplate.cloneNode(true);
          const errorButton = errorMessage.querySelector('.error__button');
          errorButton.addEventListener('click', () => {
            messageContainer.remove();
          });
          messageContainer.appendChild(errorMessage);
          document.body.appendChild(messageContainer);
          // eslint-disable-next-line no-console
          console.error('Проищошла ошибка:', error);
        });
    }
  });
};


