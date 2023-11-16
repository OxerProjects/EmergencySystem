// Date

function doDate()
{
    var str = "";

    var days = new Array("יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת");
    var months = new Array("ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר");

    var now = new Date();

    str += days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    document.querySelector("#info").innerHTML = str;
}

setInterval(doDate,1000);

// Timer

const countdownEl  = document.querySelector('#timer')
const startStopBtn = document.querySelector('#start')
const resetBtn  = document.querySelector('#reset')

let time = 600; // the initial time in seconds
let countdownInterval; // the interval ID for the countdown
let isCountingDown = false;

function startCountdown() {
  countdownInterval = setInterval(() => {
    time--;
    if (time < 0) {
      clearInterval(countdownInterval);
      return;
    }
    updateTime();
  }, 1000);
}
  
function stopCountdown() {
  clearInterval(countdownInterval);
}

function resetCountdown() {
  time = 600;
  updateTime();
  if (isCountingDown) {
    stopCountdown();
    startCountdown();
  }
}
function updateTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  countdownEl.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

startStopBtn.addEventListener('click', () => {
  if (isCountingDown) {
    stopCountdown();
    startStopBtn.innerText = 'התחל';
  } else {
    startCountdown();
    startStopBtn.innerText = 'עצור';
  }
  isCountingDown = !isCountingDown; // toggle the flag
});

resetBtn.addEventListener('click', resetCountdown);

updateTime();

// Alert

let RedHere = false

function alertStart() {
    startCountdown()
    document.querySelector(".newsBox").style.backgroundColor = '#A52A2A';
    document.querySelector(".infoBox").style.backgroundColor = '#A52A2A';
    document.querySelector(".timerBox").style.backgroundColor = '#A52A2A';
    document.querySelector(".rokectsAlerts").style.backgroundColor = '#A52A2A';     
    document.querySelector('#start').style.backgroundColor = '#fff';  
    document.querySelector('#AlertB').style.backgroundColor = '#A52A2A';
    document.querySelector('#start').style.color = '#181414';  
    document.querySelector('#reset').style.color = '#181414';  
    document.querySelector('#reset').style.backgroundColor = '#fff'; 
    document.querySelector('#AlertB').className = 'redAlert'; 
    document.querySelector(".alertLight").style.display = "block";
    RedHere = true 
}

 function alertStop() {
    stopCountdown()
    document.querySelector(".newsBox").style.backgroundColor = '#181414';
    document.querySelector(".infoBox").style.backgroundColor = '#181414';
    document.querySelector(".timerBox").style.backgroundColor = '#181414';
    document.querySelector(".rokectsAlerts").style.backgroundColor = '#181414';     
    document.querySelector('#start').style.backgroundColor = '#1F1E2D';  
    document.querySelector('#start').style.color = '#fff';  
    document.querySelector('#reset').style.color = '#fff';  
    document.querySelector('#reset').style.backgroundColor = '#1F1E2D';  
    document.querySelector('#AlertB').className = 'redAlert-closed'; 
    document.querySelector(".alertLight").style.display = "none";
    RedHere = false
}

document.querySelector('#alert').addEventListener("click", () => {
  const stopAlert = setTimeout(alertStop, 600000);
    if (RedHere == true) {
        clearTimeout(stopAlert)
        alertStop()
    } else {
        alertStart()
    }
})

// menu

let OptionsOpen = false

document.querySelector('#menu1').addEventListener("click", () => {
  if(OptionsOpen == true) {
    document.querySelector('#options').className = 'options';  
    document.querySelector('#menu2').style.display = 'none';  
    document.querySelector('#menu3').style.display = 'none';
    document.querySelector('.alertIcon3').style.transform = 'rotate(0deg)'; 
    OptionsOpen = false  
  } else {
    document.querySelector('#options').className = 'options-open'; 
    document.querySelector('#menu2').style.display = 'flex';   
    document.querySelector('#menu3').style.display = 'flex';  
    document.querySelector('.alertIcon3').style.transform = 'rotate(180deg)'; 
    OptionsOpen = true 
  }
})

// Alerts Area:

let AlertIsOn = false

function AlertClose() {
  document.querySelector("#areaBox").className = "areaBox-hide"
}

async function chackData(data) {
  if (data && data.data && data.data[0]) {
    let areas = data.json();
    areas.cities.forEach((area) => {
      console.log('====================================');
      console.log("system working:" + area);
      console.log(areas.cities);
      console.log('====================================');
      if (area.includes("בית דגן")) {
        if (AlertIsOn == false) {
          // Alert View:
          alertStart();
          var audio = new Audio("./media/hazhaka.mp3");
          audio.play();
          setTimeout(AlertClose, 10000);
          document.querySelector("#areaBox").className = "areaBox";
          // Alert Data:
          console.log("Data:", data.data[0]);
          console.log(areasSplited);
          AlertIsOn = true;
        } else {
          console.log("לא נמצאו אזעקות");
          console.log(data.data[0]);
          if (time === 0) {
            AlertIsOn = false;
          }
        }
      }
    });
  } else {
  }

  setTimeout(() => chackData(data), 1000);
}

function verifyDataChack() {
  fetch('https://www.mako.co.il/Collab/amudanan/alerts.json')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
    var now = new Date();
      console.log("לא נמצעו רקטות " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds());
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

setInterval(verifyDataChack, 120000)



function updateAlerts() {
  fetch('https://www.mako.co.il/Collab/amudanan/alerts.json')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      chackData(data)
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

setInterval(updateAlerts, 1000)
