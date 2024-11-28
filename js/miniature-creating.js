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

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

