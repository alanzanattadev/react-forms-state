'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";

export default function StateProxy({name} = {}) {
  return function(WrappedComponent) {
    class ProxiedState extends React.Component {
      render() {
        return (
          <WrappedComponent {...this.props}/>
        );
      }
    };

    ProxiedState.defaultProps = {
      _inputField: true,
      name: name
    };

    return ProxiedState;
  }
};
