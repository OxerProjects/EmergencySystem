async function updateAlerts() {
  try {
    const response = await fetch('https://www.mako.co.il/Collab/amudanan/alerts.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    let areas = data.data[0];
    const areasSplited = areas.split(" ,");

    setInterval(function () {
      console.log("לא נמצאו אזעקות");
      console.log(data.data[0]);
    }, 10000);

    areasSplited.forEach(area => {
      if (area.includes("בית דגן")) {
        if (AlertIsOn == false) {
          // Alert View:
          alertStart();
          var audio = new Audio('./media/hazhaka.mp3');
          audio.play();
          setTimeout(AlertClose, 10000);
          document.querySelector("#areaBox").className = "areaBox";
          // Alert Data: 
          console.log('Data:', data.data[0]);
          console.log(areasSplited);
          AlertIsOn = true;
        } else {
          if (time === 0) {
            AlertIsOn = false;
          }
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function doDate() {
  try {
    const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
    const months = ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

    const now = new Date();
    const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    document.querySelector("#info").innerHTML = dateString;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  try {
    setInterval(doDate, 1000);

    const countdownEl = document.querySelector('#timer');
    const startStopBtn = document.querySelector('#start');
    const resetBtn = document.querySelector('#reset');

    // ... (rest of your code)

    setInterval(updateAlerts, 1000);

    make sure to call main() somewhere in your script to start the execution.
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
