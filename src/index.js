let apiKey = "2833a5c0ffd88b47f1e5f1647b27776f";
let now = new Date();
let hours = `${now.getHours()}`.padStart(2, "0");
let minutes = `${now.getMinutes()}`.padStart(2, "0");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

document.querySelector("#daying").innerHTML = `${day}, ${hours}:${minutes}`;

let searchForm = document.querySelector("#searchingForm");

function searchFormSubmit(event) {
  event.preventDefault();

  let searchCityValue = document.querySelector("#searchCity").value;

  if (searchCityValue !== "") {
    getWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCityValue}&appid=${apiKey}&units=metric`
    );
  }
}

function getWeather(apiUrl) {
  window.axios.get(apiUrl).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
  let temperature = Math.round(response.data.main.temp);

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperatureCity").innerHTML = `${temperature} °C`;
}

function handleError() {
  alert("Sorry, we don't know the weather for this city");
}

searchForm.addEventListener("submit", searchFormSubmit);

function showWeatherCurrentPoition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition, handleError);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  getWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  );
}

let currentPositionButton = document.querySelector(".positionButton");
currentPositionButton.addEventListener("click", showWeatherCurrentPoition);
