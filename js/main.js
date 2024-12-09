/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import '../vendor/pristine/pristine.min.js';
import './photo-info-generation.js';
import './form.js';
import {sortPictures, showFiltersContainer} from './gallery-filtering.js';
import {getData} from './api.js';
import {renderPhotos} from './miniature-creating.js';
import {getDataError} from './post-messages.js';

getData()
  .then((picture) => {
    renderPhotos(picture);
    showFiltersContainer();
    sortPictures(picture);
  })
  .catch(
    (_err) => {
      getDataError();
    }
  );
