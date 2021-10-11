'use strict';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerId = null;
    this.targetDate = targetDate;
    this.timerEl = selector;
  }
  start() {
    // updates Countdown Timer once per second
    this.timerId = setInterval(() => {
      // calc difference between target and current time
      const diff = this.targetDate.getTime() - Date.now();

      if (diff <= 0) {
        this.stop();
        return;
      }

      // get time components from the time difference and then update
      // values on the page
      showCountdownTimer(this.getTimeComponents(diff), this.timerEl);
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);

    showCountdownTimer(
      { days: '00', hours: '00', mins: '00', secs: '00' },
      this.timerEl,
    );
  }

  // getting time components from
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  // add '0' if num < 10
  pad(num) {
    return String(num).padStart(2, '0');
  }
}

// ------------- class end ----------------------

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2022, 0, 1, 0, 0, 0),
});
timer.start();

// show Countdown Timer
function showCountdownTimer(timeComponenstObj, selector) {
  const { days, hours, mins, secs } = timeComponenstObj;
  const timerEl = document.querySelector(`${selector}`);
  const timerString = `
    <div class="field">
      <span class="value" data-value="days">${days}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-value="hours">${hours}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-value="mins">${mins}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
      <span class="value" data-value="secs">${secs}</span>
      <span class="label">Seconds</span>
    </div>`;
  timerEl.innerHTML = timerString;
}
