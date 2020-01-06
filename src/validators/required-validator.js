import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';
import { isInclusiveEmpty } from '../helpers/utils/operations';

export default class VueRxRequiredValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(
      validatorTypes.REQUIRED,
      validationValue,
      message || defaultErrorMessages.required,
      false,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  validate(value) {
    const empty = isInclusiveEmpty(value);

    return !this.validationValue && !empty
      ? true
      : !empty;
  }

  getMessage() {
    return this.message;
  }
}
