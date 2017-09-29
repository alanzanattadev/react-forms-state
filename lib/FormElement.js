"use babel";
// @flow

import React from "react";
import { getValue, setValue } from "./StateValueHelpers";
import {
  INITIAL_CHANGE_EVENT_TYPE,
  VALUE_CHANGE_EVENT_TYPE,
  VALIDATION_FAILED_EVENT_TYPE,
} from "./FormEvents";
import type { FormEvent } from "./FormEvents";
import Rx from "rxjs";
import { Validation } from "./ValidationHelpers";
import PropTypes from "prop-types";

const NeverObservable = Rx.Observable.never();

export default function FormElement(
  {
    root = false,
    validate = () => true,
    getUncontrolledValue,
    setUncontrolledValue,
  }: {
    root?: boolean,
    validate?: (value: any, props: Object) => boolean,
    getUncontrolledValue?: () => any,
    setUncontrolledValue?: () => any,
  } = {},
) {
  return function FormElementHOC(
    WrappedComponent: Class<React.Component<any, any>>,
  ) {
    class FormElementContainer extends React.Component<any, any> {
      parentValueChangeObs: Rx.Subject<FormEvent>;
      valueChangeObs: Rx.Subject<FormEvent>;
      subscription: Rx.Subscription;
      value: ?any;
      validation: ?any;

      constructor(props, context) {
        super(props);

        this.state = {
          value: null,
          validation: null,
        };
        this.configureObs(props, context);
      }

      getHumanReadableIdentifier(props, context) {
        const currentStatePath = this.getCurrentStatePath(props, context, {});
        return `ProxiedField with statePath ${currentStatePath != null &&
        currentStatePath !== ""
          ? currentStatePath
          : '""'} and elementName ${props.elementName != "" &&
        props.elementName != undefined
          ? props.elementName
          : '""'}`;
      }

      getAssignedObs(props, context) {
        if (props.valueChangeObs) {
          return props.valueChangeObs;
        } else if (context.valueChangeObs) {
          return context.valueChangeObs;
        } else {
          return NeverObservable;
        }
      }

      configureObs(props, context) {
        this.parentValueChangeObs = this.getAssignedObs(props, context);
        if (this.parentValueChangeObs === NeverObservable && props.__debug)
          console.warn(
            `${this.getHumanReadableIdentifier(
              props,
              context,
            )} hasn't received any valueChangeObs neither as props nor context. Maybe you have forgotten the FormController / StateDispatcher duo`,
          );
        this.valueChangeObs = this.parentValueChangeObs
          .do(e => {
            if (props.__debug) {
              const path = this.getCompleteCurrentStatePath(
                props,
                context,
                e.value,
              );
              if (path != "" && e.type === VALUE_CHANGE_EVENT_TYPE) {
                console.log(
                  "FILTERING",
                  path,
                  "FOR STATEPATH",
                  e.statePath,
                  "PROPS",
                  props,
                  "CONTEXT",
                  context,
                );
              }
            }
          })
          .filter(e => {
            const path = this.getCompleteCurrentStatePath(
              props,
              context,
              e.value,
            );
            return (
              e.type === INITIAL_CHANGE_EVENT_TYPE ||
              e.type === VALIDATION_FAILED_EVENT_TYPE ||
              path.startsWith(e.statePath) ||
              (root && e.statePath.startsWith(path))
            );
          })
          .do(e => {
            if (props.__debug) {
              const path = this.getCompleteCurrentStatePath(
                props,
                context,
                e.value,
              );
              if (path != "" && e.type === VALUE_CHANGE_EVENT_TYPE) {
                console.log("REFRESHING", path, "FOR EVENT", e);
              }
            }
          })
          .map(e =>
            Object.assign({}, e, {
              value: getValue(
                e.value,
                this.getCurrentStatePath(props, context, e.value),
              ),
              validation:
                e.validation && e.validation instanceof Validation
                  ? e.validation.getNestedValidation(
                      this.getCurrentStatePath(props, context, e.value),
                    )
                  : e.validation,
            }),
          )
          .do(e => {
            if (props.__debug) {
              console.log("FOUND VALUE:", e);
            }
          });
      }

      connectToFormController(props, context) {
        if (this.valueChangeObs && this.isControlled(props, context)) {
          this.disconnectFromFormController();
          this.subscription = this.valueChangeObs.subscribe(e => {
            if (props.__debug) {
              console.log(
                "Setting value",
                e,
                `in ${root ? "instance" : "state"} mode`,
              );
            }
            if (e.value === undefined) {
              console.warn(
                `${this.getHumanReadableIdentifier(
                  props,
                  context,
                )} doesn't have any value set in the state, it may break`,
              );
            }
            if (root) {
              this.value = e.value;
              this.validation = e.validation;
            } else {
              this.setState({
                value: e.value,
                validation: e.validation,
              });
            }
          });
        }
      }

      disconnectFromFormController() {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }

      connectToUncontrolledHandlers(props, context) {
        if (
          props.elementName &&
          context.addHandler &&
          !this.isControlled(props, context)
        ) {
          if (getUncontrolledValue == null || setUncontrolledValue == null) {
            console.warn(
              `${this.getHumanReadableIdentifier(
                props,
                context,
              )} is uncontrolled but has no getValue / setValue defined, thus it is disabled and not connected`,
            );
          } else {
            context.addHandler(
              this.getCurrentStatePath(props, context),
              () =>
                root
                  ? this.getUncontrolledState()
                  : getUncontrolledValue(this.child),
              value =>
                root
                  ? this.child.dispatchUncontrolledValues({ value: value })
                  : setUncontrolledValue(this.child, value),
            );
          }
        }
      }

      componentDidMount() {
        this.connectToUncontrolledHandlers(this.props, this.context);
        this.connectToFormController(this.props, this.context);
      }

      componentWillReceiveProps(nextProps, nextContext) {
        if (
          this.parentValueChangeObs !==
          this.getAssignedObs(nextProps, nextContext)
        ) {
          console.log(
            `Reconnecting ${this.getHumanReadableIdentifier(
              nextProps,
              nextContext,
            )}`,
          );
          this.configureObs(nextProps, nextContext);
          this.connectToFormController(nextProps, nextContext);
        }
      }

      componentWillUnmount() {
        this.disconnectFromFormController();
      }

      getNewPathPart(props, context, v) {
        let value = getValue(v, context.statePath || "");
        if (typeof value == "object" && Array.isArray(value)) {
          let index = value.findIndex(v => v.id == props.elementName);
          return (index != -1 ? index : "") + ".value";
        } else {
          return props.elementName;
        }
      }

      getNewCompletePathPart(props, context, v) {
        let value = getValue(v, context.completeStatePath || "");
        if (typeof value == "object" && Array.isArray(value)) {
          let index = value.findIndex(v => v.id == props.elementName);
          return (index != -1 ? index : "") + ".value";
        } else {
          return props.elementName;
        }
      }

      getCurrentStatePath(props, context, value) {
        if (context.statePath && context.statePath != "" && props.elementName)
          return (
            context.statePath + "." + this.getNewPathPart(props, context, value)
          );
        else if (props.elementName)
          return this.getNewPathPart(props, context, value);
        else if (context.statePath) return context.statePath;
        else return "";
      }

      getCompleteCurrentStatePath(props, context, value) {
        if (
          props.valueChangeObs == null &&
          context.completeStatePath &&
          context.completeStatePath != "" &&
          props.elementName
        )
          return (
            context.completeStatePath +
            "." +
            this.getNewCompletePathPart(props, context, value)
          );
        else if (props.elementName)
          return this.getNewCompletePathPart(props, context, value);
        else if (props.valueChangeObs == null && context.completeStatePath)
          return context.completeStatePath;
        else return "";
      }

      isControlled(props, context) {
        return props.uncontrolled || context.uncontrolled ? false : true;
      }

      getStatePathToDispatch(props, context) {
        if (root) return "";
        else return this.getCurrentStatePath(props, context);
      }

      getChildContext() {
        return {
          statePath: this.getStatePathToDispatch(this.props, this.context),
          completeStatePath: this.getCompleteCurrentStatePath(
            this.props,
            this.context,
          ),
          uncontrolled: this.isControlled(this.props, this.context) === false,
        };
      }

      getUncontrolledState() {
        return this.child.getUncontrolledState();
      }

      render() {
        const value =
          this.state.value == undefined && this.props.value !== undefined
            ? this.props.value
            : this.state.value;
        const validation =
          this.state.validation == undefined &&
          this.props.validation !== undefined
            ? this.props.validation
            : this.state.validation;
        const statePath = this.getCurrentStatePath(this.props, this.context);
        if (this.isControlled(this.props, this.context)) {
          return (
            <WrappedComponent
              {...Object.assign({}, this.props, {
                value: value,
                validation: validation,
                valueChangeObs: this.valueChangeObs,
                rootValueChangeObs: this.context.rootValueChangeObs
                  ? this.context.rootValueChangeObs
                  : this.valueChangeObs,
                onChange:
                  this.props.onChange != null
                    ? (newValue, sp) => {
                        this.props.onChange(
                          newValue,
                          sp !== undefined ? sp : statePath,
                          validate(newValue, this.props),
                        );
                      }
                    : (newValue, sp) => {
                        this.context.onStateChange(
                          newValue,
                          sp !== undefined ? sp : statePath,
                          validate(newValue, this.props),
                        );
                      },
                statePath: statePath,
                getValue: root ? () => this.value : undefined,
              })}
              ref={elem => (this.child = elem)}
            />
          );
        } else {
          return (
            <WrappedComponent
              {...Object.assign({}, this.props, {
                statePath: statePath,
                getValue: root ? () => this.value : undefined,
              })}
              ref={elem => (this.child = elem)}
            />
          );
        }
      }
    }

    FormElementContainer.defaultProps = Object.assign(
      {
        uncontrolled: false,
      },
      {
        elementName:
          (WrappedComponent.defaultProps &&
            WrappedComponent.defaultProps.elementName) ||
          undefined,
      },
    );

    FormElementContainer.contextTypes = {
      statePath: PropTypes.string,
      completeStatePath: PropTypes.string,
      valueChangeObs: PropTypes.any,
      onStateChange: PropTypes.func,
      addHandler: PropTypes.func,
      uncontrolled: PropTypes.bool,
      rootValueChangeObs: PropTypes.any,
    };

    FormElementContainer.childContextTypes = {
      statePath: PropTypes.string,
      completeStatePath: PropTypes.string,
      uncontrolled: PropTypes.bool,
    };

    return FormElementContainer;
  };
}
