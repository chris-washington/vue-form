import { isString } from "lodash-es";
import validatorTypes from "./validator-types";
import VRXRequiredValidator from "./required-validator";
import VRXMinLengthValidator from "./min-length-validator";
import VRXMaxLengthValidator from "./max-length-validator";
import VRXMaxValidator from "./max-validator";
import VRXMinValidator from "./min-validator";
import VRXPatternValidator from "./pattern-validator";
import VRXFormCustomValidator from "./custom-validator";
import VRXRangeLengthValidator from "./range-length-validator";
import VRXRangeValidator from "./range-validator";

export default class VRXFormValidator {
  static TYPES = validatorTypes;

  static createValidator(type, message, validationValue, options) {
    if (isString(type)) {
      switch (type) {
        case VRXFormValidator.TYPES.REQUIRED:
          return new VRXRequiredValidator(validationValue, message);
        case VRXFormValidator.TYPES.MIN_LENGTH:
          return new VRXMinLengthValidator(validationValue, message);
        case VRXFormValidator.TYPES.MAX_LENGTH:
          return new VRXMaxLengthValidator(validationValue, message);
        case VRXFormValidator.TYPES.MAX:
          return new VRXMaxValidator(validationValue, message);
        case VRXFormValidator.TYPES.MIN:
          return new VRXMinValidator(validationValue, message);
        case VRXFormValidator.TYPES.PATTERN:
          return new VRXPatternValidator(validationValue, message);
        case VRXFormValidator.TYPES.RANGE:
          return new VRXRangeValidator(validationValue, message);
        case VRXFormValidator.TYPES.RANGE_LENGTH:
          return new VRXRangeLengthValidator(validationValue, message);
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
