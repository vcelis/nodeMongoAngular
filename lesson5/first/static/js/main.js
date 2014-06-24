var myApp = angular.module('myApp', []);

myApp.controller('myController', function($scope) {
  $scope.first = 'Vincent';
  $scope.last = 'Celis';
  $scope.heading = 'Message: ';

  $scope.updateMessage = function() {
    $scope.message  ='Hello ' + $scope.first + ' ' + $scope.last + '!';
  };
});