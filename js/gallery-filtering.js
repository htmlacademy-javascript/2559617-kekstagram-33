/* eslint-disable no-shadow */
import { renderPhotos } from './miniature-creating.js';
import { debounce, sortArray, compareComments } from './util.js';

const imageFiltersButtons = document.querySelectorAll('.img-filters__button');
const pictures = document.querySelector('.pictures');

function onFiltersChange(filter) {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
  return filter.id;
}

const removeMiniatures = () => {
  const addedPictures = pictures.querySelectorAll('.picture');
  addedPictures.forEach((picture) => {
    pictures.removeChild(picture);
  });
};

export const sortPictures = (initialPictures, cb) => {
  imageFiltersButtons.forEach((currentButton) => {
    const sortPicturesDebounce = debounce((filter) => {
      removeMiniatures();
      let currentPictures = [...initialPictures];

      switch (filter) {
        case 'filter-random':
          currentPictures = sortArray(currentPictures)
            .slice(0, 10);
          break;
        case 'filter-discussed':
          currentPictures = initialPictures.slice()
            .sort(compareComments);
          break;
        default:
          currentPictures = initialPictures;
          break;
      }
      renderPhotos(currentPictures, cb);
    }, 500);

    currentButton.addEventListener('click', () => {
      const filterType = onFiltersChange(currentButton);
      sortPicturesDebounce(filterType);
    });
  });
};

export function showFiltersContainer() {
  const filtersContainer = document.querySelector('.img-filters');
  if (filtersContainer) {
    filtersContainer.classList.remove('img-filters--inactive');
  }
}

