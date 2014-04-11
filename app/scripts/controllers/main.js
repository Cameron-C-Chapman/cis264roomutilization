'use strict';

var app = angular.module('cis264App');

/**
 * Service to init campus object from api call.
 * The real api call should be: https://asapp01.aaiscloud.com:443/JCCC_Test/~api/entity/campus
 */
app.factory('campusService', function($http, $q) {
  var deffered = $q.defer();
  var data = [];
  var campusService = {};

  campusService.async = function() {
    $http.get('data/campus.json')
    .success(function (d) {
      data = d;
      //console.log(d);
      deffered.resolve();
    });
    return deffered.promise;
  };
  campusService.data = function() { return data; };

  return campusService;
});

/**
 * Service to init building object from api call.
 * The real api call should be: https://asapp01.aaiscloud.com:443/JCCC_Test/~api/entity/building
 */
app.factory('buildingService', function($http, $q) {
  var deffered = $q.defer();
  var data = [];
  var buildingService = {};

  buildingService.async = function() {
    $http.get('data/building.json')
    .success(function (d) {
      data = d;
      //console.log(d);
      deffered.resolve();
    });
    return deffered.promise;
  };
  buildingService.data = function() { return data; };

  return buildingService;
});

/**
 * Service to init room object from api call.
 * The real api call should be: https://asapp01.aaiscloud.com:443/JCCC_Test/~api/entity/room
 */
app.factory('roomService', function($http, $q) {
  var deffered = $q.defer();
  var data = [];
  var roomService = {};

  roomService.async = function() {
    $http.get('data/room.json')
    .success(function (d) {
      data = d;
      console.log(d);
      deffered.resolve();
    });
    return deffered.promise;
  };
  roomService.data = function() { return data; };

  return roomService;
});

/**
 * Service to init floor object from local json file.
 */
app.factory('floorService', function($http, $q) {
  var deffered = $q.defer();
  var data = [];
  var floorService = {};

  floorService.async = function() {
    $http.get('data/floor.json')
    .success(function (d) {
      data = d;
      console.log(d);
      deffered.resolve();
    });
    return deffered.promise;
  };
  floorService.data = function() { return data; };

  return floorService;
});

/**
 * Service to init schedule object from local json file.
 */
app.factory('scheduleService', function($http, $q) {
  var deffered = $q.defer();
  var data = [];
  var scheduleService = {};

  scheduleService.async = function() {
    $http.get('data/schedule-20140408.json')
    .success(function (d) {
      data = d;
      //console.log(d);
      deffered.resolve();
    });
    return deffered.promise;
  };
  scheduleService.data = function() { return data; };

  return scheduleService;
});

app.controller('MainCtrl', function(campusService, buildingService, roomService, floorService, scheduleService, ngTableParams, $scope, $http, $filter, $moment) {

  // global error state flag
  $scope.errorState = false;

  // activate the image view by default
  $scope.showImageView = true;
  //angular.element('#imageViewToggleButton').addClass('active');

  // initialise table view trigger to false
  $scope.showTableView = false;

  // api host base url
  //var apiBaseUrl = 'https://asapp01.aaiscloud.com/JCCC_Test/~api/';

  // init the campus service
  campusService.async().then(function() {
    $scope.campusObjects = campusService.data();
  });

  // init the building service
  buildingService.async().then(function() {
    $scope.buildingObjects = buildingService.data();
  });

  // init the room service
  roomService.async().then(function() {
    $scope.roomObjects = roomService.data();
  });

  // init the floor service
  floorService.async().then(function() {
    $scope.floorObjects = floorService.data();
  });


  /**
   * toggle between image and table views
   */
  $scope.toggleView = function() {
    if ( $scope.showImageView )
    {
      $scope.showImageView = false;
      //angular.element('#imageViewToggleButton').removeClass('active');
      $scope.showTableView = true;
      //angular.element('#scheduleViewToggleButton').addClass('active');
    }
    else
    {
      $scope.showImageView = true;
      //angular.element('#imageViewToggleButton').addClass('active');
      $scope.showTableView = false;
      //angular.element('#scheduleViewToggleButton').removeClass('active');
    }
  };


  /**
   * Assign the available floors once a building has been selected.
   */
  $scope.getBuildingData = function(activeBuilding) {
    $scope.activeBuildingFloorObjects = [];// reset floorsObject

    // store the current activeBuilding
    $scope.activeBuilding = activeBuilding;

    // push valid floors for the appropriate building  
    for (var i = 0; i < $scope.floorObjects.data.length; i++) {
      if (($scope.floorObjects.data[i].BuildingId === activeBuilding.Id)) {
        $scope.activeBuildingFloorObjects = $scope.floorObjects.data[i];
      }
    }

    // parse schedule call
    scheduleService.async().then(function() {
      $scope.scheduleObjects = [];// reset schedule scope object
      var scheduleObjectsTemp = [];// reset temp array
      var itemTemp = [];// temp var used to convert the array to an associateive array
      var itemTempClass = null;// store the class of the table row

      // assign active schedule to temp var
      scheduleObjectsTemp = scheduleService.data();

      // convert array to associateive array
      angular.forEach(scheduleObjectsTemp.data, function(value) {

        itemTemp = {
          'activity_id':value[0],
          'activity_name':value[1],
          'parent_activity_name':value[2],
          'description':value[3],
          'start_date':value[4],
          'end_date':value[5],
          'start_minute':value[6],
          'end_minute':value[7],
          'activity_type_code':value[8],
          'location_id':value[9],
          'building_code':value[10],
          'room_number':value[11],
          'room_name':value[12]
        };

        // push schedule for currently selected building and current timeframe
        if (
            (value['10'] === activeBuilding.BuildingCode)
            &&
            ($moment(value[6], 'h:mm A').isBefore($moment()))
            &&
            ($moment(value[7], 'h:mm A').isAfter($moment()))
           ) {
          this.push(itemTemp);
        }
        
      }, $scope.scheduleObjects);

      // build ngTable for filter and order state
      $scope.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 25,          // count per page
          sorting: {
            building_code: 'asc'     // initial sorting
          }
        }, {
          total: $scope.scheduleObjects.length, // length of $scope.scheduleObjects
          getData: function($defer, params) {
            // use angular filter
            var filteredData = params.filter() ?
                    $filter('filter')($scope.scheduleObjects, params.filter()) :
                    $scope.scheduleObjects;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.scheduleObjects;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
        });
    });

    // set schedule load time
    $scope.lastLoadTime = $moment();

    return;
  };

  $scope.isActiveClass = function(room)
  {
    for (var i = 0; i < $scope.scheduleObjects.length; i++) {
      if (($scope.scheduleObjects[i].room_name === room)) {
        return true;
      }
    }
    return false;
  };

  $scope.setActiveRoom = function(room) {
    $scope.activeRoomNumber = room;
  };

});