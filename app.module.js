'use strict';

// Define the `brewDogApp` module
angular.module('brewDogApp', [
  'ngRoute',
  'ngStorage',
  'beerDetail',
  'beerList',
  'favoritesList',
  'randomDetail'
]).run(function($rootScope, $localStorage){
  $rootScope.beers = [];
  if (!$localStorage.hasOwnProperty('favoritesIds')) {
    $localStorage.favoritesIds = [];
  }
  
});
