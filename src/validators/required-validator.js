import { isNil } from 'lodash';
import BaseValidator from './base-validator';
import defaultErrorMessages from './default-messages';
import validatorTypes from './validator-types';

export default class VueRxRequiredValidator extends BaseValidator {
  constructor(message) {
    super(validatorTypes.REQUIRED, undefined, message || defaultErrorMessages.required, false);
  }

  // eslint-disable-next-line class-methods-use-this
  validate(value) {
    return !(isNil(value) || value.trim() === '');
  }

  getMessage() {
    return this.message;
  }
}
