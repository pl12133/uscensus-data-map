/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { LinkContainer } from 'react-router-bootstrap';

import { PageHeader, Button } from 'react-bootstrap';

const About = () => (
  <div>
    <PageHeader>
      {'A project with react-bootstrap and react-router'}
    </PageHeader>
    <LinkContainer to={ { pathname: '/contact/' } }>
      <Button bsStyle='success'>
        {'Contact The Designer'}
      </Button>
    </LinkContainer>
  </div>
);
About.propTypes = {
};

export default About;
