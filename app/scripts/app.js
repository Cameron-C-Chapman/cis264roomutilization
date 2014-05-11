'use strict';

angular.module('cis264App', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngTable',
    'angular-momentjs',
    'angularMoment',
    'ui.bootstrap',
    'angularSpinner'
  ])

    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
            .when('/docs/user', {
          templateUrl: 'views/userdocs.html',
          controller: 'DocsCtrl'
        })
            .when('/docs/developer', {
          templateUrl: 'views/devdocs.html',
          controller: 'DocsCtrl'
        })
            .otherwise({
          redirectTo: '/'
        });
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
      });