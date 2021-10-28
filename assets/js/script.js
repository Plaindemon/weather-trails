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
