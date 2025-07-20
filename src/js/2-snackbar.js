import '../css/style.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayMs = Number(event.target.delay.value);
  const state   = event.target.state.value;

  createPromise(delayMs, state)
    .then(ms => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${ms} ms`
      });
    })
    .catch(ms => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${ms} ms`
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