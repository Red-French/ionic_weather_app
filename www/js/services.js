// 'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_APIKEY', 
  function($q, $resource, $http, FORECASTIO_APIKEY) {
  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_APIKEY + '/';

  var weatherResource = $resource(url, {
      callback: 'JSON_CALLBACK',  // JSONP data will be sent here (AngularJS callback for JSONP is always called this)
  }, {
    get: {
      method: 'JSONP'  // JSONP enables cross domain requests (wraps data in a javascript function)
    }
  });

  return {
    // called from controller 'HomeCtrl'
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
      // index lookup

      return cities[cityId];
    }
  }
}).
factory('DataStore', function() {
    var DataStore = {
        city:       'Chapel Hill, TN',
        latitude:   35.6282,
        longitude:  86.6962 
    };
    console.log("DataStore", DataStore);
    DataStore.setCity = function (value) {  // called from inside 'changeCity' in controllers.js
      console.log("enter factory>'setCity' =", DataStore.city);
       DataStore.city = value;  
       console.log("exit factory>'setCity' =", DataStore.city);
    };

    DataStore.setLatitude = function (value) {  // called from inside 'changeCity' in controllers.js
       DataStore.latitude = value;
       console.log(DataStore.city, "lat", DataStore.latitude);
    };

    DataStore.setLongitude = function (value) {  // called from inside 'changeCity' in controllers.js
       DataStore.longitude = value;
       console.log(DataStore.city, "long", DataStore.longitude);
    };

    return DataStore;
})
.factory('Weather', forecastioWeather);

