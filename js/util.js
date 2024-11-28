export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

export const createIdGenerator = () => {
  let currentId = 0;
  return () => ++currentId;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
