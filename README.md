[![Build Status](https://travis-ci.org/Cameron-C-Chapman/cis264roomutilization.svg?branch=digitalocean)](https://travis-ci.org/Cameron-C-Chapman/cis264roomutilization)

cis264roomutilization
=====================

Class project for CIS 264.

Links to frameworks being used:
-------------------------------

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
*Using a package manager like apt or yum you can install all the required dependencies above that your current system doesn't have.*


Instructions to start working the API of the project:
------------------------------------------
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
------------------------------------------
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

5. Install Apache server.

  <code>
    sudo apt-get install  -y apache2
  </code>

  + Verify this worked by entering the IP Address of your droplet into the browser. You should see the default Ubuntu Apache page with "It Works!" in red at the top of page.

5. Install git.

  <code>
    sudo apt-get install -y git-core
  </code>

For the Droplet to Run the API:
-------------------------------

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


For the Droplet to Run the Front End:
-------------------------------------

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

6. Serve the application on port 9009. *In a true production environment you would not want to serve the application through grunt. You could use a node server or just build the static files and serve them through Apache. This was done for the purpose of demonstrating a prototype.*

  ```
    grunt serve
  ```