/* eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/* eslint-enable no-unused-vars*/

import { Panel } from 'react-bootstrap';
import NavigationHeader from 'components/NavigationHeader/';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './styles/';

const App = ({children, location}) => (
  <div>
    <NavigationHeader brand={'Your Brand Here'} fixedTop/>
    <Panel className={styles}>
      <ReactCSSTransitionGroup
        transitionName='routeTransition'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={100}
      >
        {React.cloneElement(children, {
          key: location.pathname
        })}
      </ReactCSSTransitionGroup>
    </Panel>
  </div>
);

export default App;
