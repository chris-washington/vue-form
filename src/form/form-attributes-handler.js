import { isNil } from "lodash-es";

import FormEventHandler from "./form-event-handler";

function FormAttributesHandler(el, form, component) {
  this.el = el;
  this.form = form;
  this.component = component;
  this.formEventHandler = new FormEventHandler(this.el, this.form, this);
}

FormAttributesHandler.prototype = {
  async init() {
    this.setFormAttributes(this.form.state);
    await this.formEventHandler.init();
    return this;
  },

  setFormAttributes(state) {
    this.formState = { ...this.formState, ...state };
    this.form.isPristine = this.getFormPristine();
    this.el.isPristine = this.form.isPristine;
    this.form.isDirty = this.getFormDirtiness();
    this.el.isDirty = this.form.isDirty;
    this.setFormValidity();
    this.el.isValid = this.form.isValid;
  },

  getFormPristine() {
    return this.el.fields
      .map(field => !isNil(field.getAttribute("pristine")))
      .reduce((accumulator, current) => accumulator && current, true);
  },

  getFormDirtiness() {
    return this.el.fields
      .map(field => !isNil(field.getAttribute("dirty")))
      .reduce((accumulator, current) => accumulator || current, false);
  },

  setFormValidity() {
    let isValid = true;
    const errorKeys = Object.keys(this.formState);
    for (let i = errorKeys.length; i--; ) {
      const error = this.formState[errorKeys[i]].errors;
      if (!isNil(error)) {
        isValid = false;
        break;
      }
    }
    this.form.isValid = isValid;

    this.component.$forceUpdate();
  },

  removeAttribute(name) {
    this.el.removeAttribute(name);
  },

  setAttribute(name, value) {
    this.el.setAttribute(name, value);
  }
};

export default FormAttributesHandler;
