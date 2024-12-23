export function setUpCountdownComponent (element, settings, actions, additions) {
  element.innerHTML =
    '<div class="days"> <span></span> <small>Days</small> </div>' +
    '<div class="hours"> <span></span> <small>Hours</small> </div>' +
    '<div class="minutes"> <span></span> <small>Minutes</small> </div>' +
    '<div class="seconds"> <span></span> <small>Seconds</small> </div>'

  // Hide days if initial time is less then a day
  if (settings.time < 24 * 60 * 60) element.querySelector('.days').style.display = 'none'
  // Hide hours if initial time is less than a hour
  if (settings.time < 60 * 60) element.querySelector('.hours').style.display = 'none'

  const daysSpan = element.querySelector('.days span')
  const hoursSpan = element.querySelector('.hours span')
  const minutesSpan = element.querySelector('.minutes span')
  const secondsSpan = element.querySelector('.seconds span')

  let remainingSeconds = settings.time
  updateClock()
  let timeInterval = setInterval(updateClock, 1000)
  additions.intervals.push(timeInterval)

  function updateClock () {
    const t = getTimeRemaining(remainingSeconds)
    daysSpan.innerText = t.days
    hoursSpan.innerText = ('0' + t.hours).slice(-2)
    minutesSpan.innerText = ('0' + t.minutes).slice(-2)
    secondsSpan.innerText = ('0' + t.seconds).slice(-2)

    if (t.total <= 0) {
      clearInterval(timeInterval)
      actions[settings.action] && actions[settings.action](settings.params)
    } else {
      remainingSeconds--
    }
  }
}

function getTimeRemaining (timeInSeconds) {
  const t = timeInSeconds
  return {
    total: t,
    days: Math.floor(t / (60 * 60 * 24)),
    hours: Math.floor((t / (60 * 60)) % 24),
    minutes: Math.floor((t / 60) % 60),
    seconds: Math.floor(t % 60)
  }
}
