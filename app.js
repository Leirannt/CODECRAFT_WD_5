let valueSearch = document.getElementById("valueSearch");
let city = document.getElementById("city");
let temprature = document.getElementById("temprature");
let description = document.querySelector(".description");
let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let main = document.querySelector("main");
let form = document.querySelector("form");

let id = "660b369066e466beb4c72bec042b81c2";
let baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + id;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (valueSearch.value != "") {
    searchWeather(valueSearch.value);
    valueSearch.value = "";
  }
});

// Search by city name
const searchWeather = (cityName) => {
  fetch(baseUrl + "&q=" + cityName)
    .then((response) => response.json())
    .then((data) => {
      updateUI(data);
    });
};

// Search by geolocation (lat & lon)
const getWeatherByCoordinates = (lat, lon) => {
  fetch(baseUrl + `&lat=${lat}&lon=${lon}`)
    .then((response) => response.json())
    .then((data) => {
      updateUI(data);
    });
};

// Update UI with weather data
const updateUI = (data) => {
  if (data.cod == 200) {
    city.querySelector("figcaption").innerText = data.name;
    city.querySelector("img").src =
      "https://flagsapi.com/" + data.sys.country + "/shiny/32.png";
    temprature.querySelector("span").innerText = data.main.temp + "°C";
    temprature.querySelector("img").src =
      "http://openweathermap.com/img/wn/" + data.weather[0].icon + "@4x.png";
    description.innerText = data.weather[0].description;
    clouds.innerText = data.clouds.all + "%";
    humidity.innerText = data.main.humidity + "%";
    pressure.innerText = data.main.pressure + " hPa";
    main.classList.remove("error");
  } else {
    main.classList.add("error");
    setTimeout(() => {
      main.classList.remove("error");
    }, 500);
  }
};

// Get user's location on page load
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCoordinates(lat, lon);
      },
      (error) => {
        console.warn("Gagal mendapatkan lokasi, error:", error.message);
        // fallback default
        searchWeather("Rantepao");
      }
    );
  } else {
    alert("Browser tidak mendukung Geolocation.");
    searchWeather("Rantepao");
  }
};
