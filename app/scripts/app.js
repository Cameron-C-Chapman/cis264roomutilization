'use strict';

angular.module('cis264App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTable',
  'angular-momentjs',
  'angularMoment',
  'restangular',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $httpProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    RestangularProvider.setBaseUrl('https://asapp01.aaiscloud.com:443/JCCC_Test');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });