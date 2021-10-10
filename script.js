'use strict';

const refs = {
  daysOutput: document.querySelector('[data-value="days"]'),
  hoursOutput: document.querySelector('[data-value="hours"]'),
  minsOutput: document.querySelector('[data-value="mins"]'),
  secsOutput: document.querySelector('[data-value="secs"]'),
  timerDate: document.querySelector('#timer-date'),
};

const targetDate = new Date(2022, 0, 1, 0, 0, 0);
// const targetDate = new Date(2021, 9, 10, 16, 24, 20);

refs.timerDate.innerHTML = showTargetDate(targetDate);

// updates Countdown Timer once per second
const timerId = setInterval(() => {
  // calc difference between target and current time
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    clearInterval(timerId);
    showCountdownTimer({ days: '00', hours: '00', mins: '00', secs: '00' });
    return;
  }

  // get time components from the time difference and then update
  // values on the page
  showCountdownTimer(getTimeComponents(diff));
}, 1000);

// getting time components from
function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

// add '0' if num < 10
function pad(num) {
  return String(num).padStart(2, '0');
}

// show Countdown Timer
function showCountdownTimer(timeComponenstObj) {
  const { days, hours, mins, secs } = timeComponenstObj;
  refs.daysOutput.innerHTML = days;
  refs.hoursOutput.innerHTML = hours;
  refs.minsOutput.innerHTML = mins;
  refs.secsOutput.innerHTML = secs;
}

// returns target date/time String in the format "year/month/date hh:mm:ss"
function showTargetDate(targetDate) {
  // console.log(targetDate);
  let targetDateString = '';
  targetDateString += targetDate.getFullYear() + '/';
  targetDateString += pad(targetDate.getMonth() + 1) + '/';
  targetDateString += pad(targetDate.getDate()) + ' ';
  targetDateString += pad(targetDate.getHours()) + ':';
  targetDateString += pad(targetDate.getMinutes()) + ':';
  targetDateString += pad(targetDate.getSeconds());

  return targetDateString;
}
