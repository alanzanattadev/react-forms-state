'use babel'
// @flow

import React from 'react';
import { fromJS, is } from "immutable";

export default function FormController(
  applyControl = state => state,
  convertIn = (value, props) => value,
  convertOut = (value, props) => value
): () => React.Component<any, any, any> {
  return function(WrappedComponent: React.Component<any, any, any>): React.Component<any, any, any> {
    class Controller extends React.Component {
      constructor(props) {
        super();
        this.state = this._getInitialValue(props);
        this.rootDispatcherGetter = null;
      }

      componentWillReceiveProps(nextProps) {
        if (!is(fromJS(this._getInitialValue(nextProps)), fromJS(this._getInitialValue(this.props))))
          this.setState(this._getInitialValue(nextProps));
      }

      _getInitialValue(props) {
        let v = typeof props.initial != 'function' ? props.initial : props.initial(props);
        return convertIn(v, this.props);
      }

      _mergeValues() {
        return fromJS(this.state).mergeDeep(this.rootDispatcherGetter ? fromJS(this.rootDispatcherGetter()) : fromJS({}));
      }

      _submit() {
        let newValue = this._mergeValues();
        if (!is(newValue, fromJS(this._getInitialValue(this.props)))) {
          this.props.onSubmit(convertOut(newValue.toJS(), this.props));
        }
      }

      getChildContext() {
        return {
          attachToController: (getter) => {
            this.rootDispatcherGetter = getter;
          },
        };
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            onChange={value => this.setState(applyControl(value, this.props))}
            value={this.state}
            onSubmit={() => this._submit()}
          />
        );
      }
    };

    Controller.childContextTypes = {
      attachToController: React.PropTypes.func,
    };

    return Controller;
  };
}
