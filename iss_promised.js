const request = require('request-promise-native');
// const request  = require("request");

// use request to fetch IP address from JSON API
const fetchMyIP = function() {       // input none
  return request('https://api.ipify.org?format=json');  //Returns: Promise of request for ip data, returned as JSON string
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://feegeoip.app/json/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};



// Returns: Promise for fly over data for users location
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

