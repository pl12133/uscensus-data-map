/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { LinkContainer } from 'react-router-bootstrap';

import { PageHeader, Button, Panel, Glyphicon, Grid, Row, Col, Well } from 'react-bootstrap';

const ContactItem = ({contactType, contactInfo, contactURL}) => (
  <Row>
    <Col xs={12}>
      <span style={ { fontWeight: 'bold' } }>
        {`${contactType}: `}
      </span>
      {contactURL
				? <a href={contactURL}>{contactInfo}</a>
				: <span>{contactInfo}</span>
			}
    </Col>
  </Row>
);

const ContactInfo = () => (
	<Well>
		<Grid>
			<Row style={ { marginBottom: '1%' } }>
				<h4>
					{'Created By: '}
					<em style={ { fontWeight: 'bold', fontStyle: 'normal' } }>{'Peter Lenahan'}</em>
				</h4>
			</Row>
			<ContactItem
				contactType='Email'
				contactInfo='pal21345@gmail.com'
			/>
			<ContactItem
				contactType='Github'
				contactInfo='@pl12133'
				contactURL='https://github.com/pl12133'
			/>
		</Grid>
	</Well>
);

const About = () => (
  <div>
    <PageHeader>
      {'About US Census Data and CitySDK'}
    </PageHeader>
		<div style={ { width: '80%', margin: '0 auto' } }>
			<ContactInfo />
			<p>
				{'Thanks to the '}
				<a href={'https://github.com/uscensusbureau/citysdk/'}>{'uscensusbureau/CitySDK'}</a>
				{' project, all the data of the US Census is available in one easy to use package. The data can be visualized on a map of the United States to better comprehend the large dataset. Using this App, a person can click on a state and quickly see population, income, and rent data for a state.'}
			</p>
			<Panel bsStyle={'info'}>
				<Glyphicon glyph='info-sign' />
				<p style={ { display: 'inline', marginLeft: '5px' } }>
					{'To access the US Census Bureau API data, this project is using the '}
					<a href={'https://github.com/pl12133/citysdk/'}>{'pl12133/CitySDK'}</a>
					{' fork of CitySDK. This fork is refactored to be used as an npm package.'}
				</p>
			</Panel>
			<p>
				{'The front end is built on React and Bootstrap, created from the starter project '}
				<a href={'https://github.com/pl12133/babel-plate/tree/react-bootstrap-router'}>{'pl12133/babel-plate'}</a>
				{'. The boilerplate lets you begin developing a single page application with React and Bootstrap in minutes.'}
			</p>
			<p>
				{'The charts in this demonstration are built on '}
				<a href={'https://github.com/yang-wei/rd3/'}>{'yang-wei/rd3'}</a>
				{'. The rd3 library shows exciting promise for making charts in React using the powerful D3.js library, but it is currently still in development.'}
			</p>
			<p>
				{'The data map attempts to make it easy to assess the population, median income, and median gross rent of a State. Simply click on a state to view details about it!'}
			</p>
			<LinkContainer to={ { pathname: '/map/' } }>
				<Button bsStyle='success'>
					{'View the Map'}
				</Button>
			</LinkContainer>
		</div>
  </div>
);
About.propTypes = {
};

export default About;
