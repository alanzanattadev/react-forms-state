'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";

export default function StateProxy(WrappedComponent) {
  class ProxiedState extends React.Component {
    render() {
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  };

  ProxiedState.defaultProps = {
    _inputField: true,
    name: WrappedComponent.defaultProps.name,
  };

  return ProxiedState;
};
