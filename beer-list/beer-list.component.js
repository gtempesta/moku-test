'use strict';

// Register `beerList` component, along with its associated controller and template
angular.
  module('beerList').
  component('beerList', {
    templateUrl: 'beer-list/beer-list.template.html',
    controller: ['$http', '$scope', '$routeParams', '$rootScope', '$localStorage',
      function BeerListController($http, $scope, $routeParams, $rootScope, $localStorage) {
        console.log($localStorage.favoritesIds);
        var self = this;

        // variabili per pagination
        var itemsPerPage = 10;
        $scope.curPage = 1;

        // variabili per stampare link pagination
        $scope.links = [
          {
            isActive: false,
            pageNumber: 1
          },
          {
            isActive: false,
            pageNumber: 2
          },
          {
            isActive: false,
            pageNumber: 3
          }
        ];

        // gestisco pagination in base a parametri
        if ($routeParams.hasOwnProperty('pageId')) {
          $scope.curPage = $routeParams.pageId;
          $scope.links[$routeParams.pageId - 1].isActive = true;
        } else {
          $scope.curPage = 1;
          $scope.links[0].isActive = true;
        }

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
        }

        // filtro per gradazione minima
        $scope.minAbvFilter = function (beer) {
          var filtered = beer;
          if ($scope.minAbv > 0) {
            filtered = parseFloat(beer.abv) >= parseFloat($scope.minAbv);
          }
          return filtered;
        }
        
        // filtro per gradazione massima
        $scope.maxAbvFilter = function (beer) {
          var filtered = beer;
          if ($scope.maxAbv > 0) {
            filtered = parseFloat(beer.abv) <= parseFloat($scope.maxAbv);
          }
          return filtered;
        }
        
        // filtro per nome o food match
        $scope.inputMatchFilter = function (beer) {
          var filtered = beer;
          if ($scope.inputMatch) {
            var isMatched = false;
            // controllo il nome
            if (beer.name.toLowerCase().indexOf($scope.inputMatch.toLowerCase()) > -1) {
              isMatched = true;
            }
            // controllo tra tutti i food pairing
            angular.forEach(beer.food_pairing, function (el) {
              if (el.toLowerCase().indexOf($scope.inputMatch.toLowerCase()) > -1) {
                isMatched = true;
              }
            });
          }
          return $scope.inputMatch ? isMatched : filtered;
        }

        if ($rootScope.beers.length === 0) {
          // faccio chiamata solo se non ho ancora i dati
          $http.get('https://api.punkapi.com/v2/beers').then(function(response) {
            $rootScope.beers = self.beers = response.data;

            // watch per gestire pagination
            $scope.$watch('curPage', function() {
              var begin = (($scope.curPage - 1) * itemsPerPage);
              var end = begin + itemsPerPage;   
              $scope.filteredItems = $rootScope.beers.slice(begin, end);
            });

            // se una birra è già stata aggiunta ai preferiti le aggiungo una proprietà isFav
            angular.forEach($rootScope.beers, function(beer){
              angular.forEach($localStorage.favoritesIds, function(fav){ 
                if (beer.id === fav){
                  beer.isFav = true;
                }
              });
            });

          });
        } else {
          self.beers = $rootScope.beers;
          // watch per gestire pagination se ho già i dati
          $scope.$watch('curPage', function() {
            var begin = (($scope.curPage - 1) * itemsPerPage);
            var end = begin + itemsPerPage;
            $scope.filteredItems = $rootScope.beers.slice(begin, end);
          });
          // se una birra è già stata aggiunta ai preferiti le aggiungo una proprietà isFav
          angular.forEach($rootScope.beers, function(beer){
            angular.forEach($localStorage.favoritesIds, function(fav){ 
              if (beer.id === fav){
                beer.isFav = true;
              }
            });
          });
        } 
      }
    ]
  });
