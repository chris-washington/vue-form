import { isNil } from "lodash-es";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VRXMaxLengthValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(
      validatorTypes.MAX_LENGTH,
      validationValue,
      message || `${defaultErrorMessages.maxLength} ${validationValue}.`
    );
  }

  validate(value) {
    return isNil(value) || value.length <= this.validationValue;
  }

  getMessage() {
    return this.message;
  }
}
