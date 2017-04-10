"use babel";
// @flow

import { fromJS } from "immutable";
import { getImmutPath } from "./StatePathHelpers";

export function getJavascriptEntity(obj: any): any {
  if (obj && typeof obj == "object" && obj.toJS) return obj.toJS();
  else return obj;
}

export function getImmutableEntity(obj: any): any {
  if (obj && typeof obj == "object" && obj.toJS) return obj;
  else if (typeof obj == "object") return fromJS(obj);
  else return obj;
}

export function getValue(state: Object, path: string): any {
  if (path == "")
    return getJavascriptEntity(state);
  else {
    if (typeof state == "object") {
      let valuePath = getImmutPath(path);
      return valuePath.reduce(
        (red, value, i) => {
          if (red !== undefined && red !== null) {
            return red[value];
          } else {
            return red;
          }
        },
        state,
      );
    } else
      return state;
  }
}

export function setValue(state?: Object, path: string, value: any): Object {
  if (path == "")
    return value;
  else {
    let immutState = fromJS(state);
    if (
      global.process &&
      global.process.env &&
      global.process.env.FORMALIZR_ENV === "DEBUG"
    )
      console.log(state, path, value, immutState);
    const newState = immutState
      ? immutState.setIn(getImmutPath(path), value).toJS()
      : immutState;
    return newState;
  }
}
