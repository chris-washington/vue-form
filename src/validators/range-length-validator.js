import { inRange } from "lodash-es";
import { isValidRange, throwIfNotTrue, isInclusiveEmpty } from "../helpers/utils/operations";
import BaseValidator from "./base-validator";
import defaultErrorMessages from "./default-messages";
import validatorTypes from "./validator-types";

export default class VueRxRangeLengthValidator extends BaseValidator {
  constructor(validationValue, message) {
    throwIfNotTrue(
      isValidRange(validationValue),
      `${validationValue.toString()} is not a proper range array.`
    );

    super(
      validatorTypes.RANGE_LENGTH,
      validationValue,
      message ||
        `${defaultErrorMessages.rangeLength} ${validationValue[0]} and ${validationValue[1]}.`
    );
  }

  validate(value) {
    const min = this.validationValue[0];
    const max = this.validationValue[1] + 1;
    const empty = isInclusiveEmpty(value);
    if (empty) return false;

    return inRange(value.length, min, max);
  }

  getMessage() {
    return this.message;
  }
}
