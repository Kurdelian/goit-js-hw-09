import Notiflix from 'notiflix';

const delayEl = document.querySelector('input[name="delay"]')
const stepEl = document.querySelector('input[name="step"]')
const amountEl = document.querySelector('input[name="amount"]')
const formEl = document.querySelector('form')

formEl.addEventListener('submit', onFormSubmit)

function onFormSubmit (event) {
  event.preventDefault();

  let delay = Number(delayEl.value);

  for (let position = 1; position <= amountEl.value; position +=1) {
    if (position > 1) {
      delay += Number(stepEl.value);
    }
    createPromise(position, delay)
    .then(value => Notiflix.Notify.success(value))
    .catch(error => Notiflix.Notify.failure(error))
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
    });
  return promise;
}