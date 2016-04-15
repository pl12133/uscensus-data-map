/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { Position } from 'react-overlays';

// import censusQuery from '../../utils/us-census-api';

class StateOverlay extends Component {
	componentDidMount () {
//		censusQuery({
//			callback: (data) => console.log('Census Query:', data),
//			state: 'NY'
//		});
	}
	render () {
		return (
			<Position
				container={this}
				placement={'top'}
				target={(props) => document.getElementById('NY')}
			>
				<p>{'I am an overlay over New York'}</p>
			</Position>
		)
	}
}

export default StateOverlay;
