//https://asapp01.aaiscloud.com/JCCC_Schedule/Logon.aspx?ReturnUrl=%2fJCCC_Schedule%2f%7eapi%2fentity%2fbuilding
'use strict';

var app = angular.module('cis264App');


app.controller('MainCtrl', function($scope, $http, $cookieStore) {

  // api host base url
  //var apiBaseUrl = 'https://asapp01.aaiscloud.com/JCCC_Schedule/~api/';

  // global error state flag
  $scope.errorState = false;

  // activate the image view by default
  $scope.showImageView = true;
  angular.element('#imageViewToggleButton').addClass('active');

  // initialise table view trigger to false
  $scope.showTableView = false;

  //
  $scope.imageBasePath = 'images/floorplans/';

  // global campus object vars
  $scope.campusObjects = [];
  $scope.activeCampus = null; // will be set on campus select and passed directly to setBuildings function

  // global building object vars
  $scope.buildingObjects = [];
  $scope.activeBuilding = null;

  // global floors object vars
  $scope.floorObjects = [];
  $scope.activeFloor = null;

  // global floors object vars
  $scope.scheduleObjects = [];
  $scope.activeSchedule = null;

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

  // function to toggle between image and table views
  $scope.toggleView = function() {
    if ( $scope.showImageView )
    {
      $scope.showImageView = false;
      angular.element('#imageViewToggleButton').removeClass('active');
      $scope.showTableView = true;
      angular.element('#scheduleViewToggleButton').addClass('active');
    }
    else
    {
      $scope.showImageView = true;
      angular.element('#imageViewToggleButton').addClass('active');
      $scope.showTableView = false;
      angular.element('#scheduleViewToggleButton').removeClass('active');
    }
  };

  // set global building objects once the campus is selected
  $scope.setBuildings = function(activeCampus) {
    $scope.activeBuilding = null;// reset activeBuilding
    $scope.buildingObjects = []; // reset buildingObjects

    $scope.activeFloor = null;// reset activeFloor
    $scope.floorObjects = [];

    $scope.activeSchedule = null;// reset activeSchedule
    $scope.scheduleObjects = [];
    
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

    //$scope.activeImage = $scope.activeImage + $scope.activeBuilding.BuildingCode + '-' + $scope.activeFloor.Id;

    return;

  };


  // set global floors objects once the building is selected
  $scope.setAvailableFloors = function(activeBuilding) {

    $scope.floorObjects = [] // reset floorsObject
    var floorsObjectsTemp = []; // temp var for parsing buildings

    $scope.scheduleObjects = [];// reset schedule object
    var scheduleObjectsTemp = [];// temp var for parsing schedule

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
        }
      }
    }).
    error(function(data, status) {
      $scope.errorState = true;
    });

    // load schedule
    $http({
      method: 'GET',
      url: 'data/schedule-geb-03312014.json',
      returnType: 'JSON'
    }).
    success(function(data, status) {
      scheduleObjectsTemp = angular.fromJson(data);
      
      // push valid buildings for the appropriate campus  
      for (var i = 0; i < scheduleObjectsTemp.data.length; i++) {
        if ((scheduleObjectsTemp.data[i][9] == activeBuilding.BuildingCode)) {
          $scope.scheduleObjects.push(scheduleObjectsTemp.data[i]);
        }
      }
    }).
    error(function(data, status) {
      $scope.errorState = true;
    });

    // initalise image map highlighting
    angular.element('.map').maphilight();

    // initialise bootstrap tooltips
    angular.element('.floorplan-tooltip').tooltip({placement:'left', html:true});

    return;

  };


  $scope.setImageAndSchedule = function() {
    //$scope.activeImage = $scope.imageBasePath + $scope.activeBuilding.BuildingCode + '-' + $scope.activeFloor.Id + '.png';
  };


  $scope.$watch('activeBuilding', function() { 
    console.log($scope.activeImage);
    //$scope.activeImage = $scope.imageBasePath + $scope.activeBuilding.BuildingCode + '-' + '.png';
    $scope.apply();
  });

  $scope.$watch('activeFloor', function() { 
    console.log($scope.activeFloor);
    //$scope.activeImage = $scope.imageBasePath + $scope.activeBuilding.BuildingCode + '-' + $scope.activeFloor.Id + '.png';

  });


});