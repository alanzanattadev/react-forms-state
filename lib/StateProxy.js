'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";
import { getValue, setValue } from "./StateValue";
import _ from 'lodash';

export default function StateProxy({root, debounceTime} = {root: false, debounceTime: 0}) {
  return function(WrappedComponent) {
    class ProxiedState extends React.Component {
      constructor(props) {
        super(props);

        this.throttle = _.throttle(fn => fn(), debounceTime);
      }

      getNewPathPart() {
        let value = getValue(this.context.stateValue, this.context.statePath || '')
        if (typeof value == 'object' && Array.isArray(value))
          return value.findIndex(v => v.id == this.props.name) + '.value';
        else
          return this.props.name;
      }

      getCurrentStatePath() {
        if (this.context.statePath && this.context.statePath != '' && this.props.name)
          return this.context.statePath + '.' + this.getNewPathPart();
        else if (this.props.name)
          return this.getNewPathPart();
        else if (this.context.statePath)
          return this.context.statePath;
        else
          return '';
      }

      getStatePathToDispatch() {
        if (root)
          return '';
        else
          return this.getCurrentStatePath();
      }

      getChildContext() {
        return {
          statePath: this.getStatePathToDispatch(),
        };
      }

      render() {
        return (
          <WrappedComponent {...Object.assign({}, this.props, {
            value: this.context.stateValue ? getValue(this.context.stateValue, this.getCurrentStatePath()) : this.props.value,
            onChange: this.context.onStateChange ? newValue => this.throttle(() => this.context.onStateChange(setValue(this.context.stateValue, this.getCurrentStatePath(), newValue))) : this.props.onChange,
            statePath: this.getCurrentStatePath()
          })}/>
        );
      }
    };

    ProxiedState.defaultProps = Object.assign({

    }, WrappedComponent.defaultProps);

    ProxiedState.contextTypes = {
      statePath: React.PropTypes.string,
      stateValue: React.PropTypes.any,
      onStateChange: React.PropTypes.func,
    };

    ProxiedState.childContextTypes = {
      statePath: React.PropTypes.string
    };

    return ProxiedState;
  }
};
