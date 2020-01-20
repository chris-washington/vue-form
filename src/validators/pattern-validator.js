import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VRXPatternValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(validatorTypes.PATTERN, validationValue, message || defaultErrorMessages.pattern);
  }

  validate(value) {
    return String(value).match(this.validationValue);
  }

  getMessage() {
    return this.message;
  }
}
