'use strict';
let productionServer = require('./server.prod');
let developmentServer = require('./server.dev');
const production = (process.env.NODE_ENV === 'production');
console.log('Running in production mode: ' + production);

if (production) {
  productionServer();
} else {
  developmentServer();
}
