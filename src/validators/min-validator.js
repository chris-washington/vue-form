import { isFinite, toNumber } from "lodash-es";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VueRxMinValidator extends BaseValidator {
  constructor(validationValue, message) {
    super(
      validatorTypes.MIN,
      validationValue,
      message || `${defaultErrorMessages.min} ${validationValue}.`
    );
  }

  validate(value) {
    const numberValue = toNumber(value);
    return isFinite(numberValue) && numberValue >= this.validationValue;
  }

  getMessage() {
    return this.message;
  }
}
