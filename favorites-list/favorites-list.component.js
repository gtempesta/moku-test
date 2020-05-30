'use strict';

// Register `favoritesList` component, along with its associated controller and template
angular.
  module('favoritesList').
  component('favoritesList', {
    templateUrl: 'favorites-list/favorites-list.template.html',
    controller: ['$http', '$localStorage',
      function FavoritesListController($http, $localStorage) {
        var self = this;
        var queryString = '';
        var getUrl = '';

        // creo URL con ID separati da pipe (|)
        angular.forEach($localStorage.favoritesIds, function(el, index){
          var step = index + 1;
          queryString += el;
          if (step < $localStorage.favoritesIds.length){
            queryString += '|';
          } 
        });
        
        // url totale per debugging
        getUrl = 'https://api.punkapi.com/v2/beers?ids=' + queryString;

        $http.get(getUrl).then(function(response) {
          self.beers = response.data;
        });

      }
    ]
  });
