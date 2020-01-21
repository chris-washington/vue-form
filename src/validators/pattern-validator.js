import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VRXPatternValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.PATTERN, validationValue, message || defaultErrorMessages.pattern);
    this.validatorRegex = new RegExp(this.validationValue);
  }

  validate(value) {
    return this.validatorRegex.test(value);
  }

  getMessage() {
    return this.message;
  }
}
