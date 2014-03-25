//https://asapp01.aaiscloud.com/JCCC_Schedule/Logon.aspx?ReturnUrl=%2fJCCC_Schedule%2f%7eapi%2fentity%2fbuilding
'use strict';

var app = angular.module('cis264App');


app.controller('MainCtrl', function($scope, $http, $cookieStore) {

  // api host base url
  //var apiBaseUrl = 'https://asapp01.aaiscloud.com/JCCC_Schedule/~api/';

  // global error state flag
  $scope.errorState = false;

  // global campus object vars
  $scope.campusObjects = [];
  $scope.activeCampus = null; // will be set on campus select and passed directly to setBuildings function

  // global building object vars
  $scope.buildingObjects = [];
  $scope.activeBuilding = null;

  // global floors object vars
  $scope.floorObjects = [];
  $scope.activeFloor = null;


  // init the default campusObjects
  $http({
    method: 'GET',
    url: 'data/campus.json',
    returnType: 'JSON'
  }).
  success(function(data, status) {
    $scope.campusObjects = angular.fromJson(data);
  }).
  error(function(data, status) {
    $scope.errorState = true;
  });


  // set global building objects once the campus is selected
  $scope.setBuildings = function(activeCampus) {
    $scope.buildingObjects = []; // reset buildingObjects
    var buildingObjectsTemp = []; // temp var for parsing buildings

    // load buidlings
    $http({
      method: 'GET',
      url: 'data/building.json',
      returnType: 'JSON'
    }).
    success(function(data, status) {
      buildingObjectsTemp = angular.fromJson(data);

      // push valid buildings for the appropriate campus  
      for (var i = 0; i < buildingObjectsTemp.data.length; i++) {
        if ((buildingObjectsTemp.data[i].CampusId == activeCampus.Id) && (buildingObjectsTemp.data[i].Description != '')) {
          $scope.buildingObjects.push(buildingObjectsTemp.data[i]);
        }
      }

      $scope.buildingObjects.sort(function(a,b) { return a.Description > b.Description } );

    }).
    error(function(data, status) {
      $scope.errorState = true;
    });

    return;

  };


  // set global floors objects once the building is selected
  $scope.setFloors = function(activeBuilding) {
    $scope.floorObjects = null; // reset floorsObjects
    var floorsObjectsTemp = []; // temp var for parsing buildings

    // load buidlings
    $http({
      method: 'GET',
      url: 'data/floors.json',
      returnType: 'JSON'
    }).
    success(function(data, status) {
      floorsObjectsTemp = angular.fromJson(data);

      // push valid buildings for the appropriate campus  
      for (var i = 0; i < floorsObjectsTemp.data.length; i++) {
        if ((floorsObjectsTemp.data[i].BuildingId == activeBuilding.Id)) {
          $scope.floorObjects = floorsObjectsTemp.data[i];
          console.log($scope.floorObjects);
        }
      }
    }).
    error(function(data, status) {
      $scope.errorState = true;
    });

    return;

  };

  // set default maphilighter settings
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