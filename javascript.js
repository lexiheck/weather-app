let now = new Date();
let date = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = [now.getHours()];
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = [now.getMinutes()];
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#clouds").innerHTML = response.data.clouds.all;
}

function searchCity(cityName) {
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentWeather(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enter-city").value;
  searchCity(cityName);
}

function searchLocation(position) {
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocationWeather(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", showCurrentWeather);

let currentLocationButtton = document.querySelector("#current-location");
currentLocationButtton.addEventListener("click", currentLocationWeather);

searchCity("New York");
