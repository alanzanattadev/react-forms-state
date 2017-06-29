// @flow

import { fromJS } from "immutable";

export function notNull(
  { errorString = "Not filled" }: { errorString?: string } = {},
) {
  return function validateNotNull(value: mixed) {
    if (value === null) {
      return errorString;
    } else {
      return true;
    }
  };
}

export function notUndefined(
  { errorString = "not filled" }: { errorString?: string } = {},
) {
  return function validateNotUndefined(value: mixed) {
    if (value === undefined) {
      return errorString;
    } else {
      return true;
    }
  };
}

export function notEmpty(
  { errorString = "not filled" }: { errorString?: string } = {},
) {
  return function validateNotEmpty(value: mixed) {
    if (value === "") {
      return errorString;
    } else {
      return true;
    }
  };
}

export function composeValidation(...validates) {
  return function validateValue(value: mixed, props: Object) {
    return validates.reduce((red, validate) => {
      if (red !== true) return red;
      const validated = validate(value, props);
      if (validated === true) return true;
      else return validated;
    }, true);
  };
}

export function required(
  { errorString = "not filled" }: { errorString?: string } = {},
) {
  return composeValidation(
    notUndefined({ errorString }),
    notNull({ errorString }),
    notEmpty({ errorString }),
  );
}

export function isTrue(
  { errorString = "not true" }: { errorString?: string } = {},
) {
  return function validateTrue(value: mixed) {
    if (value !== true) {
      return errorString;
    } else {
      return true;
    }
  };
}

export function maxLength(
  max: number,
  { errorString = "too long" }: { errorString?: string } = {},
) {
  return function validateMaxLength(value: mixed) {
    if (typeof value !== "string" || value.length > max) {
      return errorString;
    } else {
      return true;
    }
  };
}

export function lessThan(
  accessor1: (value: mixed, props: Object) => mixed | string,
  accessor2: (value: mixed, props: Object) => mixed | string,
  { errorString = "Invalid" }: { errorString?: string } = {},
) {
  return function validateLessThan(value: mixed, props: Object) {
    if (
      (typeof accessor1 !== "function" && typeof accessor1 !== "string") ||
      (typeof accessor2 !== "function" && typeof accessor2 !== "string")
    )
      throw new Error(
        "lessThan validator takes either a function or a stringPath as accessor type",
      );
    const value1 = typeof accessor1 === "function"
      ? accessor1(value, props)
      : fromJS(value).getIn(accessor1.split("."));
    const value2 = typeof accessor2 === "function"
      ? accessor2(value, props)
      : fromJS(value).getIn(accessor2.split("."));
    // $FlowFixMe
    if (value1 > value2) {
      return errorString;
    } else {
      return true;
    }
  };
}
