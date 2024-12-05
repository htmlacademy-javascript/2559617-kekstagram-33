/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import '../vendor/pristine/pristine.min.js';
import './photo-info-generation.js';
import './form.js';
import {getData} from './api.js';
import { renderPhotos } from './miniature-creating.js';
import { getDataError} from './post-messages.js';

getData()
  .then((picture) => {
    renderPhotos(picture);
  })
  .catch(
    (_err) => {
      getDataError();
    }
  );
