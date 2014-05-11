Developer Docs
==============

### Important Notes

The app is currently pointing to an Astra Test Instance for API calls. To update the base url change the Astra class constructor in api/app/controllers/Astra.java to use the correct base url.
```
/**
 * Constructor sets BaseUrl, ResponderUrl and ResponderParameters properties
 */
public Astra() {
    this.BaseUrl = "https://asapp01.aaiscloud.com/JCCC_Test/";
    this.ResponderUrl = null;
    this.ResponderParameters = null;
}
```

You will also need to make sure the front end is pointing to where the API is really hosted. At the top of the app/scripts/controllers/main.js file you need to update the prod apiUrl var.
```
//var apiUrl = 'http://0.0.0.0:9000';// dev
var apiUrl = 'http://107.170.159.141:9000';// prod
```

The user account that is being used to be login to the api is set in the Login call in api/app/controllers/Astra.java file and the Login function in the following code:
```
/**
 * Output user credentials over HTTP Output Stream
 */
byte[] outputBytes = "{'username': 'cis264roomutilization', 'password':'roomutilization!APP'}".getBytes("UTF-8");
OutputStream os = httpcon.getOutputStream();
os.write(outputBytes);
os.close();
```
Update the username and password values if needed.

### Links to frameworks being used:

1. [Angularjs](https://angularjs.org/)
2. [Play](http://www.playframework.com/)

Instructions to get setup:
--------------------------

You will need git, play, nodejs, node package manager, bower, and grunt on your development machine.

1. [git](http://git-scm.com/)
2. [play](http://www.playframework.com/)
3. [nodejs](http://nodejs.org/)
4. [npm](https://npmjs.org/doc/README.html)
5. [bower](http://bower.io/)
6. [grunt](http://gruntjs.com/getting-started)

### Windows
*If you setting up on Windows I would recommend using the Chocolatey package manager for easy installation of these packages.*

1. Install Chocolatey Package Manager. 
  + Run the following command from your commmand prompt. (This is one command broken down in several lines for readability. You will need to enter it as 1 line.)

  ```
    @powershell -NoProfile -ExecutionPolicy unrestricted -Command
  ```

  <code>
    "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" 
  </code>

  <code>
    && SET PATH=%PATH%;%systemdrive%\chocolatey\bin
  </code>
  
2. Install git.
  + Open Windows Powershell (not the normal command line).

    <code>
      cinst git.install
    </code>

3. Install Play Framework
  + Open Windows Powershell (not the normal command line).

   <code>
     cinst Play
   </code>

4. Install nodejs and npm.
  + Open Windows Powershell (not the normal command line).

  <code>
    cinst nodejs.install
  </code>

5. Install Bower using the node package manager.
  + Open windows command prompt (not the powershell).

  <code>
    npm install -g bower
  </code>

6. Install Grunt using the node package manager.
  + Open windows command prompt (not the powershell).

  <code>
    npm install -g grunt-cli
  </code>


### Linux
*Using a package manager like apt or yum you can install all the required dependencies above that your current system doesn't have. You can also read below in the section about configuring the Digital Ocean Droplet since that is a Linux distribution.*


Instructions to start working the API of the project:
-----------------------------------------------------
*All commands are run from the windows command prompt*

1. You will need a text editor/ide suited for java development. [IntelliJ IDEA](http://www.jetbrains.com/idea/) is a great choice.
  + You can also install this on Windows using the Chocolatey package manager.

  <code>
    cinst IntelliJIDEA
  </code>

2. Use git to clone the project into a directory you want to work from. This will create a cis264roomutilization folder that will contain the project.

  <code>
    git clone https://github.com/Cameron-C-Chapman/cis264roomutilization.git
  </code>

3. cd into the cis264roomutilization folder and create a new git branch to work on the project outside of the master branch.

  <code>
    cd cis264roomutilization
  </code>

  <code>
    git branch yourdescriptivebranchname
  </code>

  <code>
    git checkout yourdescriptivebranchname
  </code>

4. Navigate to the api folder.

  <code>
    cd api/
  </code>

6. The api folder is where the Play application lives which serves up the API for the project. This is where you will modify the application to feed your front end.

7. For the API to be accessible you need to run the Play application to start the processs. You will need to initiate the Play console and then run the project.

  <code>
    play
  </code>

  <code>
    run
  </code>
  

Instructions to start working the front end of the project:
-----------------------------------------------------------
*All commands are run from the windows command prompt*

1. You will need a text editor/ide suited for web development. [Sublime Text](http://www.sublimetext.com/) is a great choice.
  + You can also install this on Windows using the Chocolatey package manager.

  <code>
    cinst sublimetext2
  </code>

2. Use git to clone the project into a directory you want to work from. This will create a cis264roomutilization folder that will contain the project.

  <code>
    git clone https://github.com/Cameron-C-Chapman/cis264roomutilization.git
  </code>

3. cd into the cis264roomutilization folder and create a new git branch to work on the project outside of the master branch.

  <code>
    cd cis264roomutilization
  </code>

  <code>
    git branch yourdescriptivebranchname
  </code>

  <code>
    git checkout yourdescriptivebranchname
  </code>

4. Install project dependencies.

  <code>
    npm install
  </code>

  <code>
    bower install
  </code>

5. Run the grunt task runner to build the project and then grunt serve to launch it in a browser.

  *When grunt launches the app it will be monitoring for changes live so there is no need to refresh the page after every change, you will see them live once you save your page.*

  <code>
    grunt
  </code>

  <code>
    grunt serve
  </code>

6. The files to edit are in the app folder. To edit the html view you would edit app/views/main.html. Javascript is located in the scripts folder and css is located in the styles folder.


Instructions to configure Digital Ocean droplet to run application:
-------------------------------------------------------------------
* You will need to create an account and have access to create a droplet. These instructions assume you are ready to create a droplet.*

1. Create an SSH Key on your machine for ssh access to the droplet.
  + [Windows Users](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users)
  + [Linux Users](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets)

2. Create the droplets with the following configurations.
  + Hostname: jcccroomutilization-app / jcccroomutilization-api (this is really optional and up to you)
  + Size: 1GB / 1CPU
  + Region: New York * (this is optional depending where you are located)
  + Select Image: Ubuntu 14.04 x64
  + Add SSh Keys: Add the ssh key you created in step one
  + Settings: Enable VirtIO

3. Login to your new droplet.
  
  + ssh root@[Droplet IP Address] *You will be prompted for the passphrase of your ssh key*

4. Update all server packages.

  <code>
    sudo apt-get update
  </code>

4. Install git.

  <code>
    sudo apt-get install -y git-core
  </code>

### For the Droplet to Run the API:

1. Install Scala and JRE (dependencies for the Play Framework)

  ```
    sudo apt-get install -y default-jre
    sudo apt-get install -y default-jdk
    sudo apt-get install -y scala
  ```

2. Install Play Framework (we are using 2.2.1 but you could use the latest version).

  ```
    sudo apt-get install -y unzip *required for play zip file*
    sudo mkdir .play/
    sudo wget -P .play/ http://downloads.typesafe.com/play/2.2.1/play-2.2.1.zip
    sudo unzip -d /opt .play/play-2.2.1.zip
    sudo chmod +x /opt/play-2.2.1/play
    sudo ln -s /opt/play-2.2.1/play /usr/local/bin/play
  ```

3. Install sbt (we are using version 0.13 but you could use the latest version).

  ```
    sudo wget http://repo.scala-sbt.org/scalasbt/sbt-native-packages/org/scala-sbt/sbt/0.13.0/sbt.deb
    dpkg -i sbt.deb
    sbt console *This will force sbt to download and launch the console. Press Ctrl-C to return to the default VPS connection.*
  ```

4. Clone Github repository into a new folder called repo.

  ```
    git clone https://github.com/Cameron-C-Chapman/cis264roomutilization.git repo/
  ```

5. Navigate to the api folder and start the play console.

  ```
    cd repo/api/
    play
  ```

6. Run the play application on port 9000.

  ```
    run
  ```


### For the Droplet to Run the Front End:

1. Install nodejs.
  
  ```
    sudo apt-get install -y python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install -y nodejs
  ```

2. Install bower.

  ```
    npm install -g bower
  ```

3. Install grunt.

  ```
    npm install -g grunt-cli
  ```

4. Clone Github repository into a new folder called repo.

  ```
    git clone https://github.com/Cameron-C-Chapman/cis264roomutilization.git repo/
  ```

4. Navigate to the repo folder.

  ```
    cd repo/
  ```

5. Install required node and bower modules.

  ```
    npm install
    sudo bower install --allow-root
  ```

6. Serve the application on port 9009. *In a true production environment you would not want to serve the application through grunt. You could use a node server or just build the static files and serve them through Apache. This was done for the purpose of demonstrating a functional prototype.*

  ```
    grunt serve
  ```


Application/Folder Structure
----------------------------

    |+-- api
        |+-- app
            |+-- controllers
                |+-- Application.java
                |+-- Astra.java
            |+-- views
                |+-- response.scala.html
        |+-- conf
            |+-- application.conf
            |+-- routes
        |+-- project
        |+-- public
        |+-- target
        |+-- test
    |+-- app
        |+-- bower_components
            |+-- *
        |+-- docs
            |+-- images
                |+-- *
            |+-- DEV.md
            |+-- USER.md
        |+-- fonts
            |+-- *
        |+-- images
            |+-- *
        |+-- scripts
            |+-- controllers
                |+-- main.js
            |+-- app.js
        |+-- styles
            |+-- main.css
        |+-- views
            |+-- devdocs.html
            |+-- main.html
            |+-- userdocs.html
        |+-- index.html
    |+-- node_modules
        |+-- *
    |+-- test
        |+-- spec
            |+-- controllers
                |+-- main.js
        |+-- .jshintrc
        |+-- runner.html
    |+-- .bowerrc
    |+-- .gitignore
    |+-- .jshintrc
    |+-- .travis.yml
    |+-- bower.json
    |+-- Gruntfile.js
    |+-- karma.conf.js
    |+-- karma-e2e.conf.js
    |+-- package.json


Front End Function Reference
------------------
*All application logic is located in app/scripts/main.js.*

### Modules

The app has one main module, cis264App.
```
var app = angular.module('cis264App');
```

### Directives

Markdown rendering directive.
```
/**
 * Directive to load and render markdown from a file.
 */
app.directive('markdown', function ($http) {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        scope: { link: '@' },
        link: function (scope, element, attrs) {
            attrs.$observe('link', function (link) {
                $http.get('docs/' + link).success(function (response) {
                    var htmlText = converter.makeHtml(response);
                    element.html(htmlText);
                });
            });
        }
    };
});
```

### Services

Services to inject variables in multiple controllers.
```
/**
 * Define base app objects as services so they can be shared between controllers.
 */
app.factory('ActiveDate', function () {
    return { ActiveDate: null };
  });

app.factory('ActiveTime', function () {
    return { ActiveTime: null };
  });

app.factory('ActiveCampus', function () {
    return { ActiveCampus: null };
});

app.factory('ActiveBuilding', function () {
    return { ActiveBuilding: null };
  });

app.factory('ActiveFloor', function () {
    return { ActiveFloor: null };
});
```

Campus service.
```
/**
 * Service to init campus object from api call.
 */
app.factory('campusService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var campusService = {};

    campusService.async = function () {
        $http.get(apiUrl + '/campuses')
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
```

Building service.
```
/**
 * Service to init building object from api call.
 */
app.factory('buildingService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var buildingService = {};

    buildingService.async = function () {
        $http.get(apiUrl + '/buildings')
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
```

Room service.
```
/**
 * Service to init room object from api call.
 */
app.factory('roomService', function ($http, $q) {
    var deffered = $q.defer();
    var data = [];
    var roomService = {};

    roomService.async = function () {
        $http.get(apiUrl + '/rooms')
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
```

Schedule parsing service.
```
/**
 * Service to build schedule object from api call.
 */
app.factory('scheduleService', function ($http, $q) {
  var deffered = $q.defer();
  var data = [];
  var scheduleService = {};

  scheduleService.async = function (campus, date) {
    $http.get(apiUrl + '/schedule/campus/' + campus + '/' + date)
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
```

Building floor loading service.
```
/**
 * Floor objects service.
 * This is where the svg mapping for each floor is stored.
 */
app.factory('floorObjects', function () {
    var data = [];
    var floorObjects = {};

    data = [
        {
            "CampusId": "edcff367-ef64-44b3-852f-82dc26995aa4",
            "BuildingId": "d21cacb4-e97a-4485-b8d7-2c8eeac2b170",
            "Floor": 1,
            "Description": "First Floor",
            "Map":
                ...

});
```


### Controllers

MainCtrl contains the base application logic.
```
/**
 * Main controller for app functionality.
 */
app.controller('MainCtrl', function (campusService, buildingService, roomService, floorObjects, scheduleService, ngTableParams, $scope, $http, $filter, $timeout, $moment, ActiveDate, ActiveTime, ActiveCampus, ActiveBuilding) {
    ...
});
```

DatepickerCtrl contains the logic for the Date Picker Widget.
```
/**
 * Controller for the date picker widget.
 */
app.controller('DatepickerCtrl', function ($scope, ActiveDate, ActiveBuilding) {
    ...
});
```

TimepickerCtrl contains the logic for the Time Picker Widget.
```
/**
 * Controller for the time picker widget.
 */
app.controller('TimepickerCtrl', function ($scope, ActiveTime) {
    ...
});
```

DocsCtrl contains the logic for rendering developer and user documentation.
```
app.controller('DocsCtrl', function($scope) {
    ...
});
```


Front End Testing
-----------------
The tests are located in the test main.js file.

    |+-- test
        |+-- spec
            |+-- controllers
                |+-- main.js

The tests are not extensive and at this point are really just set up to start developing. The tests in the file will pass but they only establish that controllers exist.
The framework and setup is there but tests need written.

To run tests execute:
```
grunt test
```

You should see 2 of 2 tests passed.


API Function Reference
----------------------

Constructor
```
/**
 * Constructor sets BaseUrl, ResponderUrl and ResponderParameters properties
 */
public Astra() {
    this.BaseUrl = "https://asapp01.aaiscloud.com/JCCC_Test/";
    this.ResponderUrl = null;
    this.ResponderParameters = null;
}
```

Login to Astra API.
```
/**
 * Login to Ad Astra API and return the cookie response string.
 * @return String
 * @throws IOException
 */
public String Login() throws IOException {

    /**
     * Open an HTTP Connection to the Logon.ashx page
     */
    HttpURLConnection httpcon = (HttpURLConnection) ((new URL(BaseUrl+"Logon.ashx").openConnection()));
    httpcon.setDoOutput(true);
    httpcon.setRequestProperty("Content-Type", "application/json");
    httpcon.setRequestProperty("Accept", "application/json");
    httpcon.setRequestMethod("POST");
    httpcon.connect();

    /**
     * Output user credentials over HTTP Output Stream
     */
    byte[] outputBytes = "{'username': 'cis264roomutilization', 'password':'roomutilization!APP'}".getBytes("UTF-8");
    OutputStream os = httpcon.getOutputStream();
    os.write(outputBytes);
    os.close();

    /**
     * Call Function setCookie and pass the HttpUrlConnection. Set Function will return a Cookie String used to authenticate user.
     */
    return setCookie(httpcon);

}
```

Parse API Response Cookies.
```
/**
 * Parse returned cookies to be set as Session Cookies.
 * @param httpcon
 * @return String
 */
public String setCookie(HttpURLConnection httpcon) {

    /**
     * Process the HTTP Response Cookies from successful credentials
     */
    String headerName;
    ArrayList<String> cookies = new ArrayList<String>();

    for (int i=1; (headerName = httpcon.getHeaderFieldKey(i))!=null; i++) {
        if (headerName.equals("Set-Cookie")&& httpcon.getHeaderField(i) != "null") {
            cookies.add(httpcon.getHeaderField(i));
        }
    }

    httpcon.disconnect();

    /**
     * Filter cookies, create Session_ID Cookie
     */
    String cookieName = cookies.get(0);
    String cookie2 = cookies.get(1);
    String cookie1 = cookieName.substring(cookieName.indexOf("="), cookieName.indexOf(";")+2);
    cookie2 = cookie2.substring(0, cookie2.indexOf(";"));
    cookieName = cookieName.substring(0 , cookieName.indexOf("="));
    String cookie = cookieName+cookie1+cookie2;

    return cookie;

}
```

Return API HTTP Response
```
/**
 * Return API HTTP Response.
 * @param cookie
 * @param url
 * @param params
 * @return String
 * @throws IOException
 */
public String ApiResponder(String cookie, String url, String params) throws IOException {

    String response = "";

    this.ResponderUrl = url;
    this.ResponderParameters = params;

    /**
     * Create a new HTTP Connection request to responder, pass along Session_ID Cookie
     */
    HttpURLConnection httpcon = (HttpURLConnection) ((new URL(this.BaseUrl+this.ResponderUrl).openConnection()));
    httpcon.setDoOutput(true);
    httpcon.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
    httpcon.setRequestProperty("Accept", "application/json");
    httpcon.setRequestProperty("Cookie", cookie);
    httpcon.setRequestMethod("POST");
    httpcon.connect();

    byte[] outputBytes = this.ResponderParameters.getBytes("UTF-8");
    OutputStream os = httpcon.getOutputStream();
    os.write(outputBytes);
    os.close();

    /**
     * Read/Output response from server
     */
    BufferedReader inreader = new BufferedReader(new InputStreamReader(httpcon.getInputStream()));
    String decodedString;

    while ((decodedString = inreader.readLine()) != null) {
        response += decodedString;
    }

    inreader.close();
    httpcon.disconnect();

    return response;
}
```

Default landing page for an API call.
```
/**
  * Default landing page.
  * @return String
  * @throws IOException
  */
 public static Result index() throws IOException {
     return ok("No data type requested!");
 }
```

Return all campus objects from an API call.
```
/**
 * Return all campus objects.
 * @return Json
 * @throws IOException
 */
@BodyParser.Of(BodyParser.Json.class)
public static Result campuses() throws IOException {

    String requestResults;
    Astra api = new Astra();

    // send request and set content type
    response().setContentType("application/json");
    response().setHeader("Access-Control-Allow-Origin", "*");
    response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
    response().setHeader("Access-Control-Allow-Headers", "Content-Type");
    requestResults = api.ApiResponder(api.Login(), "~api/entity/campus?action=GET", "");

    return ok(requestResults);
}
```

Return all building objects from and API call.
```
/**
 * Return all building objects.
 * @return Json
 * @throws IOException
 */
@BodyParser.Of(BodyParser.Json.class)
public static Result buildings() throws IOException {

    String requestResults;
    Astra api = new Astra();

    // send request and set content type
    response().setContentType("application/json");
    response().setHeader("Access-Control-Allow-Origin", "*");
    response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
    response().setHeader("Access-Control-Allow-Headers", "Content-Type");
    requestResults = api.ApiResponder(api.Login(), "~api/entity/building?action=GET", "");

    return ok(requestResults);
}
```

Return all room objects from an API call.
```
/**
 * Return all room objects.
 * @return Json
 * @throws IOException
 */
@BodyParser.Of(BodyParser.Json.class)
public static Result rooms() throws IOException {

    String requestResults;
    Astra api = new Astra();

    // send request and set content type
    response().setContentType("application/json");
    response().setHeader("Access-Control-Allow-Origin", "*");
    response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
    response().setHeader("Access-Control-Allow-Headers", "Content-Type");
    requestResults = api.ApiResponder(api.Login(), "~api/entity/room?action=GET", "");

    return ok(requestResults);
}
```

Return schedule for date and campus parameters from an API call.
```
/**
 * Return Schedule for given campus and given date.
 * @return Json
 * @throws IOException
 */
@BodyParser.Of(BodyParser.Json.class)
public static Result scheduleByCampus( String campusId, String scheduleDate) throws IOException {

    String requestResults;
    Astra api = new Astra();

    String columns = "InstitutionId%7C0%2CCampusName%7C1%2CLocationId%7C2%2CBuildingCode%7C3%2CRoomNumber%7C4%2CRoomName%7C5%2CActivityId%7C6%2CActivityTypeCode%7C7%2CParentActivityName%7C8%2CActivityName%7C9%2CDescription%7C10%2CStartDate%7C11%2CEndDate%7C12%2CStartMinute%7C13%2CEndMinute%7C14";
    String fields = "InstitutionId%2CCampusName%2CLocationId%2CBuildingCode%2CRoomNumber%2CRoomName%2CActivityId%2CActivityTypeCode%2CParentActivityName%2CActivityName%2CDescription%2CStartDate%2CEndDate%2CStartMinute%2CEndMinute";
    String filter = "(((StartDate%3E%3D%22"+scheduleDate+"T00%3A00%3A00%22)%26%26(EndDate%3C%3D%22"+scheduleDate+"T00%3A00%3A00%22))%26%26(Location.Room.Building.CampusId%20in%20(%22"+campusId+"%22)))";

    // send request and set content type
    response().setContentType("application/json");
    response().setHeader("Access-Control-Allow-Origin", "*");
    response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
    response().setHeader("Access-Control-Allow-Headers", "Content-Type");
    requestResults = api.ApiResponder(api.Login(), "~api/calendar/calendarList?action=get",
            "columns="+columns+"&fields="+fields+"&filter="+filter);

    return ok(requestResults);
}
```