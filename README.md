# HoldIt
This web application was made for the HackTX 2018 American Airlines challenge. To view the corresponding Devpost for the project, click [here](https://devpost.com/software/holdit). To view a video demo of the project click [here](https://www.youtube.com/watch?v=3gWOKDVheZA).

## Prerequisites
To run this project, you must have Node/npm installed
Installation via NVM
```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
nvm use 8
```

In order to compile the styles for this project, you need to have SASS installed.

To install SASS using npm
```bash
npm install -g sass
```

Install SASS using homebrew
```bash
brew install sass/sass/sass
```

## Getting started
To clone the repository to your local machine
```bash
git clone git@github.com:leviv/HoldIt.git
```
To build project dependencies
```bash
npm install
```

To serve the site locally
```bash 
node app.js
```

Then, open the url http://localhost:3000 and start making changes!

## Development
To compile SASS changes to make them take effect
```bash
cd assets/css
sass --watch styles.sass:styles.css
