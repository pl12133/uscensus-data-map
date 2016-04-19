import CitySDK, { modules } from 'citysdk';
import memoize from 'lru-memoize';

import MY_API_KEY from './CitySDKKey.json';

export default function initCitySDK (key = MY_API_KEY.key) {
  let sdk = new CitySDK();
  sdk.modules.census = new modules.CensusModule();
  // The APIRequest needs to be bound to `census` in order
  // to refer to the apiKey stored in `census`
  sdk.modules.census.APIRequest = sdk.modules.census.APIRequest.bind(sdk.modules.census);

  // The CitySDK census module APIRequest wrapped with a Promise.
  function doAPIRequestPromise (request) {
    return new Promise(function (resolve, reject) {
      sdk.modules.census.APIRequest(request, function (response) {
        if (response) {
          resolve(response);
        } else {
          reject('Empty Response');
        }
      });
    });
  }

  // The APIRequstPromise memoized with LRU Cache
  sdk.doAPIRequest = memoize(10)(doAPIRequestPromise);
  // Enabled the SDK with the provided key.
  sdk.modules.census.enable(key);
  return sdk;
}

export function craftRequest (year, zip, state) {
  const request = {
    level: 'state',
    variables: [
      'median_gross_rent',
      'income',
      'population'
    ],
    zip,
    state,
    year
  };
  return request;
}
