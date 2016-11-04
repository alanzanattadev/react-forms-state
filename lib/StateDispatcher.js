'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";
import StateProxy from "./StateProxy";

function getImmutPath(path) {
  return path.split('.').map(p => isNaN(p) ? p : parseInt(p));
}

function getValue(state, path) {
  return path == '' ? state : state.getIn(getImmutPath(path));
}

function dispatchOnProxy(rendered, state, onChange, statePath) {
  let immutState = fromJS(state);
  let newPath;
  if (typeof getValue(immutState, statePath) == "object" && Array.isArray(getValue(immutState, statePath).toJS())) {
    let index = getValue(immutState, statePath).findIndex(obj => obj.get('id') == rendered.props.name);
    newPath = `${statePath}${statePath.length > 0 ? '.' : ''}${index}.value`;
  } else {
    newPath = `${statePath}${statePath.length > 0 ? '.' : ''}${rendered.props.name}`;
  }
  return React.cloneElement(
    rendered,
    Object.assign({}, rendered.props, {
      onChange: value => onChange(immutState.setIn(getImmutPath(newPath), value).toJS()),
      value: immutState.getIn(getImmutPath(newPath)),
      statePath: newPath
    }),
    enhance(rendered.props.children, state, onChange, newPath)
  );
}

function enhance(rendered, state, onChange, statePath = '') {
  if (rendered == null)
    return rendered;
  else if (typeof rendered == "object" && Array.isArray(rendered))
    return rendered.map(r => enhance(r, state, onChange, statePath));
  else if (rendered.props._inputField && typeof rendered.props.name == 'string' && rendered.props.name.length > 0) {
    return dispatchOnProxy(rendered, state, onChange, statePath);
  } else {
    return React.cloneElement(
      rendered,
      rendered.props,
      enhance(rendered.props.children, state, onChange, statePath)
    );
  }
}

export default function StateDispatcher() {
  return function(WrappedComponent) {
    class Dispatcher extends WrappedComponent {
      render() {
        let rendered = super.render();
        let enhanced = enhance(rendered, this.props.value, this.props.onChange.bind(this));
        return enhanced;
      }
    };

    Dispatcher.defaultProps = {
      onChange() {},
      value: {},
    };

    return Dispatcher
  };
};
