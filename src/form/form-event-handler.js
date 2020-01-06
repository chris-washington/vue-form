import { fromEvent } from "rxjs";
import { cloneDeep, set, unset } from "lodash-es";
import addSubscription from "../helpers/utils/add-subscription";

import FormFieldHandler from "./form-field-handler";

export default class FormEventHandler {
  constructor(el, form, formAttributeHandler) {
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

  init() {
    this.formFieldHandler.init();
    addSubscription(
      this.el,
      fromEvent(this.el, "submit").subscribe(event => event.preventDefault())
    );
  }

  getBoundInputEventFunction() {
    return this.handleFieldInput.bind(this);
  }

  getBoundBlurEventFunction() {
    return this.handleFieldBlur.bind(this);
  }

  updateErrors() {
    this.form.errors = cloneDeep(this.form.errors);
  }

  setFormAttributes(errors) {
    this.formAttributeHandler.setFormAttributes(errors);
  }

  handleFieldInput({ name, errors }) {
    this.setFormAttributes(errors);
    unset(this.form.errors, name);
    this.updateErrors(errors);
  }

  handleFieldBlur({ errors, name }) {
    this.setFormAttributes(errors);
    set(this.form.errors, name, errors[name]);
    this.updateErrors(errors);
  }
}
