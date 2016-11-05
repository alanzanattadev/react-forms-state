'use babel'
// @flow

import React from 'react';
import { fromJS } from "immutable";
import StateProxy from "./StateProxy";

function getImmutPath(path) {
  return path.split('.').map(p => isNaN(p) ? p : parseInt(p));
}

function getJavascriptEntity(obj) {
  if (typeof obj == "object" && obj.toJS)
    return obj.toJS();
  else
    return obj;
}

function getValue(state, path) {
  if (path == '')
    return getJavascriptEntity(state);
  else {
    return getJavascriptEntity(state.getIn(getImmutPath(path)));
  }
}

function getNewPath(immutState, statePath, name) {
  if (isArray(getValue(immutState, statePath))) {
    let index = getValue(immutState, statePath).findIndex(obj => obj.id == name);
    return `${statePath}${statePath.length > 0 ? '.' : ''}${index}.value`;
  } else {
    return `${statePath}${statePath.length > 0 ? '.' : ''}${name}`;
  }
}

function getChildren(comp) {
  return comp.props && comp.props.children ? comp.props.children : null;
}

function isMarked(comp) {
  return comp.props && ((comp.props._inputField && typeof comp.props.name == 'string' && comp.props.name.length > 0) || comp.props._dispatcher);
}

function isArray(comp) {
  return typeof comp == "object" && Array.isArray(comp);
}

function isNotParent(comp) {
  return comp == null || typeof comp == "string" || typeof comp == "number" || typeof comp == "function";
}

function dispatchOnProxy(rendered, state, onChange, statePath) {
  let immutState = fromJS(state);
  let newPath = getNewPath(immutState, statePath, rendered.props.name);
  return React.cloneElement(
    rendered,
    Object.assign({}, rendered.props, {
      onChange: value => onChange(immutState.setIn(getImmutPath(newPath), value).toJS()),
      value: getValue(immutState, newPath),
      statePath: newPath
    }),
    rendered.props._dispatcher ?
      getChildren(rendered) :
      enhance(getChildren(rendered), state, onChange, newPath)
  );
}

function enhance(rendered, state, onChange, statePath = '') {
  if (isNotParent(rendered))
    return rendered;
  else if (isArray(rendered))
    return React.Children.map(rendered, r => enhance(r, state, onChange, statePath));
  else if (isMarked(rendered)) {
    return dispatchOnProxy(rendered, state, onChange, statePath);
  } else {
    return React.cloneElement(
      rendered,
      rendered.props,
      enhance(getChildren(rendered), state, onChange, statePath)
    );
  }
}

export default function StateDispatcher(convertIn = v => v, convertOut = v => v) {
  return function(WrappedComponent) {
    class Dispatcher extends WrappedComponent {
      render() {
        let rendered = super.render();
        let enhanced = enhance(rendered, convertIn(this.props.value, this.props), v => this.props.onChange(convertOut(v, this.props)));
        return enhanced;
      }
    };

    Dispatcher.defaultProps = Object.assign({}, {
      onChange() {},
      value: {},
      _dispatcher: true,
    }, WrappedComponent.defaultProps);

    return Dispatcher
  };
};
