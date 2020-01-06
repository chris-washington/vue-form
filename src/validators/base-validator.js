import { isNil } from "lodash-es";

/**
 * @private
 * Extendible base validator that provides structure for all validators.
 * If a validator is not of instance BaseValidator an error will be thrown
 * on creation.
 */
export default class BaseValidator {
  /**
   *
   * @param {string} type - This is the unique name of the validator.
   *                      Used to identifiy error messages
   * @param {string|number|boolean} validationValue - What to validate against
   * @param {string} message - Sets the default message when the validation fails.
   * @param {boolean} validationValueRequired  - whether or not the `validationValue` is required.
   */
  constructor(type, validationValue, message, validationValueRequired = true) {
    if (validationValueRequired && isNil(validationValue)) {
      throw new Error(
        `You must provide a validationValue to validate by for the ${this.name} validator`
      );
    }

    this.validationValue = validationValue;
    this.message = message;

    Object.defineProperty(this, "type", {
      get: () => type,
      configurable: true
    });
  }

  /**
   * Validates the field. Must be overwritten
   *
   * @throws Will throw a no implementation error, if not overwritten
   */
  validate() {
    throw new Error(`You have to implement the method validate form ${this.constructor.name}`);
  }

  /**
   * Returns the specific message when a validation fails
   */
  getMessage() {
    throw new Error(`You have to implement the method getMessage for ${this.constructor.name}`);
  }
}
