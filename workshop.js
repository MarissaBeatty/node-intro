var request = require('request-promise');

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
     .catch(function(error) {
    console.log("There was an error with your getIssPosition request");
  })
}

// getIssPosition();

function getAddressPosition(address) {
  var api = "AIzaSyDrqwaIXfB_nm_a38MmL7y6OD3KLgXBsgc";
  return request("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + api)
  .then(
    function(response) {
      var addressLocation = JSON.parse(response);
      var position = {};
      position.lat = addressLocation.results[0].geometry.location.lat;
      position.lng = addressLocation.results[0].geometry.location.lng;
      // console.log(position);
      return position;
    })
    .catch(function(error) {
    console.log("There was an error with your getAddressPosition request");
  })
} 
// getAddressPosition("665 Quaker Road, Welland, ON L3C 3H1");


function getCurrentTemperatureAtPosition(position) {
  return request("https://api.darksky.net/forecast/88d37b4e17f7b3ccdb8368d2b3c4bf8b/" + position.lat + "," + position.lng) 
  .then(
    function(response) {
      var tempLatLng = JSON.parse(response);
      var currentTemp = tempLatLng["currently"];
      var tempOnly = currentTemp["temperature"];
        // console.log(tempOnly);
        return tempOnly;
    })
    .catch(function(error) {
      console.log("There was an error with your getCurrentTemperatureAtPosition request");
  })
}    
// getCurrentTemperatureAtPosition({lat: 43.0219085, lng:-79.27941419999999 });


function getCurrentTemperature(address) {
  // var position = getAddressPosition.position;
  // var temperature = getCurrentTemperatureAtPosition.tempOnly;
  getAddressPosition(address)
  .then(function(response) {
      return getCurrentTemperatureAtPosition(response); 
  })
  .catch(function(error) {
    console.log("There was an error with your getCurrentTempertaure request");
  });
}

getCurrentTemperature("665 Quaker Road, Welland ON, L3C 3H1");


function getDistanceFromIss(address) {
  
}