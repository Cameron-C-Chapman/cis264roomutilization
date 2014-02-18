'use strict';

angular.module('cis264App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

function BuildingVisualisationController ($scope) {

    $scope.activeBuilding = null;
    $scope.activeFloor = null;

    $scope.buildings = [

      {
        code: 'ATB',
        description: 'Arts and Technology Building',
        floors: [
          {id: 1, description: 'First Floor', image: 'images/floorplans/ATB-1.png'}
        ]
      },
      {
        code: 'GEB',
        description: 'General Education Building',
        floors: [
          {id: 1, description: 'First Floor', image: 'images/floorplans/GEB-1.png'},
          {id: 2, description: 'Second Floor', image: 'images/floorplans/GEB-2.png'},
          {id: 3, description: 'Third Floor', image: 'images/floorplans/GEB-3.png'}
        ]
      }
    ];
  }