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

const maxNumberComment = 30;
const NUMBERS_OF_ARRAYS = 25;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

function getCreateComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
    message: `${getRandomArrayElement(COMMENTATOR_NAMES)}`,
    name: `${getRandomArrayElement(COMMENTS)}`,
  };
}

function getCreatePhotoInfo(id) {
  const commentCount = getRandomIntInclusive(0, maxNumberComment);
  const comments = Array.from({ length: commentCount }, (_, i) => getCreateComment(i + 1));
  return {
    id: id,
    url: `photos/${getRandomIntInclusive(1, 6)}.jpg`,
    description: 'Это придуманное описание для фотографии',
    likes: getRandomIntInclusive(15, 200),
    comments: comments,
  };
}

const totalPhotosInfo = Array.from({ length: getRandomIntInclusive(1, NUMBERS_OF_ARRAYS) }, (_, index) => getCreatePhotoInfo(index + 1));

// eslint-disable-next-line no-console
console.log(totalPhotosInfo);
