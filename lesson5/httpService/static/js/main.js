angular.module('myApp', [])
  .controller('myController', ['$scope', '$http', function($scope, $http) {
    $scope.words = [];
    $scope.status = '';
    $scope.newWord = '';

    $scope.getWords = function() {
      $http.get('http://localhost:3333/words')
        .success(function(data, status, headers, config) {
          $scope.words = data;
        })
        .error(function(data, status, headers, config) {
          $scope.status = data;
        });
    };

    $scope.addWord = function() {
      $http.post('http://localhost:3333/add', {word: $scope.newWord})
        .success(function(data, status, headers, config) {
          $scope.newWord = '';
          $scope.status = data;
          $scope.getWords();
        })
        .error(function(data, status, headers, config) {
          $scope.status = data;
        });
    };

    $scope.removeWord = function(deleteWord) {
      $http.post('http://localhost:3333/remove', {word: deleteWord})
        .success(function(data, status, headers, config) {

        })
        .error(function(data, status, headers, config){

        });
    };
  }]);