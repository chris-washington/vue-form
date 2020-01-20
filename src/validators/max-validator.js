import { isFinite, toNumber } from "lodash-es";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VRXMaxValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(
      validatorTypes.MAX,
      validationValue,
      message || `${defaultErrorMessages.max} ${validationValue}.`
    );
  }

  validate(value) {
    const numberValue = toNumber(value);
    return isFinite(numberValue) && value <= this.validationValue;
  }

  getMessage() {
    return this.message;
  }
}
