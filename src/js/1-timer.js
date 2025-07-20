import '../css/style.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#start-btn');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

let userSelectedDate = null;
let timerInterval = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const picked = selectedDates[0];
    if (picked <= Date.now()) {
      startBtn.disabled = true;
      iziToast.error({ title: 'Помилка', message: 'Please choose a date in the future' });
    } else {
      userSelectedDate = picked;
      startBtn.disabled = false;
    }
  }
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const delta = userSelectedDate - Date.now();
  if (delta <= 0) {
    clearInterval(timerInterval);
    renderTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    input.disabled = false;
    return;
  }
  renderTime(convertMs(delta));
}

function convertMs(ms) {
  const second = 1000,
        minute = second * 60,
        hour   = minute * 60,
        day    = hour * 24;

  const days    = Math.floor(ms / day),
        hours   = Math.floor((ms % day) / hour),
        minutes = Math.floor(((ms % day) % hour) / minute),
        seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.days.textContent    = addLeadingZero(days);
  refs.hours.textContent   = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}