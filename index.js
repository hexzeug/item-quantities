const items = document.querySelector('#items');
const stacks = document.querySelector('#stacks');
const wholeStacks = document.querySelector('#wholeStacks');
const restItems1 = document.querySelector('#restItems1');
const shulkers = document.querySelector('#shulkers');
const wholeShulkers = document.querySelector('#wholeShulkers');
const restWholeStacks = document.querySelector('#restWholeStacks');
const restItems2 = document.querySelector('#restItems2');

const constant = document.querySelector('#constant');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');

const update = (count) => {
  if (items !== document.activeElement) items.value = count;
  if (stacks !== document.activeElement) stacks.value = count / 64;
  if (wholeStacks !== document.activeElement)
    wholeStacks.value = Math.floor(count / 64);
  if (restItems1 !== document.activeElement) restItems1.value = count % 64;
  if (shulkers !== document.activeElement) shulkers.value = count / (64 * 27);
  if (wholeShulkers !== document.activeElement)
    wholeShulkers.value = Math.floor(count / (64 * 27));
  if (restWholeStacks !== document.activeElement)
    restWholeStacks.value = Math.floor(count / 64) % 27;
  if (restItems2 !== document.activeElement) restItems2.value = count % 64;
};

const valid = (elm) => !elm.validity.patternMismatch;

const handler = (elm, getCount) => {
  elm.addEventListener('input', () => {
    if (!valid(elm)) {
      elm.classList.add('is-danger');
      return;
    }
    elm.classList.remove('is-danger');
    update(getCount());
  });
  elm.addEventListener('blur', () => {
    elm.classList.remove('is-danger');
    update(getCount());
  });
};

const int = (str) => {
  const x = parseInt(str);
  return isNaN(x) ? 0 : x;
};

const float = (str) => {
  const x = parseFloat(str);
  return isNaN(x) ? 0.0 : x;
};

handler(items, () => int(items.value));
handler(stacks, () => Math.ceil(float(stacks.value) * 64));
handler(wholeStacks, () => int(wholeStacks.value) * 64 + int(restItems1));
handler(restItems1, () => int(wholeStacks.value) * 64 + int(restItems1));
handler(shulkers, () => Math.ceil(float(shulkers.value) * 27 * 64));
handler(
  wholeShulkers,
  () =>
    (int(wholeShulkers.value) * 27 + int(restWholeStacks.value)) * 64 +
    int(restItems2.value)
);
handler(
  restWholeStacks,
  () =>
    (int(wholeShulkers.value) * 27 + int(restWholeStacks.value)) * 64 +
    int(restItems2.value)
);
handler(
  restItems2,
  () =>
    (int(wholeShulkers.value) * 27 + int(restWholeStacks.value)) * 64 +
    int(restItems2.value)
);

constant.addEventListener('input', () =>
  constant.classList.toggle('is-danger', !valid(constant))
);
constant.addEventListener('blur', () => {
  constant.classList.remove('is-danger');
  constant.value = int(constant.value);
});

multiply.addEventListener('click', () =>
  update(int(items.value) * int(constant.value))
);
divide.addEventListener('click', () =>
  update(Math.ceil(int(items.value) / int(constant.value)))
);
