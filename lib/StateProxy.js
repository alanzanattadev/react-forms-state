'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";

export default function StateProxy({name} = {}) {
  return function(WrappedComponent) {
    class ProxiedState extends React.Component {
      render() {
        return (
          <WrappedComponent {...Object.assign({}, this.props, {_inputField: false})}/>
        );
      }
    };

    ProxiedState.defaultProps = {
      _inputField: true
    };

    if (name) {
      ProxiedState.defaultProps.name = name;
    }

    return ProxiedState;
  }
};
