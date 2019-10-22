'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001

const app = express();
app.use(cors());

// app.use(express.static('[file path of folder containing files to use for front end]');


function findLatAndLong(city) {
  const geoData = require('./data/geo.json');
  console.log(geoData);
  const locationObj = new Location(city, geoData);
  return locationObj;
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function getWeatherData(city) {
  const geoData = require('./data/darksky.json');
  console.log(geoData);
  let weatherArr = [];
  geoData.daily.data.forEach(day => {
    let weatherObj = new Weather(day);
    weatherArr.push(weatherObj);
  });
  return weatherArr;
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time);
}

function Error(code) {
  this.status = code;
  if (code === 500) {
    this.responseText = 'Something went wrong on our end, sorry';
  } else if (code === 400) {
    this.responseText = 'Page not found';
  } else if (code === 200) {
    this.responseText = 'Success';
  } else {
    this.responseText = 'Invalid Status Code';
  }
}



//location route
app.get('/location', (request, response) => {

  try{
    const city = request.query.data;
    const locationData = findLatAndLong(city);
    console.log(locationData);
    response.send(locationData);
  }
  catch(error){
    console.error(error);
    let status = new Error(500);
    response.status(status.code).send(status.responseText);
  }
});


//weather route
app.get('/weather', (request, response) => {

  try{
    const city = request.query.data;
    const weatherData = getWeatherData(city);
    console.log(weatherData);
    response.send(weatherData);
  }
  catch(error){
    console.error(error);
    let status = new Error(500);
    response.status(status.code).send(status.responseText);
  }
})




//error route
app.get('*', (request, response) => {
  let status = new Error(400);
  response.status(status.code).send(status.responseText);
});

//default route
app.get('', (request, response) => {
  response.send('server is up, this is the default route');
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});