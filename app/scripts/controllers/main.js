'use strict';

var app = angular.module('cis264App');

/**
 * Service to init campus object from api call.
 */
app.factory('campusService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var campusService = {};

    campusService.async = function () {
        $http.get('http://localhost:9000/campuses')
            .success(function (d) {
                data = d;
                deffered.resolve();
            });
        return deffered.promise;
    };
    campusService.data = function () {
        return data;
    };

    return campusService;
});

/**
 * Service to init building object from api call.
 */
app.factory('buildingService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var buildingService = {};

    buildingService.async = function () {
        $http.get('http://localhost:9000/buildings')
            .success(function (d) {
                data = d;
                deffered.resolve();
            });
        return deffered.promise;
    };
    buildingService.data = function () {
        return data;
    };

    return buildingService;
});

/**
 * Service to init room object from api call.
 */
app.factory('roomService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var roomService = {};

    roomService.async = function () {
        $http.get('http://localhost:9000/rooms')
            .success(function (d) {
                data = d;
                deffered.resolve();
            });
        return deffered.promise;
    };
    roomService.data = function () {
        return data;
    };

    return roomService;
});

/**
 * Service to init floor object from local json file.
 */
app.factory('floorService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var floorService = {};

    floorService.async = function () {
        $http.get('data/floor.json')
            .success(function (d) {
                data = d;
                deffered.resolve();
            });
        return deffered.promise;
    };
    floorService.data = function () {
        return data;
    };

    return floorService;
});

/**
 * Service to init schedule object from api call.
 */
app.factory('scheduleService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var scheduleService = {};

    scheduleService.async = function (campus, date) {
        $http.get('http://localhost:9000/schedule/campus/'+campus+'/'+date)
            .success(function (d) {
                data = d;
                deffered.resolve();
            });
        return deffered.promise;
    };
    scheduleService.data = function () {
        return data;
    };

    return scheduleService;
});

app.controller('MainCtrl', function (campusService, buildingService, roomService, floorService, scheduleService, ngTableParams, $scope, $http, $filter, $moment) {

    // global error state flag
    $scope.errorState = false;

    // login results
    //$scope.loginSuccess = false;

    // activate the image view by default
    $scope.showImageView = true;
    //angular.element('#imageViewToggleButton').addClass('active');

    // initialise table view trigger to false
    $scope.showTableView = false;

    //
    $scope.currentlyLoading = 'Campus Objects';

    // init the default services
    // init the campus service
    $('#loadingModal').modal('show');
    campusService.async().then(function () {
        $scope.campusObjects = campusService.data();
        $scope.currentlyLoading = 'Building Objects';

        // init the building service
        buildingService.async().then(function () {
            $scope.buildingObjects = buildingService.data();
            $scope.currentlyLoading = 'Room Objects';

            // init the room service
            roomService.async().then(function () {
                $scope.roomObjects = roomService.data();
                $scope.currentlyLoading = 'Floor Objects';

                // init the floor service
                floorService.async().then(function () {
                    $scope.floorObjects = floorService.data();
                    $('#loadingModal').modal('hide');
                });
            });
        });
    });







    /**
     * toggle between image and table views
     */
    $scope.toggleView = function () {
        if ($scope.showImageView) {
            $scope.showImageView = false;
            $scope.showTableView = true;
        }
        else {
            $scope.showImageView = true;
            $scope.showTableView = false;
        }
    };


    /**
     * Assign the available floors once a building has been selected.
     */
    $scope.getBuildingData = function (activeBuilding) {

        // trigger loading modal
        $('#loadingModal').modal('show');
        $scope.currentlyLoading = 'Schedule Object';

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
        scheduleService.async(activeBuilding.CampusId, moment().format('YYYY-MM-DD')).then(function () {
            $scope.scheduleObjects = [];// reset schedule scope object
            var scheduleObjectsTemp = [];// reset temp array
            var itemTemp = [];// temp var used to convert the array to an associative array
            var startTimeTemp, endTimeTemp;// temp vars to store moment time objects


            // assign active schedule to temp var
            scheduleObjectsTemp = scheduleService.data();

            // convert array to associative array
            angular.forEach(scheduleObjectsTemp.data, function (value) {

                itemTemp = {
                    'institution_id': value[0],
                    'campus_name': value[1],
                    'location_id': value[2],
                    'building_code': value[3],
                    'room_number': value[4],
                    'room_name': value[5],
                    'activity_id': value[6],
                    'activity_type_code': value[7],
                    'parent_activity_name': value[8],
                    'activity_name': value[9],
                    'description': value[10],
                    'start_date': value[11],
                    'end_date': value[12],
                    'start_minute': value[13],
                    'end_minute': value[14]
                };

                // create temp moment objects for current time and date values
                startTimeTemp = $moment(value[11], 'YYYY-MM-DDThh:mm:ss A').add('m', value[13]);
                endTimeTemp = $moment(value[12], 'YYYY-MM-DDThh:mm:ss A').add('m', value[14]);

                // update temp item with formatted time strings
                itemTemp['start_minute'] = startTimeTemp.format('hh:mm:ss A').toString();
                itemTemp['end_minute'] = endTimeTemp.format('hh:mm:ss A').toString();

                // push schedule for currently selected building and current time frame
                if (
                    (value['3'] === activeBuilding.BuildingCode)
                    &&
                    (startTimeTemp.isBefore($moment()))
                    &&
                    (endTimeTemp.isAfter($moment()))
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
                getData: function ($defer, params) {
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

            // hide loading modal and log success message
            alertify.success('All data successfully loaded.');
            $scope.showScheduleLoadTime = true;
            $('#loadingModal').modal('hide');

        });

        // set schedule load time
        $scope.lastLoadTime = $moment();

        return;
    };

    $scope.isActiveClass = function (room) {
        for (var i = 0; i < $scope.scheduleObjects.length; i++) {
            if (($scope.scheduleObjects[i].room_name === room)) {
                return true;
            }
        }
        return false;
    };

    $scope.setActiveRoomFromTable = function (buildingCode, roomName) {
        $scope.activeRoomName = buildingCode + ' ' + roomName;
    };

    $scope.setActiveRoomFromMap = function(buildingCode, room, text) {

        $scope.activeRoomName = false;

        if (typeof room != 'undefined')
        {
            $scope.activeRoomName = buildingCode + ' ' + room;
        }
        else if (typeof text != 'undefined')
        {
            $scope.activeRoomName = buildingCode + ' ' + text;
        }

        if ( ($scope.activeRoomName == false) )
        {
            alertify.error('Room not properly mapped in the SVG file!');
        }
    };

});


app.controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];
});

app.controller('TimepickerDemoCtrl', function ($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function () {
        $scope.mytime = null;
    };
});