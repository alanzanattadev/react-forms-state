"use babel";
// @flow

export function getImmutPath(path: string): Array<string | number> {
  if (path == "") return [];
  return path.split(".").map(p => isNaN(p) ? p : parseInt(p));
}

export function getNewPath(
  immutState: Object,
  statePath: string,
  name: string,
): string {
  if (isArray(getValue(immutState, statePath))) {
    let index = getValue(immutState, statePath).findIndex(
      obj => obj.id == name,
    );
    return `${statePath}${statePath.length > 0 ? "." : ""}${index}.value`;
  } else {
    return `${statePath}${statePath.length > 0 ? "." : ""}${name}`;
  }
}
