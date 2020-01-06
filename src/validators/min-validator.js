import { inRange } from 'lodash-es';
import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxMinValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.MIN, validationValue, message || `${defaultErrorMessages.min} ${validationValue}.`);
  }

  validate(value) {
    const numberValue = Number(value);
    return typeof numberValue === 'number' && inRange(numberValue, this.validationValue, Infinity);
  }

  getMessage() {
    return this.message;
  }
}
