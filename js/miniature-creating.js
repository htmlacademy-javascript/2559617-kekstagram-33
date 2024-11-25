import { generatePhotosInfo } from './photo-info-generation';

const photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture'); 
const photosContainer = document.querySelector('.pictures');

const photosData = generatePhotosInfo();

const photosFragment = document.createDocumentFragment();

photosData.forEach((photoData) => {
  const photoElement = photoTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoData.url;
  photoElement.querySelector('.picture__img').alt = photoData.description;
  photoElement.querySelector('.picture__likes').textContent = photoData.likes;
  photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;
  photosFragment.appendChild(photoElement);
});

photosContainer.appendChild(photosFragment);

export { photosContainer };
