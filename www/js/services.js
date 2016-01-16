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
      var dataStuff = $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
        console.log("dataStuff", dataStuff);
        // console.log("$state", $value.config);
        
        
      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
    }
  }
}];

angular.module('starter.services', ['ngResource'])
.factory('Cities', function() {
var cities = [
    { id: 0, name: 'Chapel Hill, TN', lat:35.6282 , lgn: 86.6962 },
    { id: 1, name: 'New Johnsonville, TN' ,lat: 36.0192, lgn: 87.9675 },
    { id: 2, name: 'Gatlinburg, TN' ,lat: 35.7144, lgn: 83.5114 },
    { id: 3, name: 'Boulder, CO' ,lat: 40.0274, lgn: 105.2519 },
    { id: 4, name: 'Anchorage' ,lat: 61.2167 , lgn: 149.9000 },
    { id: 5, name: 'Moscow' ,lat:55.7500 , lgn: 37.6167 },
    { id: 6, name: 'Tel Aviv' ,lat: 32.0667 , lgn: 34.8000 },
    { id: 7, name: 'Johannesburg' ,lat: 26.2044 , lgn:28.0456  },
    { id: 8, name: 'Tokyo' ,lat: 35.6833 , lgn: 139.6833 },
    { id: 9, name: 'Quito, Ecuador' ,lat:0.2333 , lgn: 78.5167 },
    { id: 10, name: 'Seattle' ,lat: 47.6097, lgn: 122.3331 },
    { id: 11, name: 'Chicago' ,lat: 41.8369, lgn: 87.6847 },
    { id: 12, name: 'New York City' ,lat: 40.7127, lgn: 40.7127 },
    { id: 13, name: 'Anaheim' ,lat: 33.8361, lgn: 117.8897 },
    { id: 14, name: 'Houston' ,lat: 29.7604, lgn: 95.3698 },
    { id: 15, name: 'Paris, France' ,lat: 48.8567, lgn: 2.3508 },
    { id: 16, name: 'Sydney, Australia' ,lat: 33.8650, lgn: 151.2094 },
    { id: 17, name: 'Santiago, Chile' ,lat: 33.4500, lgn: 70.6667 },
    { id: 18, name: 'Bern, Switzerland' ,lat: 46.9500, lgn: 7.4500 },
    { id: 19, name: 'Berlin, Germany' ,lat: 52.5167, lgn: 13.3833 }

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
      // console.log("enter factory>'setCity' =", DataStore.city);
       DataStore.city = value;  
       // console.log("exit factory>'setCity' =", DataStore.city);
    };

    DataStore.setLatitude = function (value) {  // called from inside 'changeCity' in controllers.js
       DataStore.latitude = value;
       // console.log(DataStore.city, "lat", DataStore.latitude);
    };

    DataStore.setLongitude = function (value) {  // called from inside 'changeCity' in controllers.js
       DataStore.longitude = value;
       // console.log(DataStore.city, "long", DataStore.longitude);
    };

    return DataStore;
})
.factory('Weather', forecastioWeather);

