"use babel";
// @flow

import React from "react";
import { getValue, setValue } from "./StateValue";
import _ from "lodash";
import {
  INITIAL_CHANGE_EVENT_TYPE,
  VALUE_CHANGE_EVENT_TYPE,
} from "./FormController";
import Rx from "rxjs";

export default function StateProxy(
  { root = false } = { root: false },
  uncontrolledConfig = {
    getValue: () => undefined,
    setValue: () => undefined,
  },
) {
  return function(WrappedComponent) {
    class ProxiedState extends React.Component {
      constructor(props, context) {
        super(props);

        this.state = {
          value: null,
        };
        this.parentValueChangeObs = props.valueChangeObs ||
          context.valueChangeObs ||
          Rx.Observable.never();
        this.valueChangeObs = this.parentValueChangeObs
          // .do(e => {
          //   const path = this.getCompleteCurrentStatePath(
          //     props,
          //     context,
          //     e.value,
          //   );
          //   if (path != "" && e.type === VALUE_CHANGE_EVENT_TYPE) {
          //     console.log(
          //       "FILTERING",
          //       path,
          //       "FOR STATEPATH",
          //       e.statePath,
          //       "PROPS",
          //       props,
          //       "CONTEXT",
          //       context,
          //     );
          //   }
          // })
          .filter(e => {
            const path = this.getCompleteCurrentStatePath(
              props,
              context,
              e.value,
            );
            return e.type == INITIAL_CHANGE_EVENT_TYPE ||
              path.startsWith(e.statePath) ||
              (root && e.statePath.startsWith(path))
              props.valueChangeObs;
          })
          // .do(e => {
          //   const path = this.getCompleteCurrentStatePath(
          //     props,
          //     context,
          //     e.value,
          //   );
          //   if (path != "" && e.type === VALUE_CHANGE_EVENT_TYPE)
          //     console.log("REFRESHING", path, "FOR EVENT", e);
          // })
          .map(e =>
            Object.assign({}, e, {
              value: getValue(
                e.value,
                this.getCurrentStatePath(props, context, e.value),
              ),
            }));
      }

      componentDidMount() {
        if (
          this.props.name &&
          this.context.addHandler &&
          !this.isControlled() &&
          uncontrolledConfig.getValue &&
          uncontrolledConfig.setValue
        ) {
          this.context.addHandler(
            this.getCurrentStatePath(this.props, this.context),
            () =>
              root
                ? this.getUncontrolledState()
                : uncontrolledConfig.getValue(this.child),
            value =>
              root
                ? this.child.dispatchUncontrolledValues({ value: value })
                : uncontrolledConfig.setValue(this.child, value),
          );
        }
        if (this.valueChangeObs && this.isControlled())
          this.unsubscribeObs = this.valueChangeObs.subscribe({
            next: e =>
              root
                ? (this.value = e.value)
                : this.setState({
                    value: e.value,
                  }),
          });
      }

      componentWillUnmount() {
        if (this.unsubscribeObs) this.valueChangeObs.unsubscribe();
      }

      getNewPathPart(props, context, v) {
        let value = getValue(v, context.statePath || "");
        if (typeof value == "object" && Array.isArray(value)) {
          let index = value.findIndex(v => v.id == props.name);
          return (index != -1 ? index : "") + ".value";
        } else {
          return props.name;
        }
      }

      getNewCompletePathPart(props, context, v) {
        let value = getValue(v, context.completeStatePath || "");
        if (typeof value == "object" && Array.isArray(value)) {
          let index = value.findIndex(v => v.id == props.name);
          return (index != -1 ? index : "") + ".value";
        } else {
          return props.name;
        }
      }

      getCurrentStatePath(props, context, value) {
        if (context.statePath && context.statePath != "" && props.name)
          return context.statePath +
            "." +
            this.getNewPathPart(props, context, value);
        else if (props.name) return this.getNewPathPart(props, context, value);
        else if (context.statePath) return context.statePath;
        else return "";
      }

      getCompleteCurrentStatePath(props, context, value) {
        if (
          props.valueChangeObs == null &&
          context.completeStatePath &&
          context.completeStatePath != "" &&
          props.name
        )
          return context.completeStatePath +
            "." +
            this.getNewCompletePathPart(props, context, value);
        else if (props.name)
          return this.getNewCompletePathPart(props, context, value);
        else if (props.valueChangeObs == null && context.completeStatePath)
          return context.completeStatePath;
        else
          return "";
      }

      isControlled() {
        return this.props.uncontrolled || this.context.uncontrolled
          ? false
          : true;
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
          uncontrolled: this.isControlled() === false,
        };
      }

      getUncontrolledState() {
        return this.child.getUncontrolledState();
      }

      render() {
        const value = this.state.value === undefined &&
          this.props.value !== undefined
          ? this.props.value
          : this.state.value;
        const statePath = this.getCurrentStatePath(this.props, this.context);
        if (this.isControlled()) {
          return (
            <WrappedComponent
              {...Object.assign({}, this.props, {
                value: value,
                valueChangeObs: this.valueChangeObs,
                rootValueChangeObs: this.context.rootValueChangeObs
                  ? this.context.rootValueChangeObs
                  : this.valueChangeObs,
                onChange: this.props.onChange != null
                  ? (newValue, sp) =>
                      this.props.onChange(
                        newValue,
                        sp !== undefined ? sp : statePath,
                      )
                  : (newValue, sp) =>
                      this.context.onStateChange(
                        newValue,
                        sp !== undefined ? sp : statePath,
                      ),
                statePath: statePath,
                getValue: root ? () => this.value : undefined,
              })}
              ref={elem => this.child = elem}
            />
          );
        } else {
          return (
            <WrappedComponent
              {...Object.assign({}, this.props, {
                statePath: statePath,
                getValue: root ? () => this.value : undefined,
              })}
              ref={elem => this.child = elem}
            />
          );
        }
      }
    }

    ProxiedState.defaultProps = Object.assign(
      {
        uncontrolled: false,
      },
      {
        name: (WrappedComponent.defaultProps &&
          WrappedComponent.defaultProps.name) ||
          undefined,
      },
    );

    ProxiedState.contextTypes = {
      statePath: React.PropTypes.string,
      completeStatePath: React.PropTypes.string,
      valueChangeObs: React.PropTypes.any,
      onStateChange: React.PropTypes.func,
      addHandler: React.PropTypes.func,
      uncontrolled: React.PropTypes.bool,
      rootValueChangeObs: React.PropTypes.any,
    };

    ProxiedState.childContextTypes = {
      statePath: React.PropTypes.string,
      completeStatePath: React.PropTypes.string,
      uncontrolled: React.PropTypes.bool,
    };

    return ProxiedState;
  };
}
