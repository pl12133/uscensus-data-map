/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Routes from './routes/';
import CitySDK, { modules } from 'citysdk';
// Polyfills go here
require('es6-promise').polyfill();
//

console.log('CitySDK Polyfilled:', CitySDK);

console.log('CitySDK Modules:', modules);

let sdk = new CitySDK();
sdk.modules.census = new modules.CensusModule();
//let census = new modules.CensusModule();
sdk.modules.census.APIRequest = sdk.modules.census.APIRequest.bind(sdk.modules.census);
let isCensusEnabled = sdk.modules.census.enable('9350278314acaae70ecd8a2d3814f608d1e02dac')

const request = {
		"lat": 40.7127,
		"lng": -74.0059,
		"level": "state",
		"variables": [
				"income",
				"population",
				"median_male_age"
		]
};
if (isCensusEnabled) {
	console.log('Census Enabled, Requesting Data');
	sdk.modules.census.APIRequest(request, function (response) {
		console.log(response);
	});
}

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
console.log('Runner runner');
