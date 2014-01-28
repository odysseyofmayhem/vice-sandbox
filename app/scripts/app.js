'use strict';

var app = angular.module('viceSandboxApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/minion-crop.view.html',
        controller: 'cropCtrl'
      })
      .when('/picker', {
        templateUrl: 'views/picker-test.html',
        controller: 'PickerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
