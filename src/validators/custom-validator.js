import BaseValidator from './base-validator';

export default class VueFormCustomValidator extends BaseValidator {
  constructor(type, message) {
    super(type, null, message, false);
  }

  getMessage() {
    return this.message;
  }
}
