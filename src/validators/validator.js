import { isNil } from "lodash-es";

/**
 *
 * @param {string} type - This is the unique name of the validator.
 *                      Used to identifiy error messages
 * @param {string|number|boolean} validationValue - What to validate against
 * @param {string} message - Sets the default message when the validation fails.
 * @param {boolean} validationValueRequired  - whether or not the `validationValue` is required.
 */
function VRXValidator(type, validationValue, message) {
  this.preCheck(validationValue);
  if (isNil(validationValue)) {
    throw new Error(
      `You must provide a 'validation' property to validate against for the ${this.constructor.name} validator`
    );
  }

  this.validationValue = validationValue;
  this.message = message;

  Object.defineProperty(this, "type", {
    value: type,
    writable: false
  });
}

VRXValidator.prototype = {
  preCheck() {},
  validate() {},
  /**
   * Returns the specific message when a validation fails
   */
  getMessage() {
    return this.message;
  }
};

export default VRXValidator;
