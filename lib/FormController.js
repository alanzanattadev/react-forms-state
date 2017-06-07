"use babel";
// @flow

import React from "react";
import { fromJS, is } from "immutable";
import Rx from "rxjs";
import {
  INITIAL_CHANGE_EVENT_TYPE,
  VALIDATION_FAILED_EVENT_TYPE,
  VALUE_CHANGE_EVENT_TYPE,
  SUBMIT_EVENT_TYPE,
  createInitialChangeEvent,
  createSubmitChangeEvent,
  createValidationFailedEvent,
  createValueChangeEvent,
} from "./FormEvents";
import { setValue } from "./StateValueHelpers";
import {
  Validation,
  type ValidationError,
  type ValidationInfo,
} from "./ValidationHelpers";

export default function FormController(
  applyControl: (state: any) => any = state => state,
  convertIn: (value: any, props: any) => Object = (value, props) => value,
  convertOut: (value: any, props: any) => Object = (value, props) => value,
  {
    checkIfModified = true,
    immutableInitial = false,
  }: {
    checkIfModified: boolean,
    immutableInitial: boolean,
  } = {},
  validate: (value: any, props: any) => ValidationInfo = (value, props) => true,
): (Comp: React$Component<any, any, any>) => React$Component<any, any, any> {
  return function(
    WrappedComponent: React$Component<any, any, any>,
  ): React.Component<any, any, any> {
    class Controller extends React.Component<any, any, any> {
      subject: Rx.Subject;
      valueChangeObs: Rx.Subject;
      rootDispatcherGetter: ?() => any;

      constructor(props) {
        super();
        this.subject = new Rx.Subject()
          .scan(
            (acc, e) => {
              const newValidation = e.validation != null
                ? e.validation
                : acc.validation;
              switch (e.type) {
                case VALUE_CHANGE_EVENT_TYPE:
                  const newState = setValue(acc.value, e.statePath, e.newValue);
                  const controlledNewState = applyControl(newState, this.props);
                  return {
                    type: VALUE_CHANGE_EVENT_TYPE,
                    value: controlledNewState,
                    oldValue: acc.value,
                    statePath: e.statePath,
                    validation: newValidation,
                  };
                case SUBMIT_EVENT_TYPE:
                  return {
                    type: SUBMIT_EVENT_TYPE,
                    value: acc.value,
                    validation: acc.validation,
                  };
                case INITIAL_CHANGE_EVENT_TYPE:
                  return {
                    type: INITIAL_CHANGE_EVENT_TYPE,
                    value: e.newValue,
                    oldValue: acc.value,
                    validation: newValidation,
                  };
                case VALIDATION_FAILED_EVENT_TYPE:
                  return {
                    type: VALIDATION_FAILED_EVENT_TYPE,
                    value: acc.value,
                    validation: e.validation,
                  };
                default:
                  return acc;
              }
            },
            { value: this._getInitialValue(props), validation: true },
          )
          .do(
            e =>
              global.process &&
              global.process.env &&
              global.process.env.FORMALIZR_ENV === "DEBUG" &&
              console.log("FormController event:\n", e),
          )
          .share();
        this.subject.filter(e => e.type == SUBMIT_EVENT_TYPE).subscribe({
          next: e => this._submit(e.value),
        });
        this.valueChangeObs = this.subject
          .filter(
            e =>
              e.type == VALUE_CHANGE_EVENT_TYPE ||
              e.type == INITIAL_CHANGE_EVENT_TYPE ||
              e.type == VALIDATION_FAILED_EVENT_TYPE,
          )
          .publishBehavior({
            type: INITIAL_CHANGE_EVENT_TYPE,
            value: this._getInitialValue(props),
            validation: true,
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

      componentWillUnmount() {
        this.subject.unsubscribe();
      }

      _getInitialValue(props) {
        let v = typeof props.initial != "function"
          ? props.initial
          : props.initial(props);
        return convertIn(v == null ? {} : v, props);
      }

      _mergeValues(value) {
        return fromJS(value).mergeDeep(
          this.rootDispatcherGetter
            ? fromJS(this.rootDispatcherGetter())
            : fromJS({}),
        );
      }

      _submit(value) {
        let newValue = this._mergeValues(value);
        if (
          checkIfModified === false ||
          !is(newValue, fromJS(this._getInitialValue(this.props)))
        ) {
          const validation = validate(newValue.toJS(), this.props);
          if (validation === true || validation == null) {
            this.props.onSubmit(convertOut(newValue.toJS(), this.props));
          } else {
            this.subject.next(
              createValidationFailedEvent(new Validation(validation)),
            );
          }
        }
      }

      getChildContext() {
        return {
          attachToController: getter => {
            this.rootDispatcherGetter = getter;
          },
        };
      }
      render() {
        return (
          <WrappedComponent
            {...this.props}
            onChange={(value: any, statePath: string, validation: Validation) =>
              this.subject.next(
                createValueChangeEvent(value, statePath, validation),
              )}
            valueChangeObs={this.valueChangeObs}
            onSubmit={() => this.subject.next(createSubmitChangeEvent())}
          />
        );
      }
    }

    Controller.childContextTypes = {
      attachToController: React.PropTypes.func,
    };

    return Controller;
  };
}
