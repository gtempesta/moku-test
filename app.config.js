'use strict';

angular.
  module('brewDogApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<beer-list></beer-list>'
        }).
        when('/home/:pageId', {
          template: '<beer-list></beer-list>'
        }).
        when('/beers/:beerId', {
          template: '<beer-detail></beer-detail>'
        }).
        when('/favorites', {
          template: '<favorites-list></favorites-list>'
        }).
        when('/random', {
          template: '<random-detail></random-detail>'
        }).
        otherwise('/home');
    }
  ]);
