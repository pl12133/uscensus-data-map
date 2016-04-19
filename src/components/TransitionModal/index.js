/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { findDOMNode } from 'react-dom';
import { Modal } from 'react-overlays';

import SimpleTransition from '../../components/SimpleTransition/';

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};
// //

class TransitionModal extends Component {
  constructor (...args) {
    super(...args);
    let ownFuncs = [ 'isOpen', 'close', 'open' ];
    ownFuncs.forEach((key) => this[key]
      ? this[key] = this[key].bind(this)
      : console.error('Could not self bind ' + key + ' to ' + TransitionModal.displayName)
    );

    this.state = {
      timeout: 400,
      showModal: false
    };
  }

  componentDidMount () {
    const { modal } = this.refs;
    const modalNode = findDOMNode(modal);
    if (modalNode) {
      modalNode.addEventListener('scroll', this.handleScroll);
    }
  }
  componentWillUnmount () {
    const { modal } = this.refs;
    const modalNode = findDOMNode(modal);
    if (modalNode) {
      modalNode.removeEventListener('scroll', this.handleScroll);
    }
  }
  handleScroll (e) {
    e.preventDefault();
    e.stopPropegation();
  }

  render () {
    let { children } = this.props;
    let { timeout, showModal } = this.state;
    return (
      <Modal
        aria-labelledby='modal-label'
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={showModal}
        ref={'modal'}
        onHide={this.close}
      >
        <div>
          <SimpleTransition
            animations={ ['top 35% 50% 35%', 'opacity 0 1 0'] }
            timeout={timeout}
            ref={'transition'}
          >
            {children}
          </SimpleTransition>
        </div>
      </Modal>
    );
  }

  isOpen () {
    return this.state.showModal;
  }

  close () {
    const { transition = {} } = this.refs;
    let { toggle } = transition;
    if (toggle) {
      toggle();
      setTimeout(() => { this.setState({ showModal: false }); }, this.state.timeout);
    }
  }

  open () {
    this.setState({ showModal: true });
  }
}

TransitionModal.propTypes = {
  children: PropTypes.node
};
export default TransitionModal;
