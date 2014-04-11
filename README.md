[![Build Status](https://travis-ci.org/Cameron-C-Chapman/cis264roomutilization.svg?branch=camerondev)](https://travis-ci.org/Cameron-C-Chapman/cis264roomutilization)

cis264roomutilization
=====================

Class project for CIS 264.

Instructions to get setup:
--------------------------

You will need git, nodejs, node package manager, bower, and grunt on your development machine.

1. [nodejs](http://nodejs.org/)
2. [npm](https://npmjs.org/doc/README.html)
3. [bower](http://bower.io/)
4. [grunt](http://gruntjs.com/getting-started)

### Windows
*If you setting up on Windows I would recommend using the Chocolatey package manager for easy installation of these packages.*

1. Install Chocolatey Package Manager. 
  + Run the following command from your commmand prompt.

  <code>
     @powershell -NoProfile -ExecutionPolicy unrestricted -Command 
  </code><br />
  <code>
     "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" 
  </code><br />
  <code>
     && SET PATH=%PATH%;%systemdrive%\chocolatey\bin
  </code>
2. Install git.
  + Open Windows Powershell (not the normal command line).

  <code>
    cinst git.install
  </code>
3. Install nodejs and npm.
  + Open Windows Powershell (not the normal command line).

  <code>
    cinst nodejs.install
  </code>
4. Install Bower using the node package manager.
  + Open windows command prompt (not the powershell).

  <code>
    npm install -g bower
  </code>
5. Install Grunt using the node package manager.
  + Open windows command prompt (not the powershell).

  <code>
    npm install -g grunt-cli
  </code>

### Linux
*Using a package manager like apt or yum you can install all the required dependencies your current system doesn't have.*


Instructions to start working the project:
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