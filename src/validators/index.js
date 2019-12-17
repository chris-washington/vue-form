import validatorTypes from './validator-types';
import VueRxRequiredValidator from './required-validator';
import VueRxMinLengthValidator from './min-length-validator';
import VueRxMaxLengthValidator from './max-length-validator';
import VueRxMaxValidator from './max-validator';
import VueRxMinValidator from './min-validator';
import VueRxPatternValidator from './pattern-validator';

export default class VueRxFormValidator {
  static TYPES = validatorTypes;

  static createValidator(type, message, validationValue) {
    switch (type) {
      case VueRxFormValidator.TYPES.REQUIRED:
        return new VueRxRequiredValidator(message);
      case VueRxFormValidator.TYPES.MIN_LENGTH:
        return new VueRxMinLengthValidator(validationValue, message);
      case VueRxFormValidator.TYPES.MAX_LENGTH:
        return new VueRxMaxLengthValidator(validationValue, message);
      case VueRxFormValidator.TYPES.MAX:
        return new VueRxMaxValidator(validationValue, message);
      case VueRxFormValidator.TYPES.MIN:
        return new VueRxMinValidator(validationValue, message);
      case VueRxFormValidator.TYPES.PATTERN:
        return new VueRxPatternValidator(validationValue, message);
      default:
        throw new Error(`Unsupported validator type: ${type}`);
    }
  }
}
