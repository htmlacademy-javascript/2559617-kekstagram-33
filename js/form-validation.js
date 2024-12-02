import '../vendor/pristine/pristine.min.js';

// import { isEscapeKey } from './util';

const dataCommentField = Object.freeze({
  MAX_LENGTH: 140,
  MESSAGE_ERROR: 'Длина комментария не должна превышать 140 символов'
});

const dataHashtagField = Object.freeze({
  MAX_HASHTAG_NUMBERS: 5,
  HASHTAG_NOT_VALID: 'Хэштег доолжен начинаться с #',
  MAX_HASHTAG_NUMBERS_EXCEEDED: 'Количество хэштегов должно быть не больше 5',
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться'
});

const formUploadDOMElement = document.querySelector('.img-upload__form');
const hashtagsInputDOMElement = formUploadDOMElement.querySelector('.text__hashtags');
const commentFieldDOMEElement = formUploadDOMElement.querySelector('.text__description');

const pristine = new Pristine(formUploadDOMElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const isValidHashtag = (hashtag) => HASHTAG_REGEX.test(hashtag);
const uniqValueHashtag = (array) => array.length === new Set(array).size;


const checkOnValidHashtag = (hashtags) => {
  if (!hashtags.every(isValidHashtag)) {
    return dataHashtagField.HASHTAG_NOT_VALID;
  }
};

const checkOnNumbersHashtags = (hashtags) => {
  if (hashtags.length > dataHashtagField.MAX_HASHTAG_NUMBERS) {
    return dataHashtagField.MAX_HASHTAG_NUMBERS_EXCEEDED;
  }
};

const checkOnDuplicateHashtag = (hashtags) => {
  if (!uniqValueHashtag(hashtags)) {
    return dataHashtagField.DUPLICATE_HASHTAGS;
  }
};

const rulesValidationHashtags = [
  checkOnValidHashtag,
  checkOnNumbersHashtags,
  checkOnDuplicateHashtag
];

let hashtagErrorMessage = [];

const validateHashtagField = (value) => {
  const hashtags = value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
  hashtagErrorMessage = [];

  rulesValidationHashtags.reduce((errors, validator) => {
    const error = validator(hashtags);

    if(error) {
      errors.push(error);
    }

    return errors;
  }, hashtagErrorMessage);

  return !hashtagErrorMessage.length;
};

const validateCommentField = (value) => value.length <= dataCommentField.MAX_LENGTH;

const getHashtagErrorMessage = () => hashtagErrorMessage[0] ?? '';

const getCommentErroeMessage = () => dataCommentField.MESSAGE_ERROR;

pristine.addValidator(hashtagsInputDOMElement, validateHashtagField, getHashtagErrorMessage);
pristine.addValidator(commentFieldDOMEElement, validateCommentField, getCommentErroeMessage);

const checkValidateForm = () => {
  formUploadDOMElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      formUploadDOMElement.submit();
    }
  });
};

export {checkValidateForm};
