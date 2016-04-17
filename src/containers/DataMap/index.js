/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { PageHeader, Button } from 'react-bootstrap';
import MapOfUSA from '../../components/MapOfUSA/';

const DataMap = () => {
	return (
		<div>
			<PageHeader>
				{'A map of the USA and Census Data'}
			</PageHeader>
			<MapOfUSA />
		</div>
	);
}
DataMap.propTypes = {
};

export default DataMap;

