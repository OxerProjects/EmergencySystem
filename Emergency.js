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

async function alertStart() {
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
    setTimeout(alertStop, 300000)
}

async function areaBoxStart() {
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
  setTimeout(alertStop, 300000)
}

async function alertStop() {
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
    if (RedHere == true) {
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
    document.querySelector('#menu4').style.display = 'flex';  
    document.querySelector('.alertIcon3').style.transform = 'rotate(0deg)'; 
    OptionsOpen = false  
  } else {
    document.querySelector('#options').className = 'options-open'; 
    document.querySelector('#menu2').style.display = 'flex';   
    document.querySelector('#menu3').style.display = 'flex';  
    document.querySelector('#menu4').style.display = 'flex';  
    document.querySelector('.alertIcon3').style.transform = 'rotate(180deg)'; 
    OptionsOpen = true 
  }
})
// Auto Alert

let AlertIsOn = false

function AlertClose() {
  document.querySelector("#areaBox").className = "areaBox-hide"
}

function searchForWord() {
  var url = "https://www.mako.co.il/Collab/amudanan/alerts.json";
  var needle = "בית דגן";

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("GET", url, true);

  // Set up a callback function to handle the response
  xhr.onload = function() {
      if (xhr.status === 200) {
          // Parse the JSON response
          var data = JSON.parse(xhr.responseText);

          var Array = data && data.data;

          var elements = Array[0].split(', ');

         var searchTerm = "בית דגן";
          var found = elements.includes(searchTerm);

          if (found) {
            if (AlertIsOn == false) {
              alertStart()
              var audio = new Audio('hazhaka.mp3');
              audio.play();
              document.querySelector("#areaBox").className = "areaBox"; 
              setTimeout(AlertClose, 10000)
              setTimeout(AlertIsOn = false, 20000)  
              AlertIsOn = true
            } else {
              if (time == 0) {
                AlertIsOn = false
              } 
            }
          } else {
              console.log(searchTerm + " is not found in the array.");
          }
          
      } else {
          console.error("Failed to fetch data");
      }
  };

  // Handle network errors
  xhr.onerror = function() {
      console.error("Network error");
  };

  // Send the request
  xhr.send();
}

setInterval(searchForWord, 1000)