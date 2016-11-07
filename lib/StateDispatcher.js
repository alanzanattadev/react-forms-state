'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";
import StateProxy from "./StateProxy";

export default function StateDispatcher(convertIn = v => v, convertOut = v => v) {
  return function(WrappedComponent) {
    class Dispatcher extends React.Component {
      constructor(props) {
        super(props);
      }

      getChildContext() {
        return {
          stateValue: convertIn(this.props.value),
          onStateChange: (v) => {
            this.props.onChange(convertOut(v));
          },
        };
      }

      render() {
        return (
          <WrappedComponent {...fromJS(this.props).remove('value').remove('onChange').toJS()}/>
        )
      }
    };

    Dispatcher.defaultProps = Object.assign({}, WrappedComponent.defaultProps, {
      onChange() {},
      value: {},
    });

    Dispatcher.propTypes = {
      value: React.PropTypes.object,
      onChange: React.PropTypes.func,
    };

    Dispatcher.childContextTypes = {
      stateValue: React.PropTypes.any,
      onStateChange: React.PropTypes.func,
    };

    return StateProxy({root: true})(Dispatcher);
  };
};
