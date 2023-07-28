// Clock

const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
};

updateTime();
setInterval(updateTime, 1000);

$("#stopwatch-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch");
});

$("#timer-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".timer").slideDown();
  $(".type").html("Timer");
});


$(".back-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".clock").slideDown();
  $(".type").html("Clock");
});

let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliSeconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

function stopwatch() {
  stopwatchMiliSeconds++;
  if (stopwatchMiliSeconds === 100) {
    stopwatchMiliSeconds = 0;
    stopwatchSeconds++;
  }
  if (stopwatchSeconds === 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
  }
  if (stopwatchMinutes === 60) {
    stopwatchMinutes = 0;
    stopwatchHours++;
  }

  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliSeconds = 0;
  laps = 0;
  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");

}

$(".start-stopwatch").click(function () {
  startStopwatch();
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
});

$(".lap-stopwatch").click(function () {
  laps++;
  $(".lap").removeClass("active");
  $(".laps").prepend(
    ` <div class="lap active">
      <p>Lap ${laps}</p>
      <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes )} 
        : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
          stopwatchMiliSeconds
        )}
      </p>
    </div>
    `
  );
});

$(".reset-stopwatch").click(function () {
  resetStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".laps").html("");
});

function addTrailingZero(number) {
  return number < 10 ? "0" + number : number;
}

let time = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerMiliseconds = 0,
  timerRunning = false,
  timerInterval;

function getTime() {
  time = prompt("Enter time in minutes");
  time = time * 60;
  if(!time || isNaN(time) || time<=0){
    alert("Invalid Time");
  }
  setTime();
}
function setTime() {
  timerHours = Math.floor(time / 3600);
  timerMinutes = Math.floor((time % 3600) / 60);
  timerSeconds = Math.floor(time % 60);

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));
}

function timer() {
  timerMiliseconds--;
  if (timerMiliseconds === -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds === -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes === -1) {
    timerMinutes = 59;
    timerHours--;
  }

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));
  
  timeUp();
}

function startTimer() {
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
    alert("Enter valid time in minutes");
    getTime();
  } else {
    timerInterval = setInterval(timer, 10);
    timerRunning = true;
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  $(".start-timer").show();
  $(".stop-timer").hide();
}

function resetTimer() {
  stopTimer();
  time = 0;
  setTime();
}

function timeUp() {
  if (
    timerHours === 0 &&
    timerMinutes === 0 &&
    timerSeconds === 0 &&
    timerMiliseconds === 0 
  ) {
    stopTimer();
    alert("Time's up!");

    setTime();
  }
}

$(".start-timer").click(startTimer);

$(".stop-timer").click(stopTimer);

$(".reset-timer").click(function () {
  resetTimer();
  if (!timerRunning) {
    $(".start-timer").show();
    $(".stop-timer").hide();
  }
});

//Alarm
// Get elements from the DOM
const clockElement = document.getElementById('clock');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarmBtn');

// Set alarm function
let alarmIntervalId;

function setAlarm() {
  const alarmTime = alarmTimeInput.value;

  // Check if the input is a valid time
  if (isValidTime(alarmTime)) {
    // Get the current time
    const now = new Date();

    // Get the alarm time
    const alarmTimeParts = alarmTime.split(':');
    const alarmHours = parseInt(alarmTimeParts[0]);
    const alarmMinutes = parseInt(alarmTimeParts[1]);

    // Set the alarm time with the current date
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHours, alarmMinutes);

    // Calculate the time difference between now and the alarm time
    const timeDiff = alarmDate.getTime() - now.getTime();

    // Check if the alarm time is in the future
    if (timeDiff > 0) {
      // Start the alarm
      alarmIntervalId = setTimeout(() => {
        alert('Wake up!');
      }, timeDiff);
    } else {
      alert('Please set a future time.');
    }
  } else {
    alert('Please enter a valid time in the format HH:MM.');
  }
}

// Helper function to check if a time is valid
function isValidTime(time) {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

// Update the clock every second
setInterval(() => {
  const now = new Date();
  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());
  const currentTime = `${hours}:${minutes}:${seconds}`;
  clockElement.innerText = currentTime;
}, 1000);

// Helper function to pad zeros
function padZero(number) {
  return number.toString().padStart(2, '0');
}

// Add event listener to the Set Alarm button
setAlarmButton.addEventListener('click', setAlarm);

//worldclock
var data=[
  {
    country:"NEW YORK",
    timeZone:"America/New_York",
  },
  {
    country:"LONDON",
    timeZone:"Europe/London"
  },
  {
    country:"BANGKOK",
    timeZone:"Asia/Bangkok"
  },
  {
    country:"SYDNEY",
    timeZone:"Australia/Sydney"
  }
]

option={day:"2-digit",month:"short",year:"numeric",hour12:false,hour:"numeric",minute:"2-digit"};

//DOM
var timeTable=document.querySelector('.timeZone');


function clockMaker(){
  timeTable.innerHTML='';
  //new Date
  let now=new Date();
  for(let i=0;i<data.length;i++){
    option.timeZone=data[i].timeZone;
    let str=now.toLocaleString('en',option);

    let splice=str.split(',')
    let month=splice[0].split(' ')[0];
    let day=splice[0].split(' ')[1];
    let year=splice[1];

    let DMY_combine=day+' '+month+','+year;
    let time=splice[2];
    let country=data[i].country;

    var tr=document.createElement('tr');
    if(i==0 | i==4){
      tr.setAttribute('class','bg_dark');
    }   
    tr.innerHTML=`<td>
                  <h3>${country}</h3><br><p>${DMY_combine}</p>
                  </td>
                  <td><p class="time">${time}</p>
                  ` 
    timeTable.appendChild(tr);
  }
}
clockMaker();
setInterval(clockMaker,30000);