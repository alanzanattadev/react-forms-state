'use babel'
// @flow

import React from 'react';
import { fromJS, is } from "immutable";
import StateProxy from "./StateProxy";
import {setValue, getValue} from "./StateValue";

export default function StateDispatcher(convertIn = (v, props) => v, convertOut = (v, props) => v) {
  return function(WrappedComponent) {
    class Dispatcher extends React.Component {
      constructor(props) {
        super(props);

        this.handlers = {};
      }

      componentDidMount() {
        this.dispatchUncontrolledValues();
        if (this.context.attachToController != null)
          this.context.attachToController(() => this.getUncontrolledState());
      }

      componentWillUnmount() {
        if (this.context.attachToController != null)
          this.context.attachToController(null);
      }

      componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
          this.dispatchUncontrolledValues(prevProps);
        }
      }

      dispatchUncontrolledValues(prevProps) {
        fromJS(this.handlers)
          .keySeq()
          .forEach(statePath => {
            if (prevProps === undefined || getValue(convertIn(this.props.value, this.props), statePath) !== getValue(convertIn(prevProps.value, prevProps), statePath))
              this.handlers[statePath].set(getValue(convertIn(this.props.value, this.props), statePath));
          })
      }

      getChildContext() {
        return {
          stateValue: convertIn(this.props.value, this.props),
          onStateChange: (v) => {
            this.props.onChange(convertOut(v, this.props));
          },
          attachToController: null,
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
        return convertOut(value, this.props);
      }

      render() {
        return (
          <WrappedComponent {...this.props}/>
        )
      }
    };

    Dispatcher.defaultProps = Object.assign({}, WrappedComponent.defaultProps, {
      onChange() {},
      value: {},
    });

    Dispatcher.propTypes = {
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
    };

    Dispatcher.childContextTypes = {
      stateValue: React.PropTypes.any,
      onStateChange: React.PropTypes.func,
      addHandler: React.PropTypes.func,
      attachToController: React.PropTypes.func,
    };

    Dispatcher.contextTypes = {
      attachToController: React.PropTypes.func,
    };

    return StateProxy({root: true}, {
      getValue: (child) => child.getUncontrolledState(),
      setValue: (child) => {},
    })(Dispatcher);
  };
};
