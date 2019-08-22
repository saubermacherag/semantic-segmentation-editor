# Install instructions for the Semantic Segmentation Editor (Saubermacher Edition)

## Prerequisites

### [Meteor](https://www.meteor.com/install)

__Windows__
Install [Chocolatey](https://chocolatey.org/install). Open an administrative shell (cmd.exe) and enter the following command:
```@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"```

Upgrade chocolatey with
```choco upgrade chocolatey```

Install Meteor with
```choco install meteor```

__Linux__
Install Meteor with
```curl https://install.meteor.com/ | sh```

Install dependencies:
```meteor npm install --save three shelljs serve-static body-parser color-scheme @babel/runtime react react-router history @material-ui/core mdi-material-ui mousetrap postal paper meteor-node-stubs simplify-js canvas-filters file-saver rc-slider prop-types underscore tippy.js three point-in-polygon-extended @tweenjs/tween.js fastintcompression color hull.js polybooljs lineclip react-router-dom react-dom```

[optional]
Update meteor version:
```meteor update```

If update meteor:
Run ```meteor update``` in the hitachi directory.
```sudo apt install mongodb-clients```
```~/.meteor/packages/meteor-tool/1.7.0-rc.1/mt-os.osx.x86_64/dev_bundle/mongodb/bin/mongod --dbpath /where your app is/.meteor/local/db --repair```


