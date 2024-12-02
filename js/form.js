import { updateScale } from './scale.js';
import { initEffects } from './effects.js';
import { checkValidateForm } from './form-validation.js';
// import { isEscapeKey } from './util';

const fileInput = document.getElementById('upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButton = document.getElementById('upload-cancel');

const closeOverlay = () => {
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

fileInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  updateScale(100);
  initEffects();
  checkValidateForm();
});

cancelButton.addEventListener('click', closeOverlay);
