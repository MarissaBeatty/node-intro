var request = require('request-promise');

// promiseFunction1(input)
//   .then(promiseFunction2)
//   .then(function(data){
//     console.log(data, "end data");
//   })

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
  return request('http://api.open-notify.org/iss-now.json')
  .then(
    function(response) {
      // Parse as JSON
      var longLocation = JSON.parse(response);
      var latLng = {};
      latLng.lat = longLocation.iss_position.latitude;
      latLng.lng = longLocation.iss_position.longitude;
      
      // console.log(latLng);
      
      // Return object with lat and lng
      return latLng;
    })
    //need to add .catch error here
}
getIssPosition();

function getAddressPosition(address) {
  var api = "AIzaSyDrqwaIXfB_nm_a38MmL7y6OD3KLgXBsgc";
  return request("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + api)
  .then(
    function(response) {
      var addressLocation = JSON.parse(response);
      var addressLatLng = {};
      addressLatLng.lat = addressLocation.results[0].geometry.location.lat;
      addressLatLng.lng = addressLocation.results[0].geometry.location.lng;
      
      // console.log(addressLatLng);
      return addressLatLng;
    });
  
} getAddressPosition("665 Quaker Road, Welland, ON L3C 3H1");


function getCurrentTemperatureAtPosition(position) {
  return request("https://api.darksky.net/forecast/88d37b4e17f7b3ccdb8368d2b3c4bf8b/43.0219085,-79.27941419999999") 
  .then(
    function(response) {
      var tempLatLng = JSON.parse(response);
      var currentTemp = tempLatLng["currently"];
      var tempOnly = currentTemp["temperature"];
        console.log(tempOnly);
        return tempOnly;
    });

}
// var position = {latitude: 43.0219085, longitude :-79.27941419999999 };   need to figure out how to pass the param correctly!! 
getCurrentTemperatureAtPosition();



function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {
  
}