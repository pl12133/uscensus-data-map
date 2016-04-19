/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import partial from 'lodash/partial';
import styles from './styles/';

import TransitionModal from '../../components/TransitionModal/';
import { BarChart } from 'rd3';
import initCitySDK, { craftRequest } from 'utils/CitySDK';

const EXPECTED_DATA_YEARS = [ 2010, 2011, 2012, 2013, 2014 ];

// Thanks to http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function capitalizeFirstLetters (words = '', delimeter = ' ') {
  return words.length
    ? words.split(delimeter).map((word) => word.charAt(0).toUpperCase() + word.substr(1)).join(' ')
    : words;
}

class StateDataGraph extends Component {
  constructor () {
    super();
    this.state = { width: 0, height: 0 };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount () {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize (e) {
    console.log('Resizing BarChart');
    const { offsetWidth } = document.querySelector('div.rd3-basic-chart');
    const width = offsetWidth;
    const height = 200;
    this.setState({
      width,
      height
    });
  }

  render () {
    const { width, height } = this.state;
    const { barData, xAxisLabel = 'X Axis', yAxisLabel = 'Y Axis', title = 'Bar Chart' } = this.props;
    return (
      <BarChart
        data={barData}
        width={+width}
        height={+height}
        fill={'#3182bd'}
        title={title}
        yAxisLabel={yAxisLabel}
        xAxisLabel={xAxisLabel}
        yAxisLabelOffset={80}
        margins={ { top: 10, right: 20, bottom: 40, left: 90 } }
      />
    );
  }
}

const StateDataDisplay = ({selectedState}) => {
  const expectedProperties = [ 'population', 'income', 'median_gross_rent' ];
  const yearsList = Object.keys(selectedState);
  const latestYear = yearsList[yearsList.length - 1];
  const {
    stateName = '',
    state = '',
    capital = '',
    data: {
      population = -1,
      income = -1,
      median_gross_rent = -1
    }
  } = selectedState[latestYear];

  const makeValues = (x, y) => {
    let arr = Array(...Array(yearsList.length)).map((_, index) => ({ x: index, y: 0 }));
    arr[x] = { x, y };
    return arr;
  };

  const allBarData = expectedProperties.map((dataProperty) => {
    const formattedDataProperty = capitalizeFirstLetters(dataProperty, '_');
    return {
      xAxisLabel: 'Year',
      yAxisLabel: formattedDataProperty,
      title: `${formattedDataProperty} vs Time`,
      barData: yearsList.map((year, index) => {
        const yearData = selectedState[year];
        return {
          name: year,
          label: year,
          values: makeValues(index, yearData.data[dataProperty])
        };
      })
    };
  });

  const Graphs = allBarData.map((barData, index) => (<StateDataGraph key={index} {...barData} />));
  return (
    <div id={'state-data'} style={ { width: '80%', margin: '0 auto' } }>
      <h1>
        {`State Name: ${capitalizeFirstLetters(stateName)}`}
      </h1>
      <h2>
        {`Data from ${latestYear}:`}
      </h2>
      <p>{`State FIPS Code: ${state}`}</p>
      <p>{`Capital: ${capitalizeFirstLetters(capital)}`}</p>
      <p>{`Population: ${numberWithCommas(population)} people`}</p>
      <p>{`Median Income: $${numberWithCommas(income)}`}</p>
      <p>{`Median Gross Rent: $${numberWithCommas(median_gross_rent)}`}</p>
      {Graphs}
    </div>
  );
};

/*
function printAPIResponse (response) {
/* Response Schema = {
 *   api: "acs5"
 *   blockGroup: "4"
 *   county: "065"
 *   data: Array[1]
 *   geographyValidForAPI: true
 *   lat: 44.368
 *   level: "state"
 *   lng: -100.3364
 *   place: "49600"
 *   place_name: "Pierre city"
 *   state: "46"
 *   sublevel: false
 *   tract: "977800"
 *   variables: Array[3]
 *   year: 2014
 * }
 * /

  // Data contains the pieces of requested census data.
  const { data: dataArray } = response;
  const [ apiData ] = dataArray;
  console.log('State FIPS Code:' + response.state);
  console.log('State Capital:' + response.place_name);
  console.log('State Population:' + apiData.population);
  console.log('State Median Income:' + apiData.income);
  console.log('State Gross Rent:' + apiData.median_gross_rent);

  return Promise.resolve(response);
}
*/

function validateResponse (response) {
  return response.data && response.data.length
    ? Promise.resolve(response)
    : Promise.reject('No Data Receieved');
}

class StateOverlay extends Component {
  constructor () {
    super();
    this.setStateFromResponse = this.setStateFromResponse.bind(this);
    this.state = {
      selectedState: {}
    };
  }
  componentDidMount () {
    this.CitySDK = initCitySDK();
  }

  componentWillReceiveProps (nextProps) {
    const { stateCode: newStateCode } = nextProps;
    const { modal } = this.refs;
    if (modal && !modal.isOpen() && newStateCode.length === 2) {
      modal.open();
      console.log(`Fetching data for ${newStateCode}`);

      // Clear out the current selectedState, then get the new state
      this.setState({ selectedState: {} }, () => {
        EXPECTED_DATA_YEARS.forEach((year) => {
          this.CitySDK
            .doAPIRequest(craftRequest(year, undefined, newStateCode))
              .then(validateResponse)
  //            .then(printAPIResponse)
              .then(partial(this.setStateFromResponse, newStateCode))
              .catch(console.error.bind(console, 'CitySDK APIRequest ERR:'));
        });
      });
    }
  }
  setStateFromResponse (stateCode, response) {
    const { selectedState: currentSelectedState } = this.state;
    // Data contains the pieces of requested census data.
    const { data: dataArray } = response;
    const [ apiData ] = dataArray;

    // Get necesary fields from response and apiData
    const { state, place_name, year } = response;
    const { population, income, median_gross_rent } = apiData;

    // Build React component state
    const selectedState = {
      ...currentSelectedState,
      [year]: {
        stateCode,
        stateName: this.CitySDK.stateNames()[stateCode],
        state,
        capital: place_name || '',
        data: {
          population,
          income,
          median_gross_rent
        }
      }
    };
    this.setState({ selectedState });
  }
  render () {
    const { selectedState } = this.state;
    const children = Object.keys(selectedState).length === EXPECTED_DATA_YEARS.length
      // State data is ready
      ? (<StateDataDisplay selectedState={selectedState} />)
      // State data is still loading
      : (<div><h1>Loading...</h1></div>);

    return (
      <TransitionModal ref={'modal'}>
        <div className={styles}>
          {children}
        </div>
      </TransitionModal>
    );
  }
}

StateOverlay.propTypes = {
  stateCode: PropTypes.string
};

export default StateOverlay;
