/* eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
/* eslint-enable no-unused-vars*/

import { Transition } from 'react-overlays';

class SimpleTransition extends Component {
  constructor (...args) {
    super(...args);
    this.state = { in: false };
    this.makeAnimationObject = this.makeAnimationObject.bind(this);
    this.toggle = this.toggle.bind(this);

    // Setup animations
    let [{ animations }] = args;
    let animationObjs = animations.map(animation => this.makeAnimationObject(...animation.split(' ')));
    this.animationStyles = this.blendAnimationObjects(...animationObjs);

    // Setup hooks
    let { enter, exit, transition } = this.animationStyles;
    this.enterHook = this.applyStylesToNode({ ...enter, transition });
    this.exitHook = this.applyStylesToNode(exit);
  }

  toggle () {
    return this.setState({ in: !this.state.in });
  }
  componentDidMount () {
    this.toggle();
  }

  blendAnimationObjects(...animations) {
    return animations.reduce((memo, current) => {
      memo = {
        initial: { ...memo.initial, ...current.initial },
        enter: { ...memo.enter, ...current.enter },
        exit: { ...memo.exit, ...current.exit },
        transition: (memo.transition)
          ? `${memo.transition}, ${current.transition}`
          : `${current.transition}`
      }
      return memo;
    }, {});
  }
  makeAnimationObject(style = 'noStyle', initial = {}, enter = {}, exit = {}, transition = 'linear') {
    let { timeout } = this.props;
    return {
      initial: { [style] : initial },
      enter: { [style] : enter },
      exit: { [style]: exit },
      transition: `${style} ${timeout}ms ${transition}`
    }
  }
  applyStylesToNode(styles) {
    let nodeMutator = (node) => { // Name anonymous functions during development
      Object.keys(styles).forEach(key => node.style[key] = styles[key]);
      return node;
    }
    return nodeMutator;
  }
  render () {
    const { timeout, children } = this.props;
    const { style: childStyle } = React.Children.only(children).props;
    return (
      <Transition
        in={this.state.in}
        timeout={timeout}
        style={ { ...childStyle, ...this.animationStyles.initial } }
        onEnter={this.enterHook}
        onExit={this.exitHook}
      >
        {children}
      </Transition>
    );
  }
}

SimpleTransition.propTypes = {
  animations: PropTypes.array.isRequired,
  timeout: PropTypes.number
}

export default SimpleTransition;
