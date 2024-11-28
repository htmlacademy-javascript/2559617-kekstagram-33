import { generatePhotosInfo } from './photo-info-generation';
import { openBigPicture } from './open-big-picture.js';

const photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const photosContainer = document.querySelector('.pictures');

const generatePhotoElement = (photoData) => {
  const photoElement = photoTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoData.url;
  photoElement.querySelector('.picture__img').alt = photoData.description;
  photoElement.querySelector('.picture__likes').textContent = photoData.likes;
  photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;

  photoElement.addEventListener('click', () => {
    openBigPicture(photoData);
  });

  return photoElement;
};

const photosData = generatePhotosInfo();

const photosFragment = document.createDocumentFragment();

photosData.forEach((photoData) => {
  photosFragment.appendChild(generatePhotoElement(photoData));
});

photosContainer.appendChild(photosFragment);

export { photosContainer };
