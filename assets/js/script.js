// Global Variables
// var to connect to input in search 
var inputForm = document.getElementById('input-city');
var searchCity = document.getElementById('search-city-btn');

var formData = function() {
    inputForm.addEventListener('click', function(){
        console.log(searchCity);
    });
}
var searchBtn = function() {
    // reacts to click on the search button
    searchCity.addEventListener('click', function(){
        alert("search button was clicked");
        
    });
    console.log("HELLO");
};

// searchBtn();

// code using nps.gov API - use to get info from about places near the location desired
// $dataURL = 'https://developer.nps.gov/api/v1/parks?stateCode=me';

var places = fetch("https://developer.nps.gov/api/v1/parks?limit=15&start=10&fields=fullName%2C%20%20URL%2C%20state%2C%20%20description%2C%20activities%2C%20directionsInfo%2C%20directionsURL%2C%20weatherInfo%2C%20", {
	"method": "GET",
	"headers": {
		"x-api-key": "4fxi1Pok4kgde26ywgQnyEaaxknpMlmKw3svW5lP",
	}
})
.then(response => {
    // log an array to the console using data function
    response.json().then(function(data) {
        console.log(data);
      });
	// console.log(response);
    console.log("inside", places);
})
.catch(err => {
	console.error(err);
});

console.log("outside", places);





mapboxgl.accessToken = 'pk.eyJ1IjoieW91cmJyb3RoZXJzb24iLCJhIjoiY2t2N29tOHc4MXI5ZDJvcDY0Z3BpOGdscSJ9.8CudkVmUxTWSc71lYIYdag';

const map = new mapboxgl.Map({
container: 'mapBox', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
//make function to find latitude and longitude from given input
center: [-74.5, 40], // starting position [lng, lat]
//data points array will be added right here which will call the trails
zoom: 9 // starting zoom
});
console.dir(map)
// 5 day weather forecast

function initPage() {
    const inputEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");4
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
    

    const APIKey = "c69bc69003846c93e0fb0181c65079e1";


    function getWeather(cityName) {

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);

            const currentDate = new Date(response.data.dt*1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt",response.data.weather[0].description);
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        axios.get(UVQueryURL)
        .then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currentUVEl.innerHTML = "UV Index: ";
            currentUVEl.append(UVIndex);
        });

        let cityID = response.data.id;
        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        axios.get(forecastQueryURL)
        .then(function(response){

            console.log(response);
            const forecastEls = document.querySelectorAll(".forecast");
            for (i=0; i<forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";
                const forecastIndex = i*8 + 4;
                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
                }
            })
        });  
    }

    searchEl.addEventListener("click",function() {
        const searchTerm = inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    clearEl.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = document.createElement("input");

            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }




}
// initPage();

  
