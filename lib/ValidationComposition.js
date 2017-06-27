// @flow

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
  { errorString = "too long", max }: { errorString?: string, max: number } = {},
) {
  return function validateMaxLength(value: mixed) {
    if (typeof value !== "string" || value.length > max) {
      return errorString;
    } else {
      return true;
    }
  };
}
