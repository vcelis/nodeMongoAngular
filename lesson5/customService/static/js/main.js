angular.module('myApp', [])
  .value('censorWords', ['bad', 'mad', 'sad'])
  
  .constant('repString', '****')
  
  .service('censorS', ['censorWords', 'repString', function(cWords, repString) {
    this.censor = function(raw) {
      var result = raw;
      for (var i in cWords) {
        result = result.replace(cWords[i], repString);
      }
      return result;
    };
  }])

  .controller('myController', ['$scope', 'censorS', function($scope, censorS) {
    $scope.stringA = censorS.censor('bad text');
    $scope.stringB = censorS.censor('bad, mad and sad text');
  }]);