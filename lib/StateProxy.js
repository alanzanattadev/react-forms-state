'use babel'
// @flow

import React from 'react';
import { getValue, setValue } from "./StateValue";
import _ from 'lodash';

export default function StateProxy({root, debounceTime, withState} = {root: false, debounceTime: 0, withState: false}, uncontrolledConfig = {
  getValue: () => undefined,
  setValue: () => undefined,
}) {
  return function(WrappedComponent) {
    class ProxiedState extends React.Component {
      constructor(props) {
        super(props);

        this.throttle = _.throttle(fn => fn(), debounceTime);
      }

      componentDidMount() {
        if (this.props.name && this.context.addHandler && !this.isControlled() && uncontrolledConfig.getValue && uncontrolledConfig.setValue) {
          this.context.addHandler(this.getCurrentStatePath(), () => uncontrolledConfig.getValue(this.child), (value) => uncontrolledConfig.setValue(this.child, value));
        }
      }

      getNewPathPart() {
        let value = getValue(this.context.stateValue, this.context.statePath || '')
        if (typeof value == 'object' && Array.isArray(value)) {
          let index = value.findIndex(v => v.id == this.props.name);
          return (index != -1 ? index : '') + '.value';
        } else {
          return this.props.name;
        }
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

      isControlled() {
        return this.props.uncontrolled || this.context.uncontrolled ? false : true;
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
          uncontrolled: this.isControlled() === false,
        };
      }

      getUncontrolledState() {
        return this.child.getUncontrolledState();
      }

      render() {
        if (this.isControlled()) {
          return (
            <WrappedComponent {...Object.assign({}, this.props, {
              value: this.context.stateValue ?
                      (this.props.value !== undefined ?
                          this.props.value :
                          getValue(this.context.stateValue, this.getCurrentStatePath())
                        ) :
                      this.props.value,
              onChange: this.context.onStateChange ?
                        (this.props.onChange !== undefined ?
                            this.props.onChange :
                            newValue => this.throttle(() => this.context.onStateChange(setValue(this.context.stateValue, this.getCurrentStatePath(), newValue)))
                          ) :
                        this.props.onChange,
              statePath: this.getCurrentStatePath()
            })} ref={elem => this.child = elem}/>
          );
        } else {
          return (
            <WrappedComponent {...Object.assign({}, this.props, {
              statePath: this.getCurrentStatePath()
            })} ref={elem => this.child = elem}/>
          )
        }
      }
    };

    ProxiedState.defaultProps = Object.assign({
      uncontrolled: false
    }, {name: (WrappedComponent.defaultProps && WrappedComponent.defaultProps.name) || undefined});

    ProxiedState.contextTypes = {
      statePath: React.PropTypes.string,
      stateValue: React.PropTypes.any,
      onStateChange: React.PropTypes.func,
      addHandler: React.PropTypes.func,
      uncontrolled: React.PropTypes.bool,
    };

    ProxiedState.childContextTypes = {
      statePath: React.PropTypes.string,
      uncontrolled: React.PropTypes.bool,
    };

    return ProxiedState;
  }
};
