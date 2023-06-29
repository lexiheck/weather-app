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

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;

  let weeklyForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 7){
  forecastHTML = 
  forecastHTML + 
        `
          <tr>
            <th scope="row">${formatDay(forecastDay.dt)}</th>
            <td>
            <img
              src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt=""
              width="42"
              />
            </td>
            <td>High: ${Math.round(forecastDay.temp.max)}°F</td>
            <td>Low: ${Math.round(forecastDay.temp.min)}°F</td>
          </tr>`;}
});
    
  forecastHTML = forecastHTML + `</div>`;

  weeklyForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates){
let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response) {
   celsiusTemp = response.data.main.temp;
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector("#current-conditions").innerHTML = response.data.weather[0].description;
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#clouds").innerHTML = response.data.clouds.all;

  getForecast(response.data.coord);
 
}

function searchCity(cityName) {
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let units = "imperial";
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