const effectValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');


const EFFECTS = [
  {
    effectName: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    querySelector: document.querySelector('#effect-none'),
  },
  {
    effectName: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    querySelector: document.querySelector('#effect-chrome'),
  },
  {
    effectName: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    querySelector: document.querySelector('#effect-sepia'),
  },
  {
    effectName: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    querySelector: document.querySelector('#effect-marvin'),
  },
  {
    effectName: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    querySelector: document.querySelector('#effect-phobos'),
  },
  {
    effectName: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    querySelector: document.querySelector('#effect-heat'),
  },
];

let slider;

const applyEffect = () => {
  const selectedEffect = EFFECTS.find((effect) => effect.querySelector.checked);
  if (selectedEffect) {
    const value = parseFloat(slider?.get() || 0);
    effectValue.value = value;
    imagePreview.style.filter = selectedEffect.effectName === 'none' ? '' : `${selectedEffect.filter}(${value}${selectedEffect.unit})`;
  } else {
    imagePreview.style.filter = '';
  }
};

const createSlider = (effect) => {
  if (slider) {
    slider.destroy();
  }
  slider = noUiSlider.create(effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    connect: 'lower',
    step: effect.step,
    format: {
      to: (value) => Number(value),
      from: (value) => parseFloat(value),
    },
  });
  slider.on('update', applyEffect);
};

export const initEffects = () => {
  EFFECTS.forEach((effect) => {
    effect.querySelector.addEventListener('change', () => {
      if (!effect.querySelector.checked) {
        return;
      }
      if (effect.effectName === 'none') {
        effectLevelContainer.classList.add('visually-hidden');
        if (slider) {
          slider.set(0);
          applyEffect();
        }
      } else {
        effectLevelContainer.classList.remove('visually-hidden');
        createSlider(effect);
        applyEffect();
      }
    });
  });

  const defaultEffect = EFFECTS.find((effect) => effect.effectName !== 'none');
  if (defaultEffect) {
    createSlider(defaultEffect);
  }
  effectLevelContainer.classList.add('visually-hidden');
};
