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

If you setting up on Windows I would recommend using the Chocolatey package manager for easy installation of these packages.

1. Install Chocolatey Package Manager. 
  + Run the following command from your commmand prompt.

  <code>
     @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin
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


Instructions to start working the project:
------------------------------------------

1. You will need a text editor/ide suited for web development. [Sublime Text](http://www.sublimetext.com/) is a great choice.
  + You can also install this on Windows using the Chocolatey package manager.

  <code>
    cinst sublimetext2
  </code>