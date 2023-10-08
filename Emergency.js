function doDate() {
    var str = "";

    var days = new Array("יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת");
    var months = new Array("ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר");

    var now = new Date();

    str += days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    document.querySelector("#info").innerHTML = str;
}

var t = setInterval(doDate, 1000);

const countdownEl = document.querySelector('#timer')
const startStopBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')

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

var iframe = document.querySelector(".alerts");
var elmnt = iframe.contentWindow.document.getElementsByTagName("P");
if (elmnt === "בית דגן") {
    startCountdown()
    document.querySelector(".newsBox").style.backgroundColor = '#a71010';
    document.querySelector(".infoBox").style.backgroundColor = '#a71010';
    document.querySelector(".timerBox").style.backgroundColor = '#a71010';
    document.querySelector(".rokectsAlerts").style.backgroundColor = '#a71010';
    document.querySelector('#start').style.backgroundColor = '#fff';
    document.querySelector('#start').style.color = '#0e0e0e';
    document.querySelector('#reset').style.color = '#0e0e0e';
    document.querySelector('#reset').style.backgroundColor = '#fff';
    document.querySelector(".alertY").style.display = "flex";
    RedHere = true
}

let RedHere = false

document.querySelector('#alert').addEventListener("click", () => {
    if (RedHere == true) {
        stopCountdown()
        document.querySelector(".newsBox").style.backgroundColor = '#0e0e0e';
        document.querySelector(".infoBox").style.backgroundColor = '#0e0e0e';
        document.querySelector(".timerBox").style.backgroundColor = '#0e0e0e';
        document.querySelector(".rokectsAlerts").style.backgroundColor = '#0e0e0e';
        document.querySelector('#start').style.backgroundColor = '#1F1E2D';
        document.querySelector('#start').style.color = '#fff';
        document.querySelector('#reset').style.color = '#fff';
        document.querySelector('#reset').style.backgroundColor = '#1F1E2D';
        document.querySelector(".alertY").style.display = "none";
        document.querySelector(".alertLight").style.display = "none";
        RedHere = false
    } else {
        startCountdown()
        document.querySelector(".newsBox").style.backgroundColor = '#a71010';
        document.querySelector(".infoBox").style.backgroundColor = '#a71010';
        document.querySelector(".timerBox").style.backgroundColor = '#a71010';
        document.querySelector(".rokectsAlerts").style.backgroundColor = '#a71010';
        document.querySelector('#start').style.backgroundColor = '#fff';
        document.querySelector('#start').style.color = '#0e0e0e';
        document.querySelector('#reset').style.color = '#0e0e0e';
        document.querySelector('#reset').style.backgroundColor = '#fff';
        document.querySelector(".alertY").style.display = "flex";
        document.querySelector(".alertLight").style.display = "block";
        RedHere = true
    }
})
