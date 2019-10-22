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

function Location(name, geoData) {
  this.search_query = name;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
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
    response.status(500).send('server error');
  }
});

//error route
app.get('*', (request, response) => {
  response.status(404).send('not found');
});

//default route
app.get('', (request, response) => {
  response.send('server is up, this is the default route');
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});