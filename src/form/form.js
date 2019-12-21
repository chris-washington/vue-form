import { BehaviorSubject } from 'rxjs';
import {
  isNil,
  get,
  set,
  has,
  debounce,
} from 'lodash';
import VueRxFormValidator from '../validators';

export default class VueRxForm {
  get isDirty() {
    return this.dirty;
  }

  get isPristine() {
    return this.pristine;
  }

  get isValid() {
    return this.valid;
  }

  set isValid(valid) {
    this.valid = valid;
  }

  constructor(config) {
    this.clearForm = debounce(this.clearForm.bind(this), 100);
    this.formData = new BehaviorSubject();
    this.validators = {};
    this.config = config;
    this.errors = {};
    this.clearFormListener = new BehaviorSubject();
  }

  hasError(name) {
    return has(this.errors, name);
  }

  validate(name, value) {
    const trimmedValue = value.trim();
    const validators = get(this.getValidators(), name);
    let errors = {};

    for (let i = 0, { length } = validators; i < length; i += 1) {
      const validator = validators[i];
      const validatorErrors = {};
      if (!validator.validate(trimmedValue)) {
        validatorErrors[validator.type] = validator.getMessage();
      }

      const currentErrorMessage = validatorErrors[Object.keys(validatorErrors)[0]];

      if (validatorErrors && !isNil(currentErrorMessage)) {
        errors = Object.assign({}, errors, validatorErrors);
        if (isNil(errors.priorityMessage)) {
          errors.priorityMessage = currentErrorMessage;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      const errorObject = {};
      set(errorObject, name, errors);
      return Object.assign({}, this.errors, errorObject);
    }

    return this.errors;
  }

  clearForm() {
    this.clearFormListener.next(true);
  }

  getClearFormListener() {
    return this.clearFormListener.asObservable();
  }

  setSubmit(submitFunction) {
    this.onSubmit = submitFunction;
    return this;
  }

  getSubmit() {
    return this.onSubmit;
  }

  addValidator(key, dataValidator) {
    get(this.validators, key)
      .push(VueRxFormValidator.createValidator(
        dataValidator.type,
        dataValidator.message,
        dataValidator.validation,
      ));
  }

  setValidators(validators) {
    this.validators = {};

    const dataKeys = Object.keys(validators);

    for (let i = 0, iLength = dataKeys.length; i < iLength; i += 1) {
      const dataKey = dataKeys[i];
      const dataValidators = validators[dataKey];
      set(this.validators, dataKey, []);

      for (let j = 0, jLength = dataValidators.length; j < jLength; j += 1) {
        this.addValidator(dataKey, dataValidators[j]);
      }
    }

    return this;
  }

  getValidators() {
    return this.validators;
  }

  setFormData(formData) {
    Object.defineProperty(this, 'data', {
      get: () => formData,
      configurable: true,
    });

    this.formData.next(formData);

    return this;
  }

  getFormData() {
    return this.formData.asObservable();
  }
}
