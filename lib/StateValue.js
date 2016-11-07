import { fromJS } from "immutable";

function getImmutPath(path) {
  return path.split('.').map(p => isNaN(p) ? p : parseInt(p));
}

function getJavascriptEntity(obj) {
  if (typeof obj == "object" && obj.toJS)
    return obj.toJS();
  else
    return obj;
}

function getImmutableEntity(obj) {
  if (typeof obj == "object" && obj.toJS)
    return obj;
  else if (typeof obj == 'object')
    return fromJS(obj);
  else
    return obj;
}

export function getValue(state, path) {
  if (path == '')
    return getJavascriptEntity(state);
  else {
    if (typeof state == 'object') {
      let value = getImmutableEntity(state).getIn(getImmutPath(path));
      return getJavascriptEntity(value);
    } else
      return state;
  }
}

export function setValue(state, path, value) {
  if (path == '')
    return value;
  else {
    let immutState = fromJS(state);
    return immutState.setIn(getImmutPath(path), value).toJS();
  }
}

export function getNewPath(immutState, statePath, name) {
  if (isArray(getValue(immutState, statePath))) {
    let index = getValue(immutState, statePath).findIndex(obj => obj.id == name);
    return `${statePath}${statePath.length > 0 ? '.' : ''}${index}.value`;
  } else {
    return `${statePath}${statePath.length > 0 ? '.' : ''}${name}`;
  }
}
