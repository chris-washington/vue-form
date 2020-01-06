import { isNil } from 'lodash-es';

/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-bitwise */
export const isInclusiveEmpty = (value) => {
  let currentValue = value;

  if (typeof currentValue === 'string') {
    currentValue = currentValue.trim();
  }

  return currentValue === false
    || currentValue === ''
    || isNil(currentValue);
};

export const isNumber = value => typeof value === 'number';

export const throwIfNotTrue = (value, error) => {
  if (!value) {
    throw new Error(error);
  }
  return undefined;
};

export const isValidRange = value => Array.isArray(value)
  && isNumber(value[0])
  && isNumber(value[1]);
