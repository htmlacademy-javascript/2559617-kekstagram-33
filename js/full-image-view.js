import { toggleClass } from "./util";


const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPicturelmage = bigPicture.querySelector('.big-picture._img img');
const closeButton = bigPicture.querySelector('.big-picture_cancel');
const likesCount = bigPicture. querySelector ('.likes-count');
const pictureCaption = bigPicture.querySelector('social caption');
const socialComments = bigPicture.querySelector('.social._comments');
const socialCommentsCount = bigPicture.querySelector('.social_comment-count');
const loadButton = bigPicture. querySelector ('.comments-loader');
const socialComment = bigPicture. querySelector('.social_comment');

const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');

}

const show = (picture) => {
  const {url, likes, description} = picture;

  bigPicturelmage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
};
const showBigPicture = (picture) => {
 show();
 toggleModal()
};

export {showBigPicture};