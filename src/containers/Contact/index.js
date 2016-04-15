/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/

import { PageHeader, Grid, Row, Col, Well } from 'react-bootstrap';

const ContactItem = ({contactType, contactInfo}) => (
  <Row>
    <Col xs={12}>
      <span style={ { fontWeight: 'bold' } }>
        {`${contactType}:`}
      </span>
      <span>{contactInfo}</span>
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
          contactType='Phone'
          contactInfo='(234) 567-8910'
        />
        <ContactItem
          contactType='Email'
          contactInfo='you@email.com'
        />
      </Grid>
    </Well>
  </div>
);
Contact.propTypes = {
};

export default Contact;

