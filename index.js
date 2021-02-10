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
  // can console log response.data to find where ^ humidity, wind, temp is located
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "216598f817e9e34d672a7a0c88bebdfa";
  // ^ a string 
  let city = document.querySelector("#city-input").value;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  // can console log 'apiUrl' at this time to make sure it is connected
  // paste the cdn from github api into the head of html
  axios.get(apiUrl).then(displayTemp);
  // make an API call to OpenWeather API
  // once I get the http response, we display the city name and the temperature
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "216598f817e9e34d672a7a0c88bebdfa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayTemp);
  // ^ exact same response because the api gives us back the same object structure (it will use the same API doc)
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#geoweather");
button.addEventListener("click", getCurrentPosition);

// whenever i click on the button, i want to display the current position

// summary (few patterns/tricks)
// always add an id to an element i want to interact with
// select it and then handle the callbacks 