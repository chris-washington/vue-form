import { fromEvent } from "rxjs";
import { cloneDeep, set, get } from "lodash-es";
import { addSubscription } from "../helpers/utils/operations";

import FormFieldHandler from "./form-field-handler";

function FormEventHandler(el, form, formAttributeHandler) {
  this.el = el;
  this.form = form;
  this.formAttributeHandler = formAttributeHandler;
  this.formFieldHandler = new FormFieldHandler(
    this.el,
    this.form,
    this,
    formAttributeHandler.component
  );
}

FormEventHandler.prototype = {
  async init() {
    await this.formFieldHandler.init();
    addSubscription(
      this.el,
      fromEvent(this.el, "submit").subscribe(event => event.preventDefault())
    );
  },

  getBoundInputEventFunction() {
    return this.handleFieldInput.bind(this);
  },

  getBoundBlurEventFunction() {
    return this.handleFieldBlur.bind(this);
  },

  updateState() {
    this.form.state = cloneDeep(this.form.state);
  },

  setFormAttributes(state) {
    this.formAttributeHandler.setFormAttributes(state);
  },

  handleFieldInput({ name, state }) {
    set(this.form.state, name, state);
    this.setFormAttributes(this.form.state);
    get(this.form.state, name).errors = undefined;
    this.updateState();
  },

  handleFieldBlur({ name, state }) {
    set(this.form.state, name, state);
    this.setFormAttributes(this.form.state);
    this.updateState();
  }
};

export default FormEventHandler;
