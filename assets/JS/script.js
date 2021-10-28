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
// Get cURL resource
$curl = curl_init();
// Set options - in link below
$dataURL = 'https://developer.nps.gov/api/v1/parks?stateCode=me';
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER =--> true,
CURLOPT_URL => $dataURL,
CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'],
CURLOPT_HTTPHEADER => array('Authorization: afyndbL7m66Df4K867QK7Sr0dWfAAHIEs8iWWIVy')
));
// Additional code would follow



