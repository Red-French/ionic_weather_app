// current forecast: https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
// https://api.forecast.io/forecast/a52853f6b4cb5a11f44d22cb01949a6d/LATITUDE,LONGITUDE

angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_APIKEY', 'a52853f6b4cb5a11f44d22cb01949a6d')
.controller('HomeCtrl', function($scope, $state, Weather, DataStore) {
    //read default settings into scope
    console.log('enter HomeCtrl', DataStore.city);
    $scope.city  = DataStore.city;
    var latitude  =  DataStore.latitude;
    var longitude = DataStore.longitude;
    console.log($scope.city);

    //calls getCurrentWeather method in factory>‘Weather’
    Weather.getCurrentWeather(latitude,longitude).then(function(data) {
      $scope.current = data.data;
      console.log('Got Current Weather!', $scope.current);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });
})
.controller('LocationsCtrl', function($scope, $state, Cities, Weather, DataStore) {
  $scope.cities = Cities.all();  // cities array is defined in a factory in services.js

// ~ 'CHANGECITY' FUNCTION CALLED FROM NGCLICK IN TAB-CITIES.HTML ~
  $scope.changeCity = function(cityId) {
    console.log("$scope.cities[cityId]", $scope.cities);
    console.log("enter 'changeCity'", DataStore.city);

    //get latitude and longitude for selected location
    var lat  = $scope.cities[cityId].lat; //latitude
    var lgn  = $scope.cities[cityId].lgn; //longitude
    $scope.city = $scope.cities[cityId].name; //city name

    // console.log("lat of", city, lat);
    // console.log("long of", city, lgn);
    // console.log("city", city);

    DataStore.setCity($scope.city);  // go to factory and set new city
    DataStore.setLatitude(lat);  // go to factory and set new latitude
    DataStore.setLongitude(lgn);  // go to factory and set new longitude
    console.log("exit 'changeCity'", DataStore.city);

    $state.go('tab.home');
  }
})


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// SETTINGS
.controller('SettingsCtrl', function($scope) {
    //manages app settings
})

// ICONS
.controller( 'WeatherCtrl', function ( $scope ) {
    /*
        This example is over simplified to demonstrate the relationship
        between the 'controller' and the 'template' with regard to loading
        the 'icon' value. Hopefully, you will be loading your controller with
        data from an actual API response. :)
    */
    $scope.CurrentWeather = {
        forecast: {
            icon: "partly-cloudy-night",
            iconSize: 100,
            color: "blue"
        }
    };
});

