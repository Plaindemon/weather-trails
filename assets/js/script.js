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

// code sample for passing nps.gov API - use to get trail info from nps.gov
// // Set options 
$dataURL = 'https://developer.nps.gov/api/v1/parks?stateCode=me';

// Additional code would follow




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
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");4
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
    

    const APIKey = "c69bc69003846c93e0fb0181c65079e1";


    function getWeather(cityName) {

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);
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
    })


    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

}
initPage();

  
