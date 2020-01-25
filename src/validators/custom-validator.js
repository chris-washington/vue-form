/**
 * @class
 * @classdesc Extendible class for creating custom validations
 *            that can be shared across a Vue project.
 */
function VRXFormCustomValidator(type, message, options) {
  this.type = type;
  this.message = message;
  this.options = options;
}

VRXFormCustomValidator.prototype = {
  /**
   * Validates the field. Must be overwritten
   *
   * @throws Will throw a no implementation error, if not overwritten
   */
  validate() {
    throw new Error(`You have to implement the method "validate" for ${this.constructor.name}`);
  },

  /**
   * Returns the set message on initialization
   */
  getMessage() {
    return this.message;
  }
};

export default VRXFormCustomValidator;
