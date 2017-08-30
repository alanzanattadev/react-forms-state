"use babel";
// @flow

import { Validation } from "./ValidationHelpers";

export const VALUE_CHANGE_EVENT_TYPE = "VALUE_CHANGE";
export const INITIAL_CHANGE_EVENT_TYPE = "INITIAL_CHANGE";
export const SUBMIT_EVENT_TYPE = "SUBMIT";
export const VALIDATION_FAILED_EVENT_TYPE = "VALIDATION_FAILED";

export type ValueChangeEventType = {
  type: typeof VALUE_CHANGE_EVENT_TYPE,
  newValue: any,
  statePath: string,
  validation: Validation,
};

export function createValueChangeEvent(
  newValue: any,
  statePath: string,
  validation: Validation,
): ValueChangeEventType {
  return {
    type: VALUE_CHANGE_EVENT_TYPE,
    newValue,
    statePath,
    validation,
  };
}

export type InitialChangeEventType = {
  type: typeof INITIAL_CHANGE_EVENT_TYPE,
  newValue: any,
  validation?: Validation,
};

export function createInitialChangeEvent(
  newInitial: any,
): InitialChangeEventType {
  return {
    type: INITIAL_CHANGE_EVENT_TYPE,
    newValue: newInitial,
  };
}

export type SubmitChangeEventType = {
  type: typeof SUBMIT_EVENT_TYPE,
};

export function createSubmitChangeEvent(): SubmitChangeEventType {
  return {
    type: SUBMIT_EVENT_TYPE,
  };
}

export type ValidationFailedEventType = {
  type: typeof VALIDATION_FAILED_EVENT_TYPE,
  validation: Validation,
};

export function createValidationFailedEvent(
  validation: Validation,
): ValidationFailedEventType {
  return {
    type: VALIDATION_FAILED_EVENT_TYPE,
    validation: validation,
  };
}

export type FormEvent =
  | ValueChangeEventType
  | InitialChangeEventType
  | SubmitChangeEventType
  | ValidationFailedEventType;
