import {
  isNil,
  uniqBy,
  get,
} from 'lodash-es';
import VueRxFormValidator from '../validators';

import getValidationErrorIfPresent from '../validators/validation-error';


export default class FieldValidator {
  constructor(el, name, validatorInfo) {
    this.el = el;
    this.name = name;
    this.validatorInfo = validatorInfo;
  }

  getValidatorInfo() {
    return this.validatorInfo;
  }

  setValidations(validators) {
    this.validators = [];
    const uniqueValidators = uniqBy(validators, 'type');

    for (let i = 0, { length } = validators; i < length; i += 1) {
      const validator = uniqueValidators[i];
      this.validators.push(VueRxFormValidator.createValidator(
        validator.type,
        validator.message,
        validator.validation,
        validator.options,
      ));
    }
  }

  initValidators() {
    const { validators } = this.validatorInfo;
    this.setValidations(validators);
  }

  getPriorityErrorMessage(index, errors) {
    if (!isNil(errors) && !isNil(index)) {
      return this.validators[index].getMessage();
    }

    return undefined;
  }

  checkIfRequired() {
    const requiredValidator = this.validators.find(validator => validator.type === 'required');

    if (isNil(requiredValidator)) {
      return true;
    }

    return requiredValidator.validationValue;
  }

  checkNotHasValueAndNotRequired(value) {
    return !this.checkIfRequired() && value === '';
  }

  shouldValidate(value) {
    return !(this.checkNotHasValueAndNotRequired(value));
  }

  isCheckedType() {
    return this.el.type === 'checkbox' || this.el.type === 'radio';
  }

  async validate() {
    const { component } = this.validatorInfo;

    await component.$nextTick();
    const value = get(component, this.el.dataset.dataName);

    let trimmedValue = value;

    if (typeof trimmedValue !== 'boolean') {
      trimmedValue = value ? value.trim() : '';
    }

    const { name } = this;

    const { validators } = this;

    let errors;
    let priorityIndex;

    if (!this.shouldValidate(trimmedValue)) {
      const result = {};
      result[name] = errors;
      this.el.errors = result;
      return result;
    }

    for (let i = 0, { length } = validators; i < length; i += 1) {
      const validator = validators[i];
      // eslint-disable-next-line no-await-in-loop
      const validatorErrors = await getValidationErrorIfPresent(validator, trimmedValue);

      if (!isNil(validatorErrors)) {
        errors = Object.assign({}, errors, validatorErrors);

        if (isNil(priorityIndex)) {
          priorityIndex = i;
        }
      }
    }


    if (!isNil(errors)) {
      errors.priorityMessage = this.getPriorityErrorMessage(priorityIndex, errors);
    }

    const result = {};
    result[name] = errors;
    this.el.errors = result;
    return result;
  }
}
