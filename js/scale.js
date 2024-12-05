export let scaleValue = 100;

export function updateScale(value) {
  scaleValue = value;
  const scaleValueInput = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');
  scaleValueInput.value = `${scaleValue}%`;
  previewImage.style.transform = `scale(${scaleValue / 100})`;
}

export const smallerButton = document.querySelector('.scale__control--smaller');
export const biggerButton = document.querySelector('.scale__control--bigger');


smallerButton.addEventListener('click', () => {
  scaleValue -= 25;
  scaleValue = Math.max(scaleValue, 25);
  updateScale(scaleValue);
});

biggerButton.addEventListener('click', () => {
  scaleValue += 25;
  scaleValue = Math.min(scaleValue, 100);
  updateScale(scaleValue);
});

updateScale(scaleValue);
