/**
 * Valid built in validations
 * @typedef {Object} VRXFormValidatorType
 * @property {string} REQUIRED - use the `required` validator.
 * @property {string} PATTERN - use the `pattern` validator.
 * @property {string} MAX_LENGTH - use the `max length` validator.
 * @property {string} MIN_LENGTH - use the `min length` validator.
 * @property {string} MIN - use the `min` validator.
 * @property {string} MAX - use the `max` validator.
 */

export default Object.freeze({
  REQUIRED: "required",
  PATTERN: "pattern",
  MAX_LENGTH: "maxLength",
  MIN_LENGTH: "minLength",
  MIN: "min",
  MAX: "max",
  RANGE_LENGTH: "rangeLength",
  RANGE: "range"
});
