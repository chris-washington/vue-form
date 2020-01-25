import { isString } from "lodash-es";
import createMixin from "./create-mixin";
import validatorTypes from "./validator-types";
import requiredMixin from "./required-validator";
import minLengthMixin from "./min-length-validator";
import maxLengthMixin from "./max-length-validator";
import maxMixin from "./max-validator";
import minMixin from "./min-validator";
import patternMixin from "./pattern-validator";
import VRXFormCustomValidator from "./custom-validator";
import rangeLengthMixin from "./range-length-validator";
import rangeMixin from "./range-validator";
import defaultErrorMessages from "./default-messages";

export default class VRXFormValidator {
  static TYPES = validatorTypes;

  static createValidator(type, message, validationValue, options) {
    if (isString(type)) {
      switch (type) {
        case "required":
          return createMixin(
            requiredMixin,
            "required",
            validationValue,
            message || defaultErrorMessages.required
          );
        case "minLength":
          return createMixin(
            minLengthMixin,
            "minLength",
            validationValue,
            message || defaultErrorMessages.minLength
          );
        case "maxLength":
          return createMixin(
            maxLengthMixin,
            "maxLength",
            validationValue,
            message || defaultErrorMessages.maxLength
          );
        case "max":
          return createMixin(maxMixin, "max", validationValue, message || defaultErrorMessages.max);
        case "min":
          return createMixin(minMixin, "min", validationValue, message || defaultErrorMessages.min);
        case "pattern":
          return createMixin(
            patternMixin,
            "pattern",
            validationValue,
            message || defaultErrorMessages.pattern
          );
        case "range":
          return createMixin(
            rangeMixin,
            "range",
            validationValue,
            message || defaultErrorMessages.range
          );
        case "rangeLength":
          return createMixin(
            rangeLengthMixin,
            "rangeLength",
            validationValue,
            message || defaultErrorMessages.rangeLength
          );
        default:
          throw new Error(`Unsupported validator type: ${type}`);
      }
    }

    if (type.prototype instanceof VRXFormCustomValidator) {
      return new type(message, options);
    }

    throw new Error(
      `Unsupported custom validator type. Must extend VRXFormCustomValidator: ${type.toString()}`
    );
  }
}
