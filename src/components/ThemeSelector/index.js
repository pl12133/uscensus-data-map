/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/

import { NavDropdown, MenuItem } from 'react-bootstrap';

const defaultTheme = {
  name: 'Default',
  cssCdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
};

const propTypes = {
  eventKey: PropTypes.number
};

class ThemeSelector extends Component {
  constructor () {
    super();
    this.state = {
      active: 0,
      themes: [ defaultTheme ]
    };
  }
  componentDidMount () {
    let error = console.error.bind(console);
    fetch('https://bootswatch.com/api/3.json')
      .then((request) => request.json())
      .then((json) => {
        this.setState({
          themes: [
            defaultTheme,
            ...json.themes
          ]
        });
        console.log('Got:', json);
      }, error);
  }

  handleThemeSelection (index, e) {
    this.setState({
      active: index
    });
    document
      .getElementById('bootstrap-stylesheet')
      .setAttribute('href', this.state.themes[index].cssCdn);
  }

  renderMenuItem (theme, index) {
    const { eventKey } = this.props;
    const { active } = this.state;
    const key = `${eventKey}.${index + 1}`;
    return (
      <MenuItem
        onClick={this.handleThemeSelection.bind(this, index)}
        key={key}
        eventKey={key}
        active={index === active}
      >
        {theme.name}
      </MenuItem>
    );
  }

  render () {
    const { themes, active } = this.state;
    const { eventKey } = this.props;
    const children = themes.map(this.renderMenuItem.bind(this));
    const title = (active)
      ? themes[active].name
      : 'Bootstrap Theme';

    return (
      <NavDropdown eventKey={eventKey} title={title} id='basic-nav-dropdown'>
        {children}
      </NavDropdown>
    );
  }

}

ThemeSelector.propTypes = propTypes;

export default ThemeSelector;
