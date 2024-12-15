# INST377-group-project

# Weather app

## Description

This weather app aims to give users as much information about a locations weather as possible. The home page contains current weather information of a few select cities. The functionality page contains a search bar that dynamically updates as you type your query into it and displays cities that correspond to what you type. When clicking a city result two 14 day forecast charts are generated using the Chart.js library, one chart contains rain information while the other contains temperature information.  

## Target Browsers

The target browsers for this project are the most common desktop browsers in use today Firefox, Chrome, Edge, and Safari.

# Developer Manual

Node is required to run the site and can be install using winget CLI tool with the command 

``` 
winget install -e --id OpenJS.NodeJS
```

or you can download the installer for your desired system at 
```
https://nodejs.org/en/download/prebuilt-installer
```

after installing node you should be able to run

```
npm start
```
in the root directory then go to 

```
localhost:3000
```
in in your browser.