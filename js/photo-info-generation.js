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

const DESCRIPTIONS = [
  'Продолжай улыбаться, потому что жизнь — прекрасная вещь и есть еще так много поводов для улыбки.',
  'Хочу увидеть, что произойдет, если я не сдамся.',
  'Лучше начать действовать, совершая ошибки, чем медлить, стремясь к безошибочности.',
  'Не бойся быть не таким, как все, и все захотят быть таким, как ты.',
  'Одна хорошая мысль утром меняет смысл целого дня.',
  'Что бы ни случилось завтра, у нас есть еще сегодня.',
  'Настойчивость окупается сполна.',
  'Будь голосом, а не эхом.',
  'Человек на вершине горы не упал туда с неба.',
  'Отсутствие сна — это не проблема. Проблема, когда ты не знаешь, ради чего просыпаешься по утрам.',
];

const LIKE_COUNT_RANGES = {
  min: 15,
  max: 200
};

const IMAGE_ID_RANGES = {
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
    avatar: `img/avatar-${getRandomIntInclusive(IMAGE_ID_RANGES.min, IMAGE_ID_RANGES.max)}.svg`,
    message: `${getRandomArrayElement(COMMENTS)}`,
    name: `${getRandomArrayElement(COMMENTATOR_NAMES)}`,
  };
}

function getCreatePhotoInfo() {
  const commentCount = getRandomIntInclusive(0, maxQuantityComment);
  const comments = Array.from({ length: commentCount }, () => getCreateComment());
  return {
    id: getNextPhotoId(),
    url: `photos/${getNextUrlId()}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTIONS)}`,
    likes: getRandomIntInclusive(LIKE_COUNT_RANGES.min, LIKE_COUNT_RANGES.max),
    comments: comments,
  };
}

export const generatePhotosInfo = () => Array.from({ length: getRandomIntInclusive(1, NUMBERS_OF_ARRAYS) }, () => getCreatePhotoInfo());
