'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', 
  function($q, $resource, $http, FORECASTIO_KEY) {
  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

  var weatherResource = $resource(url, {
    callback: 'JSON_CALLBACK',
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    //getAtLocation: function(lat, lng) {
    getCurrentWeather: function(lat, lng) {
      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
    }
  }
}];

angular.module('starter.services', ['ngResource'])
.factory('Cities', function() {
var cities = [
    { id: 0, name: 'Chapel Hill, TN', lat:35.6282 , lgn: 86.6962 },
    { id: 1, name: 'Anchorage' ,lat: 61.2167 , lgn: 149.9000 },
    { id: 2, name: 'Moscow' ,lat:55.7500 , lgn: 37.6167 },
    { id: 3, name: 'Tokyo' ,lat: 35.6833 , lgn: 139.6833 },
    { id: 4, name: 'Johannesburg' ,lat: 26.2044 , lgn:28.0456  },
    { id: 5, name: 'Quito, Ecuador' ,lat:0.2333 , lgn: 78.5167 }
  ];

  return {
    all: function() {
      return cities;
    },
    get: function(cityId) {
      // Simple index lookup
      return cities[cityId];
    }
  }
}).
factory('DataStore', function() {
    //create datastore with default values
    var DataStore = {
        city:       'Chapel Hill, TN',
        latitude:   35.6282,
        longitude:  86.6962 };

    DataStore.setCity = function (value) {
       DataStore.city = value;
    };

    DataStore.setLatitude = function (value) {
       DataStore.longitude = value;
    };

    DataStore.setLongitude = function (value) {
       DataStore.longitude = value;
    };

    return DataStore;
})
.factory('Weather', forecastioWeather);