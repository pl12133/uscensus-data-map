/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { IndexLinkContainer } from 'react-router-bootstrap';
import { Well, PageHeader } from 'react-bootstrap';

const Page404 = () => (
  <div>
    <PageHeader>
      {'Page Not Found'}
    </PageHeader>
    <Well>
      {'The page you requested could not be found. Please return '}
      <IndexLinkContainer to={ { pathname: '/' } }>
        <a href='#'>{'Home'}</a>
      </IndexLinkContainer>
    </Well>
  </div>
);

export default Page404;
