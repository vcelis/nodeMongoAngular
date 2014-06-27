angular.module('myApp', [])
  .controller('tableController', ['$scope', '$http', function($scope, $http) {
    $scope.words = [];
    $scope.contains = '';
    $scope.limit = 5;
    $scope.skip = 0;
    $scope.skipEnd = 0;
    $scope.sortFields = ['Word', 'First', 'Last', 'Length', 'Vowels', 'Consonants'];
    $scope.sortField = 'Word';
    $scope.direction = 'asc';

    $scope.getWords = function() {
      var params = {limit: $scope.limit, skip: $scope.skip,
                    contains: $scope.contains, sort: $scope.sortField,
                    direction: $scope.direction};
      
      $http({url: 'http://localhost:3333/words', method: 'GET', params:params})
        .success(function(data, status, headers, config) {
          $scope.words = data;
          $scope.skipEnd = $scope.skip + $scope.words.length;
        })
        
        .error(function(data, status, headers, config) {
          $scope.words = [];
          $scope.skipEnd = $scope.skip + $scope.words.length;
        });
    };

    $scope.find = function() {
      $scope.skip = 0;
      $scope.getWords();
    };

    $scope.next = function() {
      if ($scope.words.length === parseInt($scope.limit)) {
        $scope.skip += parseInt($scope.limit);
        $scope.getWords();
      }
    };

    $scope.prev = function() {
      if ($scope.skip > 0) {
        if ($scope.skip >= parseInt($scope.limit)) {
          $scope.skip -= parseInt($scope.limit);
        } else {
          $scope.skip = 0;
        }
        $scope.getWords();
      }
    };
  }]);