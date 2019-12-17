import { BehaviorSubject } from 'rxjs';
import { isNil, get, set } from 'lodash';
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
    this.formData = new BehaviorSubject();
    this.validators = {};
    this.config = config;
    this.errors = {};
  }

  validate(name, value) {
    const trimmedValue = value.trim();
    const validators = get(this.getValidators(), name);
    let errors = {};

    validators.forEach((validator) => {
      const validatorErrors = validator.validate(trimmedValue);
      const currentErrorMessage = validatorErrors[Object.keys(validatorErrors)[0]];

      if (validatorErrors && !isNil(currentErrorMessage)) {
        errors = Object.assign({}, errors, validatorErrors);
        if (isNil(errors.priorityMessage)) {
          errors.priorityMessage = currentErrorMessage;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      const errorObject = {};
      set(errorObject, name, errors);
      return Object.assign({}, this.errors, errorObject);
    }

    return this.errors;
  }

  addValidator(dataKey, dataValidator) {
    get(this.validators, dataKey)
      .push(VueRxFormValidator.createValidator(
        dataValidator.type,
        dataValidator.message,
        dataValidator.validation,
      ));
  }

  setValidators(validators) {
    this.validators = {};

    const dataKeys = Object.keys(validators);

    for (let i = 0; i < dataKeys.length; i += 1) {
      const dataKey = dataKeys[i];
      const dataValidators = validators[dataKey];
      set(this.validators, dataKey, []);

      for (let j = 0; j < dataValidators.length; j += 1) {
        this.addValidator(dataKey, dataValidators[j]);
      }
    }

    return this;
  }

  getValidators() {
    return this.validators;
  }

  setFormData(formData) {
    this.formData.next(formData);

    return this;
  }

  getFormData() {
    return this.formData.asObservable();
  }
}
