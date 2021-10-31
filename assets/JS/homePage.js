// Global Variables
// var to connect to input in search 
var inputSearchName = document.querySelector("#input-state");
var searchCityBtn = document.querySelector("#search-city-btn");
var inputContainerEl = document.querySelector("#input-container");
var parks = [];

// code using nps.gov API - use to get info from about places near the location desired 
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
const apiKeyNps = "4fxi1Pok4kgde26ywgQnyEaaxknpMlmKw3svW5lP";

function parkInfo() {

    fetch("https://developer.nps.gov/api/v1/parks?stateCode=" + inputSearchName.value + "&api_key=" + apiKeyNps + "&fields=description,fullName,url,activities,latitude,longitude,directionsInfo,addresses,weatherInfo,name,directionsUrl,operatingHours", requestOptions)
    .then(response => response.json())
    .then(result => { 
       console.log(result.data[0]);
        parks = result.data;
        var ulEl = document.createElement("ul");
        // do all the html stuff to display the parks
        for(var i = 0; i <result.data.length; i++) {
            
            var liEl = document.createElement("li");
            var aEl = document.createElement('a');
            aEl.setAttribute('href',result.data[i].url);
            aEl.innerText = result.data[i].fullName;
            liEl.appendChild(aEl);
            ulEl.appendChild(liEl);
        }
        inputContainerEl.innerText = '';
        inputContainerEl.appendChild( ulEl);
    })
    .catch(error => console.log('error', error));
}




var formData = function() {
    inputForm.addEventListener('click', function(){
        alert('button was clicked');
        console.log(inputForm);
    });
};
// var searchBtn = function() {
//     // reacts to click on the search button
searchCityBtn.addEventListener('click', function(){
        // alert("search button was clicked");
        parkInfo();
        
});





