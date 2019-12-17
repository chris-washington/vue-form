import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxRequiredValidator extends BaseValidator {
  constructor(message) {
    super(validatorTypes.REQUIRED, undefined, message || defaultErrorMessages.required, false);
  }

  validate(value) {
    if (value === null || value === undefined || value.trim() === '') {
      return { required: this.message };
    }

    return { required: undefined };
  }
}
