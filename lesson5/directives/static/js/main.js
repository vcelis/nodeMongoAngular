angular.module('myApp', [])
  .controller('radioController', function($scope) {
    $scope.colors = ['red','green','blue'];
    $scope.myStyle = {
        "background-color": "blue",
        "display": "inline-block",
        "height": "100px",
        "width": "100px"
    };
  })

  .controller('selectController', function($scope) {
    $scope.cameras = [
        {make: 'Canon', model: '70D', mp: 20.2},
        {make: 'Canon', model: '6D', mp: 20},
        {make: 'Nikon', model: 'D7100', mp: 24.1},
        {make: 'Nikon', model: 'D5200', mp: 24.1}
    ];
    $scope.cameraObj = $scope.cameras[0];
    $scope.cameraName = 'Canon';
  })

  .controller('eventsController', function($scope) {
    $scope.keyInfo = {};
    $scope.mouseInfo = {};

    $scope.keyStroke = function(event) {
      $scope.keyInfo.keycode = event.keyCode;
    };

    $scope.mouseClick = function(event) {
      $scope.mouseInfo.clientX = event.clientX;
      $scope.mouseInfo.clientY = event.clientY;
      $scope.mouseInfo.screenX = event.screenX;
      $scope.mouseInfo.screenY = event.screenY;
    };
  });