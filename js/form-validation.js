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

let hashtagsInput;
let commentField;


export const initValidation = (form, hashtags, comment) => {
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
