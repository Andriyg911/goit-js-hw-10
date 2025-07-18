
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayInput = event.target.elements.delay;
  const stateInput = event.target.elements.state;
  const ms = Number(delayInput.value);
  const chosenState = stateInput.value;

  createPromise(ms, chosenState)
    .then(value => {
      iziToast.success({
        title: '✅ Успіх',
        message: `Виконано обіцянку за ${value} мс`
      });
    })
    .catch(error => {
      iziToast.error({
        title: '❌ Помилка',
        message: `Відхилено обіцянку через ${error} мс`
      });
    });

  form.reset();
});

function createPromise(delayMs, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delayMs) : reject(delayMs);
    }, delayMs);
  });
}