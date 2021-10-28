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
	console.log(response);
})
.catch(err => {
	console.error(err);
});

console.log(places);





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
