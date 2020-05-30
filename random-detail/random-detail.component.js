'use strict';

// Register `randomDetail` component, along with its associated controller and template
angular.
  module('randomDetail').
  component('randomDetail', {
    templateUrl: 'random-detail/random-detail.template.html',
    controller: ['$http', '$scope', '$localStorage',
      function RandomDetailController($http, $scope, $localStorage) {
        var self = this;
        // richiedo una birra random in base a end-point API
        $http.get('https://api.punkapi.com/v2/beers/random').then(function(response) {
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
