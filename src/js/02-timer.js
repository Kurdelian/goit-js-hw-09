import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");

import Notiflix from 'notiflix';


const inputEL = document.querySelector('#datetime-picker')
const startButton = document.querySelector('[data-start]')
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds')

startButton.setAttribute("disabled", "disabled")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0].getTime();
        const currentDate = Date.now();
        if (currentDate > selectedDate) {
          Notiflix.Notify.failure("Please choose a date in the future")
        } else {
            startButton.removeAttribute("disabled")
        }
    },
  };

const fp = flatpickr('#datetime-picker', options)

startButton.addEventListener('click', timerStart)

function timerStart () {
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const startTime = fp.selectedDates[0]
        const deltaTime = startTime - currentTime;
        const timeComponents = convertMs(deltaTime);
        updateClockface(timeComponents)
        if (deltaTime < 0) {
        clearInterval(intervalId)
        }
    }, 1000)
}

function updateClockface({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  document.body.style.cssText=`text-align: center;
  background-image: linear-gradient(to right, #d7d2cc 0%, #304352 100%);
  font-family: sans-serif;
  font-weight: 100;`;


  