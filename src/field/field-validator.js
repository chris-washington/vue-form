import { isNil, uniqBy, get, isBoolean } from "lodash-es";
import VRXFormValidator from "../validators";

import getValidationErrorIfPresent from "../validators/validation-error";

function FieldValidator(el, name, validatorInfo) {
  this.el = el;
  this.name = name;
  this.validatorInfo = validatorInfo;
}

FieldValidator.prototype = {
  getValidatorInfo() {
    return this.validatorInfo;
  },

  setValidations(validators) {
    this.validators = [];
    const uniqueValidators = uniqBy(validators, "type");
    for (let i = validators.length; i--; ) {
      const { type, message, validation, options } = uniqueValidators[i];

      this.validators[i] = VRXFormValidator.createValidator(type, message, validation, options);
    }
  },

  initValidators() {
    const { validators } = this.validatorInfo;
    this.setValidations(validators);
  },

  getPriorityErrorMessage(index, errors) {
    if (!isNil(errors) && !isNil(index)) {
      return this.validators[index].getMessage();
    }

    return undefined;
  },

  checkIfRequired() {
    const requiredValidator = this.validators.find(validator => validator.type === "required");

    if (isNil(requiredValidator)) {
      return true;
    }

    return requiredValidator.validationValue;
  },

  checkNotHasValueAndNotRequired(value) {
    return !this.checkIfRequired() && value === "";
  },

  shouldValidate(value) {
    return !this.checkNotHasValueAndNotRequired(value);
  },

  isCheckedType() {
    return this.el.type === "checkbox" || this.el.type === "radio";
  },

  getTrimmedValue(value) {
    let trimmedValue;

    if (!isBoolean(value)) {
      trimmedValue = value.trim();
    }

    return trimmedValue || value;
  },

  async validate() {
    let errors;
    let priorityIndex;

    const value = this.getTrimmedValue(
      get(this.validatorInfo.component, this.el.dataset.dataName) || ""
    );

    const { validators } = this;

    if (!this.shouldValidate(value)) {
      this.el.errors = errors;
      return errors;
    }

    for (let i = validators.length; i--; ) {
      const validator = validators[i];
      // eslint-disable-next-line no-await-in-loop
      const validatorErrors = await getValidationErrorIfPresent(validator, value);

      if (!isNil(validatorErrors)) {
        errors = { ...errors, ...validatorErrors };
        priorityIndex = i;
      }
    }

    if (!isNil(errors)) {
      errors.priorityMessage = this.getPriorityErrorMessage(priorityIndex, errors);
    }

    this.el.errors = errors;
    return errors;
  }
};

export default FieldValidator;
