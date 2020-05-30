'use strict';

// Register `beerDetail` component, along with its associated controller and template
angular.
  module('beerDetail').
  component('beerDetail', {
    templateUrl: 'beer-detail/beer-detail.template.html',
    controller: ['$http', '$routeParams', '$scope', '$localStorage',
      function BeerDetailController($http, $routeParams, $scope, $localStorage) {

        console.log($localStorage.favoritesIds);

        // richiedo una biira in base a ID
        var self = this;
        $http.get('https://api.punkapi.com/v2/beers/' + $routeParams.beerId).then(function(response) {
          self.beer = response.data[0];

          self.beer.isFav = false;
          angular.forEach($localStorage.favoritesIds, function(fav){ 
            if (self.beer.id === fav){
              self.beer.isFav = true;
            }
          });
  
          // aggiungo o tolgo dall'array dei preferiti (in localStorage)
          $scope.toggleFavs = function(beer) {
  
            // toggle state
            beer.isFav = !beer.isFav;
            if (beer.isFav === true) {
              // aggiungo all'array
              $localStorage.favoritesIds.push(beer.id);
            } else {
              // rimuovo dall'array
              angular.forEach($localStorage.favoritesIds, function(el, index) {
                if (el === beer.id) {
                  $localStorage.favoritesIds.splice(index, 1);
                }
              });
            }
            console.log($localStorage.favoritesIds);
          };
        });
      }
    ]
  });
