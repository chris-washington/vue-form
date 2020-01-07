import { unset } from "lodash-es";

import addSubscription from "../helpers/utils/add-subscription";

import FormAttributesHandler from "./form-attributes-handler";

export default class VueFormHandler {
  constructor(el, component, formName) {
    this.el = el;
    this.component = component;
    this.form = this.component[formName];
    this.formAttributeHandler = new FormAttributesHandler(this.el, this.form, component);
  }

  async handleClearForm(doClearForm) {
    if (doClearForm) {
      let errors = {};
      for (let i = this.el.fields.length; i--; ) {
        const field = this.el.fields[i];
        unset(this.component, field.dataset.dataName);
        // eslint-disable-next-line no-await-in-loop
        errors = { ...errors, ...(await field.fieldHandler.revalidate()) };
      }
      this.formAttributeHandler.setFormAttributes(errors);
      await this.component.$nextTick();
      this.component.$forceUpdate();
    }
  }

  async handleInitialization(ready) {
    if (ready) {
      await this.formAttributeHandler.init();
    }
  }

  init() {
    addSubscription(
      this.el,
      this.form.getInitObservable().subscribe(this.handleInitialization.bind(this))
    );
    addSubscription(
      this.el,
      this.form.getClearFormObservable().subscribe(this.handleClearForm.bind(this))
    );
  }
}
