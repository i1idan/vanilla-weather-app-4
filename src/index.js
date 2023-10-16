function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row weather-forecast-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        style="filter:hue-rotate(280deg);" src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="62"
        
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function manipulation(response) {
  let cityHolder = document.querySelector(".cityName");
  let weatherHolder = document.querySelector("#weather");
  let tempHolder = document.querySelector("#temperature");
  let windHolder = document.querySelector("#Wind");
  let humidityHolder = document.querySelector("#Humidity");
  let dateHolder = document.querySelector(".time");
  let iconHolder = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  let temp = Math.round(response.data.main.temp);
  // console.log(response.data);
  // console.log(response.data.name);
  cityHolder.innerHTML = `<strong> ${response.data.name} </strong>`;
  tempHolder.innerHTML = `<strong> ${temp} </strong>`;
  weatherHolder.innerHTML = `${response.data.weather[0].description}`;
  windHolder.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  humidityHolder.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  dateHolder.innerHTML = `Last Updated: ${formatDate(response.data.dt * 1000)}`;
  iconHolder.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconHolder.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

let searchElement = document.querySelector(".weatherSearch");

function search(event) {
  event.preventDefault();
  let city = document.querySelector(".weatherInput").value;
  console.log(city);
  if (city === "") {
    alert("Please Enter a City Name");
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemprature);
  }
}

searchElement.addEventListener("click", search);

function showTemprature(response) {
  manipulation(response);
}

let currentElement = document.querySelector(".currentLocation");

// function getCurrent(event) {
//   event.preventDefault();
//   function current(position) {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     console.log(lat, lon);
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//     axios.get(url).then(showTemprature);
//   }
//   navigator.geolocation.getCurrentPosition(current);
// }

// currentElement.addEventListener("click", getCurrent);

let city = "tehran";
let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

function defaultCity(response) {
  manipulation(response);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);