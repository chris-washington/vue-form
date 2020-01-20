import { inRange } from "lodash-es";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VRXMinLengthValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(
      validatorTypes.MIN_LENGTH,
      validationValue,
      message || `${defaultErrorMessages.minLength} ${validationValue}.`
    );
  }

  validate(value) {
    return value && inRange(value.length, this.validationValue, Infinity);
  }

  getMessage() {
    return this.message;
  }
}
