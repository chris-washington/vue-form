import { inRange } from "lodash-es";
import { isValidRange, throwIfNotTrue } from "../helpers/utils/operations";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VueRxRangeValidator extends BaseValidator {
  constructor(validationValue, message) {
    throwIfNotTrue(
      isValidRange(validationValue),
      `${validationValue.toString()} is not a proper range array.`
    );
    super(
      validatorTypes.MAX_LENGTH,
      validationValue,
      message || `${defaultErrorMessages.range} ${validationValue[0]} and ${validationValue[1]}.`
    );
  }

  validate(value) {
    const min = this.validationValue[0];
    const max = this.validationValue[1];

    return value && inRange(value.length, min, max);
  }

  getMessage() {
    return this.message;
  }
}
