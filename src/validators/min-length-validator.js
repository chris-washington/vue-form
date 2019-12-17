import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxMinLengthValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.MIN_LENGTH, validationValue, message || defaultErrorMessages.minLength);
  }

  validate(value) {
    if (value && value.length >= this.validationValue) {
      return { minLength: undefined };
    }

    return { minLength: this.message };
  }
}
