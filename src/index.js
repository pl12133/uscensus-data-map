/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Routes from './routes/';
// Polyfills go here
require('es6-promise').polyfill();
//

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
console.log('Runner runner');
