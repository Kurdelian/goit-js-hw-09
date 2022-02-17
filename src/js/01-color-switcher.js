const startButton = document.querySelector('[data-start]')
const stopButton = document.querySelector('[data-stop]')
let timerId = null;

startButton.addEventListener('click', onStartButtonClick)
stopButton.addEventListener('click', onStopButtonclick)

function onStartButtonClick () {
    timerId = setInterval(() => { 
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    startButton.setAttribute("disabled", "disabled")
    stopButton.removeAttribute("disabled")
}

function onStopButtonclick () {
    clearInterval(timerId)
    startButton.removeAttribute("disabled")
    stopButton.setAttribute("disabled", "disabled")
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
