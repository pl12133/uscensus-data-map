/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import partial from 'lodash/partial';

import TransitionModal from '../../components/TransitionModal/';
import { BarChart } from 'rd3';
import { Modal } from 'react-overlays';
import initCitySDK, { craftRequest } from 'utils/CitySDK';

console.log('BarChart:', BarChart);

// Thanks to http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function capitalizeFirstLetters(words = '') {
	console.log('Capitalizing ' + words);
	return words.length
		? words.split(' ').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ')
		: words;
}


const StateDataGraph = ({barData, width = 500, height = 200}) => {
	return (
		<BarChart
			data={barData}
			width={width}
			height={height}
			fill={'#3182bd'}
			title={'Bar Chart'}
			yAxisLabel={'Label'}
			yAxisLabelOffset={-45}
			xAxisLabel={'Value'}
			margins={ { top: 10, right: 20, bottom: 40, left: 90 } }
		/>
	);
};

const StateDataDisplay = ({selectedState, dataProperty}) => {
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
		let arr = Array(...Array(yearsList.length)).map((_, index) => ({ x: index, y: 0 }) );
		arr[x] = { x, y };
		return arr;
	};

	const barData = yearsList.map((year, index) => {
		const yearData = selectedState[year];
		return {
			name: year,
			values: makeValues(index, yearData.data[dataProperty])
		};
	});
	return (
		<div style={ { width: '80%', margin: '0 auto' } }>
			<h1>
				{`State Name: ${capitalizeFirstLetters(stateName)}`}
				{`Data from ${latestYear}:`}
			</h1>
			<p>{`State FIPS Code: ${state}`}</p>
			<p>{`Capital: ${capitalizeFirstLetters(capital)}`}</p>
			<p>{`Population: ${numberWithCommas(population)} people`}</p>
			<p>{`Median Income: $${numberWithCommas(income)}`}</p>
			<p>{`Median Gross Rent: $${numberWithCommas(median_gross_rent)}`}</p>
			<StateDataGraph barData={barData}/>
		</div>
	);
}

function printAPIResponse(response) {
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
 */
 
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
		}
	}
	componentDidMount () {
		this.CitySDK = initCitySDK();
	}

	componentWillReceiveProps (nextProps) {
		const { stateCode: newStateCode } = nextProps;
		const { modal } = this.refs;
		if (modal && !modal.isOpen() && newStateCode.length === 2) {
			modal.open()
			console.log(`Fetching data for ${newStateCode}`);

			// Clear out the current selectedState, then get the new state
			this.setState({ selectedState: {} }, () => {
				[2010, 2011, 2012, 2013, 2014].forEach(year => {
					this.CitySDK
						.doAPIRequest(craftRequest(year, undefined, newStateCode))
							.then(validateResponse)
	//						.then(printAPIResponse)
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
		const { stateCode = 'N/A' } = this.props;
		const { selectedState } = this.state;
		console.log('Selected State:', selectedState);
		const children = Object.keys(selectedState).length === 5
			// State data is ready
			? ( <StateDataDisplay dataProperty={'population'} selectedState={selectedState} /> )
			// State data is still loading
			:	( <div><h1>Loading...</h1></div> );

		return (
			<TransitionModal ref={'modal'}>
				<div style={ {
						position: 'absolute',
						top: '35%',
						left: '50%',
						width: '50%',
						transform: 'translate(-50%, -50%)',
						border: '2px lightblue',
						background: 'white'
					} }
				>
					{children}
				</div>
			</TransitionModal>
		)
	}
}

StateOverlay.propTypes = {
	stateCode: PropTypes.string
};

export default StateOverlay;
