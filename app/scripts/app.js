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
        templateUrl: 'views/picker-test.html',
        controller: 'PickerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
