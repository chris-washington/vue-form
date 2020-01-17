import { isNil, isString } from "lodash-es";

export const isInclusiveEmpty = value => {
  const currentValue = isString(value) ? value.trim() : value;
  return currentValue === false || currentValue === "" || isNil(currentValue);
};

export const throwIfNotTrue = (value, error) => {
  if (!value) {
    throw new Error(error);
  }
  return undefined;
};

export const isValidRange = value =>
  Array.isArray(value) &&
  value.length === 2 &&
  !isNaN(value[0]) &&
  !isNaN(value[1]) &&
  value[0] < value[1];

export const removeSubscriptions = el => {
  if (!isNil(el.eventSubscriptions)) {
    for (let i = el.eventSubscriptions.length; i--; ) {
      el.eventSubscriptions[i].unsubscribe();
    }
  }
};

export const addSubscription = (el, subscription) => {
  el.eventSubscriptions = [...(el.eventSubscriptions || []), subscription];
};

export const getModelDirective = vnode => {
  if (!isNil(vnode.data)) {
    if (!isNil(vnode.data.directives)) {
      return vnode.data.directives.find(directive => directive.name === "model");
    }

    return vnode.data.model;
  }
  return undefined;
};

export const constructValidationMessage = (result, validator) => {
  if (result === false) {
    const { type } = validator;
    const message = validator.getMessage();
    const error = {};
    error[type] = message;
    return error;
  }

  return undefined;
};
