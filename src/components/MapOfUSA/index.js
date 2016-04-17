/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { PageHeader, Button } from 'react-bootstrap';
import InlineSVG from 'svg-inline-react';

import rawSVGMap from '../../assets/Blank_US_Map.svg';
import StateOverlay from '../../components/StateOverlay/';

const US_STATES_SELECTOR = '.svg-container g > path';

const propTypes = {
	onClick: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func
};

const ReactEventToDOMEvent = {
	onClick: 'click',
	onMouseEnter: 'mouseover',
	onMouseLeave: 'mouseleave'
};

class MapOfUSA extends Component {

	constructor () {
		super();
		this.state = { states: [], overlayState: 'Pick a state' };
	}
	componentDidMount () {
		const states = [].slice.call(document.querySelectorAll(US_STATES_SELECTOR))
			.map((node) => node.getAttribute('id'))
			.filter((state) => state.length === 2);

		this.setState({ states });

		const { props } = this;
		let eventHandlers = { ...props };

		eventHandlers.onClick = eventHandlers.onClick || ((e) => {
			this.setState({ overlayState: e.target.getAttribute('id') });
		});
		eventHandlers.onMouseEnter = eventHandlers.onMouseEnter || function (e) {
			e.target.style.fill = 'green';
		};
		eventHandlers.onMouseLeave = eventHandlers.onMouseLeave || function (e) {
			e.target.style.fill = '';
		};

		states.forEach((state) => {
			Object.keys(eventHandlers)
				.forEach((eventHandlerKey) => this.addStateEventListener(state, ReactEventToDOMEvent[eventHandlerKey], eventHandlers[eventHandlerKey]));
		});
	}

	getStateNode (state) {
		if (typeof state === 'string' && state.length === 2) {
			return document.getElementById(state);
		} else {
			throw new Error('States must be 2 characters long. The following state is invalid:', state);
		}
	}

	addStateEventListener (state, event, callback) {
		//console.log(`Adding Listener ${event} to ${state}`)
		document.getElementById(state).addEventListener(event, callback);

	}

	render () {
		const { overlayState } = this.state;
		return (
			<div className='svg-container' style={ { width: '80%', margin: '0 auto' } }>
				<InlineSVG src={rawSVGMap}/>
				<StateOverlay stateCode={overlayState}/>

			</div>
		);
	}
}

MapOfUSA.propTypes = propTypes;

export default MapOfUSA;
