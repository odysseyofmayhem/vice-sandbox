app.directive('cropsyArea', [ '$rootScope', function ($rootScope) {
    return {
       restrict: 'A',
       replace: true,
       transclude: true,
       controller: 'CropsyCtrl',
       templateUrl: 'views/cropsy.tpl.html',
       link: function ($scope, $element, attrs) {

       }
    };
  }]);


app.controller('CropsyCtrl', function ($scope) {
    

   
});

