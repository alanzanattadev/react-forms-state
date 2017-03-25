"use babel";
// @flow

import React from "react";
import { fromJS, is } from "immutable";
import Rx from "rxjs";
import { setValue } from "./StateValue";

function createValueChangeEvent(newValue, statePath) {
  return {
    type: VALUE_CHANGE_EVENT_TYPE,
    newValue,
    statePath
  };
}

function createInitialChangeEvent(newInitial) {
  return {
    type: INITIAL_CHANGE_EVENT_TYPE,
    newValue: newInitial
  };
}

function createSubmitChangeEvent() {
  return {
    type: SUBMIT_EVENT_TYPE
  };
}

export const VALUE_CHANGE_EVENT_TYPE = "VALUE_CHANGE";
export const INITIAL_CHANGE_EVENT_TYPE = "INITIAL_CHANGE";
export const SUBMIT_EVENT_TYPE = "SUBMIT";

export default function FormController(
  applyControl = state => state,
  convertIn = (value, props) => value,
  convertOut = (value, props) => value,
  {
    checkIfModified = true,
    immutableInitial = false
  } = {}
): () => React.Component<any, any, any> {
  return function(
    WrappedComponent: React.Component<any, any, any>
  ): React.Component<any, any, any> {
    class Controller extends React.Component {
      constructor(props) {
        super();
        this.subject = new Rx.Subject()
          .scan(
            (acc, e) => {
              switch (e.type) {
                case VALUE_CHANGE_EVENT_TYPE:
                  const newState = setValue(acc.value, e.statePath, e.newValue);
                  const controlledNewState = applyControl(newState, this.props);
                  return {
                    type: VALUE_CHANGE_EVENT_TYPE,
                    value: controlledNewState,
                    oldValue: acc.value,
                    statePath: e.statePath
                  };
                case SUBMIT_EVENT_TYPE:
                  return { type: SUBMIT_EVENT_TYPE, value: acc.value };
                case INITIAL_CHANGE_EVENT_TYPE:
                  return {
                    type: INITIAL_CHANGE_EVENT_TYPE,
                    value: e.newValue,
                    oldValue: acc.value
                  };
                default:
                  return acc;
              }
            },
            { value: this._getInitialValue(props) }
          )
          .do(e => console.log("FormController event:\n", e))
          .share();
        this.unsubscribeSubmitObs = this.subject
          .filter(e => e.type == SUBMIT_EVENT_TYPE)
          .subscribe({
            next: e => this._submit(e.value)
          });
        this.valueChangeObs = this.subject
          .filter(
            e =>
              e.type == VALUE_CHANGE_EVENT_TYPE ||
              e.type == INITIAL_CHANGE_EVENT_TYPE
          )
          .publishBehavior({
            type: INITIAL_CHANGE_EVENT_TYPE,
            value: this._getInitialValue(props)
          })
          .refCount();
        this.rootDispatcherGetter = null;
      }

      componentWillReceiveProps(nextProps) {
        let newInitial = this._getInitialValue(nextProps);
        let oldInitial = this._getInitialValue(this.props);
        if (
          (oldInitial != null &&
            "toJS" in oldInitial &&
            newInitial != null &&
            "toJS" in newInitial) ||
          immutableInitial
        ) {
          if (newInitial !== oldInitial)
            this.subject.next(createInitialChangeEvent(newInitial));
        } else if (oldInitial == null && newInitial != null) {
          this.subject.next(createInitialChangeEvent(newInitial));
        } else if (oldInitial != null && newInitial != null) {
          if (!is(fromJS(newInitial), fromJS(oldInitial)))
            this.subject.next(createInitialChangeEvent(newInitial));
        }
      }

      _getInitialValue(props) {
        let v = typeof props.initial != "function"
          ? props.initial
          : props.initial(props);
        return convertIn(v, this.props);
      }

      _mergeValues(value) {
        return fromJS(value).mergeDeep(
          this.rootDispatcherGetter
            ? fromJS(this.rootDispatcherGetter())
            : fromJS({})
        );
      }

      _submit(value) {
        let newValue = this._mergeValues(value);
        if (
          checkIfModified === false ||
          !is(newValue, fromJS(this._getInitialValue(this.props)))
        ) {
          this.props.onSubmit(convertOut(newValue.toJS(), this.props));
        }
      }

      getChildContext() {
        return {
          attachToController: getter => {
            this.rootDispatcherGetter = getter;
          }
        };
      }
      render() {
        return (
          <WrappedComponent
            {...this.props}
            onChange={(value, statePath) =>
              this.subject.next(createValueChangeEvent(value, statePath))}
            valueChangeObs={this.valueChangeObs}
            onSubmit={() => this.subject.next({ type: SUBMIT_EVENT_TYPE })}
          />
        );
      }
    }

    Controller.childContextTypes = {
      attachToController: React.PropTypes.func
    };

    return Controller;
  };
}
