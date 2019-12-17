import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxPatternValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.PATTERN, validationValue, message || defaultErrorMessages.pattern);
  }

  validate(value) {
    if (!new RegExp(this.validationValue).test(value)) {
      return { pattern: this.message };
    }

    return { pattern: undefined };
  }
}
