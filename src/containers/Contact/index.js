/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/

import { PageHeader, Grid, Row, Col, Well } from 'react-bootstrap';

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

const Contact = () => (
  <div>
    <PageHeader>
      {'Contact'}
    </PageHeader>
    <Well>
      <Grid>
        <Row style={ { marginBottom: '1%' } }>
          {'Here are a few ways to get in touch'}
        </Row>
        <ContactItem
          contactType='Email'
          contactInfo='pl12133@gmail.com'
        />
        <ContactItem
          contactType='Github'
          contactInfo='@pl12133'
					contactURL='https://github.com/pl12133'
        />
      </Grid>
    </Well>
  </div>
);
Contact.propTypes = {
};

export default Contact;

