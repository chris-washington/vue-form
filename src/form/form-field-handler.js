import {
  get,
  isNil,
} from 'lodash-es';

import FieldHandler from '../field/field-handler';

export default class FormFieldHandler {
  constructor(el, form, formEventHandler, component) {
    this.form = form;
    this.el = el;
    this.formEventHandler = formEventHandler;
    this.component = component;
  }

  getFieldValidatorInfo(name, validators, dataName) {
    const handleFieldInput = this.formEventHandler.getBoundInputEventFunction();
    const handleFieldBlur = this.formEventHandler.getBoundBlurEventFunction();
    const inputEvent = this.el.dataset.inputEvent || 'input';
    const { component } = this;
    const originalValue = get(this.component, dataName);
    return {
      validators,
      name,
      inputEvent,
      component,
      handleFieldBlur,
      handleFieldInput,
      originalValue,
    };
  }

  findFieldsByName(name) {
    return this.el.fields.filter(currentField => currentField.dataset.formField === name);
  }

  async init() {
    const validatorObject = this.form.getValidators();
    const validatorKeys = Object.keys(validatorObject);
    let errors = {};

    for (let i = 0, { length } = validatorKeys; i < length; i += 1) {
      const name = validatorKeys[i];
      const fields = this.findFieldsByName(name);

      if (!isNil(fields)) {
        const fieldsLength = fields.length;
        for (let j = 0; j < fieldsLength; j += 1) {
          const field = fields[j];
          const validators = validatorObject[name];

          const validatorInfo = this.getFieldValidatorInfo(
            name,
            validators,
            field.dataset.dataName,
          );

          field.fieldHandler = new FieldHandler(field, validatorInfo);
          // eslint-disable-next-line no-await-in-loop
          errors = { ...errors, ...await field.fieldHandler.revalidate() };
        }
      }
    }
    this.formEventHandler.setFormAttributes(errors);
  }
}