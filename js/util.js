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

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export const sortArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export const compareComments = (a, b) => b.comments.length - a.comments.length;

