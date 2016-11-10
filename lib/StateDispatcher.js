'use babel'
// @flow

import React from 'react';
import { fromJS, is } from "immutable";
import StateProxy from "./StateProxy";
import {setValue, getValue} from "./StateValue";

export default function StateDispatcher(convertIn = v => v, convertOut = v => v) {
  return function(WrappedComponent) {
    class Dispatcher extends React.Component {
      constructor(props) {
        super(props);

        this.handlers = {};
      }

      componentDidMount() {
        this.dispatchUncontrolledValues();
      }

      componentDidUpdate(prevProps) {
        if (!is(fromJS(this.props.value), fromJS(prevProps.value))) {
          this.dispatchUncontrolledValues();          
        }
      }

      dispatchUncontrolledValues() {
        fromJS(this.handlers)
          .keySeq()
          .forEach(statePath => this.handlers[statePath].set(getValue(convertIn(this.props.value), statePath)))
      }

      getChildContext() {
        return {
          stateValue: convertIn(this.props.value),
          onStateChange: (v) => {
            this.props.onChange(convertOut(v));
          },
          addHandler: ((statePath, getHandler, setHandler) => {
            console.log("handler", statePath);
            this.handlers = fromJS(this.handlers)
                              .set(statePath, {
                                get: getHandler,
                                set: setHandler,
                              })
                              .toJS()
          }).bind(this),
        };
      }

      getUncontrolledState() {
        console.log(this.handlers);
        let value = fromJS(this.handlers)
                      .keySeq()
                      .reduce((red, statePath) => setValue(red, statePath, this.handlers[statePath].get()), {});
        return convertOut(value);
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
      addHandler: React.PropTypes.func,
    };

    return StateProxy({root: true}, {
      getValue: (child) => child.getUncontrolledState(),
      setValue: (child) => {},
    })(Dispatcher);
  };
};
