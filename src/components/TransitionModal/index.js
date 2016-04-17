/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/
import { Modal } from 'react-overlays';
import { Col, Image } from 'react-bootstrap';

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

const dialogStyle = function () {
  return {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e5e5e5',
    maxWidth: '400px',
    maxHeight: '75%',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
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

  render () {
    let { children } = this.props;
    let { timeout, showModal } = this.state;
    return (
			<Modal
				aria-labelledby='modal-label'
				style={modalStyle}
				backdropStyle={backdropStyle}
				show={showModal}
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
    let { toggle } = transition
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
	children: PropTypes.node,
};
export default TransitionModal;
