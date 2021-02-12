let now = new Date();
// newDate tells exact time , i was trying to use a function to call the array when I could have just used this js dates rule
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let list = document.querySelector("#currenttime");
list.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;



function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}



function displayTemp(response) {
  document.querySelector("#city").innerHTML = 
  response.data.name;
  document.querySelector("#temp").innerHTML = 
  Math.round(
    response.data.main.temp);
  document.querySelector("#humid").innerHTML = 
  response.data.main.humidity;
  document.querySelector("#wind").innerHTML = 
  Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    fahrenheitTemperature = response.data.main.temp;
  // can console log response.data to find where ^ humidity, wind, temp is located
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  // this resets the forecast each time so we can start from scratch 
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
                            <h3>${formatHours(forecast.dt * 1000)}</h3>
                            <img 
                            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                            <div class="weather-forecast-temperature">
                                <strong>${Math.round(forecast.main.temp_max)}&deg;</strong> ${Math.round(forecast.main.temp_min)}&deg;
                            </div>
                        </div>
                        `;
  }
  
// for loop allows you to repeat something multiple times 
// index tracks the current value of the 0 that is incremented one by one 

}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "216598f817e9e34d672a7a0c88bebdfa";
  // ^ a string 
  let city = document.querySelector("#city-input").value;
  // this essentially logs the city that was typed into the search form but below, using the api, we will get the url to that city and its appropriate info about that city 
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  // can console log 'apiUrl' at this time to make sure it is connected
  // paste the cdn from github api into the head of html
  axios.get(apiUrl).then(displayTemp);
  // make an API call to OpenWeather API
  // once I get the http response, we display the city name and the temperature

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#search-form");
// this takes control over the form and changes the control to js and not html 
form.addEventListener("submit", handleSubmit);


function showPosition(position) {
  let apiKey = "216598f817e9e34d672a7a0c88bebdfa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayTemp);
  // ^ exact same response because the api gives us back the same object structure (it will use the same API doc)
 url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayForecast);
}


function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;

  temperature.innerHTML = Math.round(celsiusTemperature);

}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperature = document.querySelector("#temp");

  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let button = document.querySelector("#geoweather");
button.addEventListener("click", getCurrentPosition);
// ^these are global variables, not local variables, meaning they are operating outside a function and are accessible from inside functions 

// whenever i click on the button, i want to display the current position

// summary (few patterns/tricks)
// always add an id to an element i want to interact with
// select it and then handle the callbacks 

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
