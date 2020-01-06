import { inRange } from "lodash-es";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VueRxMaxValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(
      validatorTypes.MAX,
      validationValue,
      message || `${defaultErrorMessages.max} ${validationValue}.`
    );
  }

  validate(value) {
    const numberValue = Number(value);
    return typeof numberValue === "number" && inRange(value, 0, this.validationValue);
  }

  getMessage() {
    return this.message;
  }
}
