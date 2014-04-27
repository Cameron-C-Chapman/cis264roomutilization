'use strict';

angular.module('cis264App', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTable',
  'angular-momentjs',
  'angularMoment',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });