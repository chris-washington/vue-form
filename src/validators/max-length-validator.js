import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxMaxLengthValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.MAX_LENGTH, validationValue, message || defaultErrorMessages.maxLength);
  }

  validate(value) {
    if (value && value.length <= this.validationValue) {
      return true;
    }

    return false;
  }

  getMessage() {
    return this.message;
  }
}
