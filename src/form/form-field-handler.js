import { get, isNil, set } from "lodash-es";

import FieldHandler from "../field/field-handler";

function FormFieldHandler(el, form, formEventHandler, component) {
  this.form = form;
  this.el = el;
  this.formEventHandler = formEventHandler;
  this.component = component;
}

FormFieldHandler.prototype = {
  getFieldValidatorInfo(name, validators, dataName) {
    const handleFieldInput = this.formEventHandler.getBoundInputEventFunction();
    const handleFieldBlur = this.formEventHandler.getBoundBlurEventFunction();
    const inputEvent = this.el.dataset.inputEvent || "input";
    const { component } = this;
    const originalValue = get(this.component, dataName);

    return {
      validators,
      name,
      inputEvent,
      component,
      handleFieldBlur,
      handleFieldInput,
      originalValue
    };
  },

  findFieldsByName(name) {
    return this.el.fields.filter(currentField => currentField.dataset.formField === name);
  },

  async init() {
    const validatorObject = this.form.getValidators();
    const validatorKeys = Object.keys(validatorObject);

    let state = {};

    for (let i = validatorKeys.length; i--; ) {
      const name = validatorKeys[i];
      const fields = this.findFieldsByName(name);

      if (!isNil(fields)) {
        for (let j = fields.length; j--; ) {
          const field = fields[j];
          const validators = validatorObject[name];

          const validatorInfo = this.getFieldValidatorInfo(
            name,
            validators,
            field.dataset.dataName
          );

          field.fieldHandler = new FieldHandler(field, validatorInfo).init();

          set(state, name, {
            errors: await field.fieldHandler.revalidate(),
            pristine: true,
            dirty: false
          });
        }
      }
    }
    this.formEventHandler.setFormAttributes(state);
  }
};

export default FormFieldHandler;
