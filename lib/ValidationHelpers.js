"use babel";
// @flow

import { fromJS } from "immutable";
import { getJavascriptEntity } from './StateValueHelpers';
import { getImmutPath } from './StatePathHelpers';

export type ValidationError = string;
export type ValidationInfo =
  { [key: string | number]: ValidationInfo }
  | ValidationError
  | boolean;

function setErrorForFieldAt(
  infos: ValidationInfo,
  statePath: string,
  error: ?string,
): ValidationInfo {
  if (statePath == "" || infos == null || typeof infos != "object") {
    return infos;
  } else {
    return fromJS(infos).setIn(getImmutPath(statePath), error).toJS();
  }
}

function removeErrorForFieldAt(
  infos: ValidationInfo,
  statePath: string,
): ValidationInfo {
  return setErrorForFieldAt(infos, statePath, null);
}

export class Validation {
  infos: ValidationInfo;

  constructor(infos: ValidationInfo = {}) {
    this.infos = infos;
  }

  setErrorForFieldAt(statePath: string, error: string): Validation {
    return new Validation(setErrorForFieldAt(this.infos, statePath, error));
  }

  removeErrorForFieldAt(statePath: string): Validation {
    return new Validation(removeErrorForFieldAt(this.infos, statePath));
  }

  getErrorForFieldAt(statePath: string): ?ValidationError {
    if (statePath == "")
      return getJavascriptEntity(this.infos);
    else {
      if (typeof this.infos === "object") {
        let valuePath = getImmutPath(statePath);
        return valuePath.reduce(
          (red, value, i) => {
            if (red !== undefined && red !== null && typeof red == 'object') {
              return red[value];
            } else {
              return red;
            }
          },
          this.infos,
        );
      } else
        return this.infos;
    }
  }
}
