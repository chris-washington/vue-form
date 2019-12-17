import { isNil } from 'lodash';

export default class BaseValidator {
  constructor(type, validationValue, message, valueRequired = true) {
    if (valueRequired && isNil(validationValue)) {
      throw new Error(`You must provide a validationValue to validate by for the ${this.name} validator`);
    }

    this.validationValue = validationValue;
    this.message = message;

    Object.defineProperty(this, 'type', {
      get: () => type,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validate() {
    throw new Error('You have to implement the method validate!');
  }

  setMessage(message) {
    this.message = message;
  }

  setValidationValue(validationValue) {
    this.validationValue = validationValue;
  }
}
