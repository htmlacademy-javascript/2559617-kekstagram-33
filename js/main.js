/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import '../vendor/pristine/pristine.min.js';
import './photo-info-generation.js';
import './form.js';
import {sortPictures} from './gallery-filtering.js';
import {getData} from './api.js';
import {renderPhotos} from './miniature-creating.js';
import {getDataError} from './post-messages.js';

getData()
  .then((picture) => {
    renderPhotos(picture);
    sortPictures(picture);
  })
  .catch(
    (_err) => {
      getDataError();
    }
  );
