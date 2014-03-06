'use strict';

angular.module('cis264App')
  .controller('MainCtrl', function ($scope, $http, $cookieStore) {

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

    //$cookieStore.put('ASP.NET_SessionId', 'l0wpm3nyjimokrmnjvwac0rp');
    //$cookieStore.put('JCCC.ASPXFORMSAUTH', 'D4DE6727581D2A43D2DC8F8B68209D4710B9420B4A7DF05B5DD3C592FB7BDE15356A024AE1EAAE3828FDD130C7D846FAB11BB9E9DD695FF8B57CA8096893073E546FC2038814780B3A6B909F00800506A5214A37DE1B67CC721D1A8F2E30EDF4E6B3C7D0ED68702D989E923A297B0CBE7ED1854A');
    //$cookieStore.put('.ASPROLES', 'gIRqXj83Xb0heh13xl-wdCjgyV0lFUdN5oetMfothTSsSOCut5EEvmsfTWpq7CeK8zu04SUZpB5CChU3ZDhxg6fQcXbl6aOWFZVfmH-SIvUVzjPE6IkBZlJW4HI225s6f1HFItZnm4Ly3MVlVnAPBeAIV9Na9r9QLDXNiGraeCi2rahO7SlAFx4kZymek1Zld4jgKGYQ7CMcZqXJy3U2-EmocdknLNP04Skx0kZu30o5VM3Pkij8lg9JmNeyB1KST8CQ9t3FvNnwuU6-RHwmjBLYp-NGxfhct8d3aImBUEOyW0aBS_91hEdJCBBuVsBNqa43TLy6G9oETqM44CwLAG8D19kN-noO50LeBQ6DHE-VQlEHiMche8D_GxlUoB0J7QhHk6OH02raRK7Zy8vaf7ssG0IgxEhvaMJYBsXPj2BF3qR6br8RRb92ntTHzUFNa4sE2QJ2m_SLSWFeC87DWEqhsZ_DU2l0PX9kh3dOJBcEVNH12itIMAj9M7G6byv5SBpS16w6oM9jCoeWplUrU0Zizdkmxf04p5uVaQ2wCwogRm-x0');
    
    
/*
    $scope.loginURL = 'https://asapp01.aaiscloud.com/JCCC_Schedule/Portal/GuestPortal.aspx';
    $http({method: 'GET', url: $scope.loginURL, cache: false}).
      success(function(data, status) {
        var cookies = headers("Set-Cookie");
        console.log(cookies);
        //var token = someCrazyParsing(cookies); //<-- Your magic here
        //$http.defaults.headers.common["X-CSRFToken"] = token;
      }).
      error(function(data, status) {
        $scope.loginData = data || "Request failed";
        $scope.loginStatus = status;
        console.log($scope.loginData);
        console.log($scope.loginStatus);
    });
*/
    $scope.url = 'https://asapp01.aaiscloud.com/JCCC_Schedule/~api/query/building?fields=Campus.SisKey,Description,BuildingCode,SisKey,Id,Name&sortOrder=%2BCampus.SisKey,BuildingCode&filter=Campus.SisKey==1';
    $http({method: 'GET', url: $scope.url}).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log('success');
      }).
      error(function(data, status, headers, config) {
        $scope.data = data || "Request failed";
        $scope.status = status;
        console.log('error');
        console.log(config);
    });

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