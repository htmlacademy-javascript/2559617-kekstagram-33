import { getRandomIntInclusive, getRandomArrayElement, createIdGenerator } from './util.js';

const COMMENTATOR_NAMES = [
  'Анастасия',
  'Сергей',
  'Дмитрий',
  'Екатерина',
  'Андрей',
  'Максим',
  'Мария',
  'Алексей',
  'Иван',
  'Ольга',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const LIKE_COUNT_RANGE = {
  min: 15,
  max: 200
};

const IMAGE_ID_RANGE = {
  min: 1,
  max: 6
};

const maxQuantityComment = 30;
const NUMBERS_OF_ARRAYS = 25;

const getNextCommentId = createIdGenerator();
const getNextPhotoId = createIdGenerator();
const getNextUrlId = createIdGenerator();


function getCreateComment() {
  return {
    id: getNextCommentId(),
    avatar: `img/avatar-${getRandomIntInclusive(IMAGE_ID_RANGE.min, IMAGE_ID_RANGE.max)}.svg`,
    message: `${getRandomArrayElement(COMMENTATOR_NAMES)}`,
    name: `${getRandomArrayElement(COMMENTS)}`,
  };
}

function getCreatePhotoInfo() {
  const commentCount = getRandomIntInclusive(0, maxQuantityComment);
  const comments = Array.from({ length: commentCount }, () => getCreateComment());
  return {
    id: getNextPhotoId(),
    url: `photos/${getNextUrlId()}.jpg`,
    description: 'Это придуманное описание для фотографии',
    likes: getRandomIntInclusive(LIKE_COUNT_RANGE.min, LIKE_COUNT_RANGE.max),
    comments: comments,
  };
}

export const generatePhotosInfo = () => Array.from({ length: getRandomIntInclusive(1, NUMBERS_OF_ARRAYS) }, () => getCreatePhotoInfo());

