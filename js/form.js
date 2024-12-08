import { updateScale } from './scale.js';
import { initEffects } from './effects.js';
import { initValidation} from './form-validation.js';
import { isEscapeKey } from './util.js';
import {handleSuccess, handleError, blockSubmitButton, unblockSubmitButton, isErrorMessageShown} from './post-messages.js';
import {sendData} from './api.js';

const defaultScale = 100;

const fileInput = document.getElementById('upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButton = document.getElementById('upload-cancel');
const formUploadDOMElement = document.querySelector('.img-upload__form');
const hashtagsInputDOMElement = formUploadDOMElement.querySelector('.text__hashtags');
const commentFieldDOMElement = formUploadDOMElement.querySelector('.text__description');


let pristine;

export const closeOverlay = () => {
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentEscPress);
  if (pristine) {
    pristine.reset();
  }
  formUploadDOMElement.reset();
};

hashtagsInputDOMElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentFieldDOMElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});


const onDocumentEscPress = (evt) => {
  if (isEscapeKey(evt) && !isErrorMessageShown) {
    evt.preventDefault();
    closeOverlay();
  }
};


let onSubmitData;
fileInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  updateScale(defaultScale);
  initEffects();
  pristine = initValidation(formUploadDOMElement, hashtagsInputDOMElement, commentFieldDOMElement);
  if (onSubmitData) {
    formUploadDOMElement.removeEventListener('submit', onSubmitData);
  }
  onSubmitData = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(formData)
        .then(handleSuccess)
        .catch(handleError)
        .finally(unblockSubmitButton);
    }
  };
  formUploadDOMElement.addEventListener('submit', onSubmitData);
  document.addEventListener('keydown', onDocumentEscPress);
});

cancelButton.addEventListener('click', closeOverlay);
