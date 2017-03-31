"use babel";
// @flow

import React from "react";
import { fromJS, is, List } from "immutable";
import StateProxy from "./StateProxy";
import { setValue, getValue } from "./StateValue";
import Rx from "rxjs";
import { INITIAL_CHANGE_EVENT_TYPE } from "./FormController";

export default function StateDispatcher(
  convertIn = (v, props) => v,
  convertOut = (v, props) => v,
) {
  return function(WrappedComponent) {
    class Dispatcher extends React.Component {
      constructor(props) {
        super(props);

        this.handlers = {};
        this.valueChangeObs = props.valueChangeObs.map(e => {
          const convertedValue = convertIn(e.value, props);
          if (convertedValue === e.value)
            return e;
          else
            return Object.assign({}, e, {
              value: convertedValue,
              statePath: e.type === INITIAL_CHANGE_EVENT_TYPE
                ? undefined
                : props.statePath,
            });
        });
      }

      componentDidMount() {
        if (this.context.attachToController != null)
          this.context.attachToController(() => this.getUncontrolledState());
        this.unsubscribeInitial = this.valueChangeObs
          .filter(e => e.type == INITIAL_CHANGE_EVENT_TYPE)
          .do(e =>
            console.log(
              `Dispatching uncontrolled values from ${this.props.statePath}`,
            ))
          .subscribe({
            next: e => this.dispatchUncontrolledValues(e),
          });
      }

      componentWillUnmount() {
        if (this.context.attachToController != null)
          this.context.attachToController(null);
        this.unsubscribeInitial.unsubscribe();
      }

      dispatchUncontrolledValues(event) {
        Object.keys(this.handlers).forEach(statePath => {
          if (
            event.oldValue === undefined ||
            getValue(convertIn(event.value, this.props), statePath) !==
              getValue(convertIn(event.oldValue, this.props), statePath)
          )
            this.handlers[statePath].set(
              getValue(convertIn(event.value, this.props), statePath),
            );
        });
      }

      getChildContext() {
        return {
          valueChangeObs: this.valueChangeObs,
          rootValueChangeObs: this.props.rootValueChangeObs,
          onStateChange: (v, statePath) => {
            const convertedInParentValue = convertIn(
              this.props.getValue(),
              this.props,
            );
            const completeValue = Array.isArray(convertedInParentValue) ===
              false
              ? Object.assign({}, convertedInParentValue, { [statePath]: v })
              : List().concat(convertedInParentValue).update(list => {
                  return list.update(
                    list.findIndex(item => item.id === statePath),
                    item => Object.assign({}, item, { value: v }),
                  );
                });
            const convertedValue = convertOut(completeValue, this.props);
            // console.log(
            //   "On change",
            //   completeValue,
            //   convertedValue,
            //   completeValue !== convertedValue,
            //   v,
            //   statePath,
            // );
            if (
              convertedValue !== completeValue ||
              typeof convertedValue != typeof this.props.getValue()
            )
              this.props.onChange(convertedValue, this.props.statePath);
            else
              this.props.onChange(
                v,
                `${this.props.statePath}${this.props.statePath == "" || statePath == "" ? "" : "."}${statePath}`,
              );
          },
          attachToController: null,
          addHandler: ((statePath, getHandler, setHandler) => {
            this.handlers = Object.assign({}, this.handlers, {
              [statePath]: {
                get: getHandler,
                set: setHandler,
              },
            });
          }).bind(this),
        };
      }

      getUncontrolledState() {
        let value = Object.keys(this.handlers).reduce(
          (red, statePath) =>
            setValue(red, statePath, this.handlers[statePath].get()),
          {},
        );
        return convertOut(value, this.props);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    Dispatcher.defaultProps = Object.assign({}, WrappedComponent.defaultProps, {
      onChange() {},
      value: {},
      valueChangeObs: Rx.Observable.never(),
    });

    Dispatcher.propTypes = {
      valueChangeObs: React.PropTypes.any,
      onChange: React.PropTypes.func,
    };

    Dispatcher.childContextTypes = {
      valueChangeObs: React.PropTypes.any,
      onStateChange: React.PropTypes.func,
      addHandler: React.PropTypes.func,
      attachToController: React.PropTypes.func,
      rootValueChangeObs: React.PropTypes.any,
    };

    Dispatcher.contextTypes = {
      attachToController: React.PropTypes.func,
    };

    return StateProxy(
      { root: true },
      {
        getValue: child => child.getUncontrolledState(),
        setValue: child => {},
      },
    )(Dispatcher);
  };
}
