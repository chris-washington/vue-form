import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxMaxValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.MAX, validationValue, message || defaultErrorMessages.max);
  }

  validate(value) {
    if (typeof value === 'number' && value <= this.validationValue) {
      return true;
    }

    return false;
  }

  getMessage() {
    return this.message;
  }
}
