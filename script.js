const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItems = document.getElementById("current-info");
const timeZone = document.getElementById("timeZone");
const country = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTemp = document.getElementById("current-temp");

//setting the time interval so that the time changes at every interval we give by using the setinterval call back funtion

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hours = time.getHours();
  const minute = time.getMinutes();

  timeEl.innerHTML = hours + ":" + minute;
  //   dateEl.innerHTML = date + day;
}, 1000);
