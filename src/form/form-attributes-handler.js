import { isNil } from "lodash-es";

import FormEventHandler from "./form-event-handler";

export default class FormAttributesHandler {
  constructor(el, form, component) {
    this.el = el;
    this.form = form;
    this.component = component;
    this.formEventHandler = new FormEventHandler(this.el, this.form, this);
  }

  init() {
    this.setFormAttributes();
    this.formEventHandler.init();
    this.formErrors = {};
    return this;
  }

  setFormAttributes(errors) {
    this.formErrors = { ...this.formErrors, ...errors };
    this.form.pristine = false;
    this.el.isPristine = false;
    this.form.dirty = this.getFormDirtiness();
    this.el.isDirty = this.form.dirty;
    this.setFormValidity();
    this.el.isValid = this.form.isValid;
  }

  getFormDirtiness() {
    return this.el.fields
      .map(field => !isNil(field.getAttribute("dirty")))
      .reduce((accumulator, current) => accumulator || current, false);
  }

  setFormValidity() {
    let isValid = true;
    const errorKeys = Object.keys(this.formErrors);
    const { length } = errorKeys;

    for (let i = 0; i < length; i += 1) {
      const errorKey = errorKeys[i];
      const error = this.formErrors[errorKey];

      if (!isNil(error)) {
        isValid = false;
        break;
      }
    }

    this.form.isValid = isValid;

    this.component.$forceUpdate();
  }

  removeAttribute(name) {
    this.el.removeAttribute(name);
  }

  setAttribute(name, value) {
    this.el.setAttribute(name, value);
  }
}
