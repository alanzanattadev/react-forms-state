"use babel";
// @flow
import React from "react";
import {
  INITIAL_CHANGE_EVENT_TYPE,
  VALIDATION_FAILED_EVENT_TYPE,
} from "./FormEvents";
import Rx from "rxjs";
import PropTypes from "prop-types";
import { getValue } from "./StateValueHelpers";

const NeverObservable = Rx.Observable.never();

export default class FormWatcher extends React.Component<
  DefaultProps,
  Props,
  State,
> {
  state: State;
  props: Props;
  watchPath: string;
  valueChangeObs: Rx.Observable;
  subscription: Rx.Subscription;
  static defaultProps: DefaultProps;

  constructor(props: Props, context: Context) {
    super(props);

    this.state = {
      value: null,
      validation: true,
    };

    this.watchPath = this.getWatchedPath(props, context);
    if (this.watchPath == null) {
      throw new Error(
        "watchPath props is not set on FormWatcher, you have to set a statepath string on which the FormWatcher will watch",
      );
    }
    this.selectObs(props, context);
  }

  getAssignedObs(props: Props, context: Context): Rx.Observable<any> {
    if (context.rootValueChangeObs != null) return context.rootValueChangeObs;
    else return NeverObservable;
  }

  selectObs(props: Props, context: Context) {
    this.valueChangeObs = this.getAssignedObs(props, context).filter(e => {
      if (props.__debug) {
        console.log("FILTERING", e, "In watcher", this.watchPath);
      }
      if (e.statePath)
        return (
          this.watchPath.startsWith(e.statePath) ||
          e.statePath.startsWith(this.watchPath)
        );
      else if (e.type === INITIAL_CHANGE_EVENT_TYPE) return true;
      else if (e.type === VALIDATION_FAILED_EVENT_TYPE) return true;
      else return false;
    });
  }

  connectsToFormController() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.valueChangeObs.subscribe(e => {
      this.setState({
        value: e.value,
        validation: e.validation,
      });
    });
  }

  getWatchedPath(props: Props, context: Context): string {
    return typeof props.watchPath === "function"
      ? props.watchPath(context.completeStatePath || "")
      : props.watchPath;
  }

  componentDidMount() {
    this.connectsToFormController();
  }

  componentWillReceiveProps(nextProps: Props, nextContext: Context) {
    if (this.valueChangeObs !== this.getAssignedObs(nextProps, nextContext)) {
      this.selectObs(nextProps, nextContext);
      this.connectsToFormController();
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  render() {
    if (typeof this.props.children !== "function")
      throw new Error(
        "children of FormWatcher must be a function of type (stateValue, props) => React$element",
      );
    const watchedValidation =
      typeof this.state.validation === "object" &&
      this.state.validation !== null
        ? this.state.validation.getNestedValidation(this.watchPath)
        : this.state.validation;
    return this.props.children(
      {
        value: this.state.value,
        watchedValue: getValue(
          this.state.value,
          this.getWatchedPath(this.props, this.context),
        ),
        watchedStatePath: this.watchPath,
        validation: this.state.validation,
        watchedValidation,
      },
      this.props,
    );
  }
}

FormWatcher.propTypes = {};

FormWatcher.defaultProps = {
  __debug: false,
};

FormWatcher.contextTypes = {
  rootValueChangeObs: PropTypes.any,
  completeStatePath: PropTypes.string,
};

type DefaultProps = {
  __debug: false,
};

type Props = {
  watchPath: string | ((path: string) => string),
  __debug?: boolean,
  children: (
    values: {
      value: ?any,
      watchedValue: ?any,
      watchedStatePath: string,
      validation: any,
      watchedValidation: any,
    },
    props: Object,
  ) => React$Element<any>,
};

type State = {
  value: any,
  validation: any,
};

type Context = {
  completeStatePath?: string,
  rootValueChangeObs: Rx.Observable,
};
