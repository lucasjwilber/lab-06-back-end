'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001

// app.use(express.static('[file path of folder containing files to use]');

app.get('/location', (request, response) => {
  response.send('route /location is working');
});

app.get('', (request, response) => {
  response.send('server is up, this is the default route');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});