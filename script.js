const timeEl = document.querySelector("#time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZone = document.getElementById("timeZone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTemp = document.getElementById("current-temp");
const arrow = document.querySelector(".arrow-1");
// const container = document.querySelector(".container");
const container = document.querySelector(".container2");
const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

//function to close the container by clicking the arrow down
// function closeContainer() {
//   container.classList.add("hidden");
//   arrow.style.top = "15rem";
//   arrow.style.transform = "rotate(-45deg)";
// }
// //Event handler to open the container by clicking the arrow button
// arrow.addEventListener("click", function () {
//   container.classList.remove("hidden");
//   arrow.style.top = 0;
//   arrow.style.transform = "rotate(135deg)";
//   arrow.addEventListener("click", closeContainer);
// });

//getting the API key from the respective API
const API_KEY = "60c6fa6a69ff49ba703c743216474064";

//setting the time interval so that the time changes at every interval we give by using the setinterval call back funtion

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";

    //giving the real time to the time Element
    timeEl.innerHTML =
        (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        " " +
        `<span id="am-pm">${ampm}</span>`;
    //giving the real time date to the date ELement
    dateEl.innerHTML = days[day] + "," + " " + +date + " " + months[month];
}, 100);

getWeatherData();
//*? function to call the GEOLOCATION API
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        //   console.log(success);
        //Doing object Destructuring

        //This will get us the latitude and longitude values
        let { latitude, longitude } = success.coords;

        //Fetching the API

        fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
            ) //promise function
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                showWeatherData(data);
            });
    });
}

function showWeatherData(data) {
    let { humidity, pressure, wind_speed, feels_like } = data.current;
    timeZone.innerHTML = data.timezone;

    currentWeatherItemsEl.innerHTML = `<div class="weather-items">
              <p>Humidity</p>
              <p>${humidity} %</p>
            </div>
            <div class="weather-items">
              <p>Wind Speed</p> 
              <p>${wind_speed}</p>
            </div>
            <div class="weather-items">
              <p>Pressure</p>
              <p>${pressure} pa</p>
            </div>
            <div class="weather-items">
              <p>Feels like</p>
              <p>${feels_like} &#176;</p>
            </div>`;

    // For the Current and week forecast cards

    let otherDayForecast = "";
    data.daily.forEach((day, index) => {
        if (index == 0) {
            currentTemp.innerHTML = `
      <img src="http://openweathermap.org/img/wn//${
        day.weather[0].icon
      }@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("dddd")}</div>
                  <div class="temp">Day - ${day.temp.day} &#176;C</div>
                <div class="temp">Night - ${day.temp.night} &#176;C</div>
            </div>
        `;
        } else {
            otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">${day.temp.day} &#176;C</div>
                <div class="temp">${day.temp.night} &#176;C</div>
            </div>
            
            `;
        }
    });

    weatherForecastEl.innerHTML = otherDayForecast;
}

//*? Function to call the unsplash API

let clientID = "lcRgPGUlXm08JoTGan2xvx7hCWCgABTqgYXqQ5qT5vQ";
let unsplashAPIKEY = `https://api.unsplash.com/photos/random/?client_id=${clientID}`;

fetch(unsplashAPIKEY)
    .then((response) => response.json())
    .then((jsonData) => {
        console.log(jsonData);
        showRandomImage();
    });

showRandomImage = function(jsonData) {};