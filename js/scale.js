export const DEFAULT_SCALE_VALUE = 100;
export const SCALE_STEP = 25;

export let scaleValue = DEFAULT_SCALE_VALUE;

export function updateScale(value) {
  scaleValue = value;
  const scaleValueInput = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');
  scaleValueInput.value = `${scaleValue}%`;
  previewImage.style.transform = `scale(${scaleValue / DEFAULT_SCALE_VALUE})`;
}

export const smallerButton = document.querySelector('.scale__control--smaller');
export const biggerButton = document.querySelector('.scale__control--bigger');


smallerButton.addEventListener('click', () => {
  scaleValue -= SCALE_STEP;
  scaleValue = Math.max(scaleValue, SCALE_STEP);
  updateScale(scaleValue);
});

biggerButton.addEventListener('click', () => {
  scaleValue += SCALE_STEP;
  scaleValue = Math.min(scaleValue, DEFAULT_SCALE_VALUE);
  updateScale(scaleValue);
});

updateScale(scaleValue);
