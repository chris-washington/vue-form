import BaseValidator from "./base-validator";

/**
 * @class
 * @classdesc Extendible class for creating custom validations
 *            that can be shared across a Vue project.
 */
export default class VRXFormCustomValidator extends BaseValidator {
  /**
   *
   * @param {string} type - This is the unique name of the validator.
   *                        Used to identifiy error messages
   * @param {string} message - Sets the default message when the validation fails.
   */
  constructor(type, message, options) {
    super(type, null, message, false);
    this.options = options;
  }

  /**
   * Returns the set message on initialization
   */
  getMessage() {
    return this.message;
  }
}
