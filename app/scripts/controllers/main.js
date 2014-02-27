'use strict';

angular.module('cis264App')
  .controller('MainCtrl', function ($scope) {

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

    // set default  maphilighter settings
    angular.element.fn.maphilight.defaults = {
      fill: true,
      fillColor: '000000',
      fillOpacity: 0.2,
      stroke: true,
      strokeColor: 'ff0000',
      strokeOpacity: 1,
      strokeWidth: 1,
      fade: true,
      alwaysOn: true,
      neverOn: false,
      groupBy: false,
      wrapClass: true,
      shadow: false,
      shadowX: 0,
      shadowY: 0,
      shadowRadius: 6,
      shadowColor: '000000',
      shadowOpacity: 0.8,
      shadowPosition: 'outside',
      shadowFrom: false
    };

    // initalise image map highlighting
    angular.element('.map').maphilight();

    // initialise bootstrap tooltips
    angular.element('.floorplan-tooltip').tooltip({placement:'left', html:true});

  });