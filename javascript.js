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

function displayForecast(response){
  let weeklyForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  days.forEach(function (day) {
  forecastHTML = 
  forecastHTML + 
        `
          <tr>
            <th scope="row">${day}</th>
            <td>☁️</td>
            <td>High: 65&deg;</td>
            <td>Low: 44&deg;</td>
          </tr>`;
});
    
  forecastHTML = forecastHTML + `</div>`;

  weeklyForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates){
let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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

function displayFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);

}

function displayCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", showCurrentWeather);

let currentLocationButtton = document.querySelector("#current-location");
currentLocationButtton.addEventListener("click", currentLocationWeather);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemp = null; 

searchCity("New York");