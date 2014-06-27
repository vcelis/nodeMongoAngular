angular.module('myApp', [])
  .controller('tableController', ['$scope', '$http', function($scope, $http) {
    $scope.words = [];

    $scope.getWords = function() {
      $http({url: 'http://localhost/words', method: 'GET', params: {}})
        .success(function(data, status, headers, config) {
          $scope.words = data;
        })
        .error(function(data, status, headers, config) {
          $scope.words = [];
        });
    };

    $scope.find = function() {
      $scope.getWords();
    };
  }]);