import { unset, set } from "lodash-es";

import { addSubscription } from "../helpers/utils/operations";

import FormAttributesHandler from "./form-attributes-handler";

export default class VRXFormHandler {
  constructor(el, component, formName) {
    this.el = el;
    this.component = component;
    this.form = this.component[formName];
    this.formAttributeHandler = new FormAttributesHandler(this.el, this.form, component);
  }

  async handleClearForm(doClearForm) {
    if (doClearForm) {
      let state = {};
      for (let i = this.el.fields.length; i--; ) {
        const field = this.el.fields[i];
        unset(this.component, field.dataset.dataName);
        // eslint-disable-next-line no-await-in-loop
        set(state, field.dataset.formField, {
          errors: await field.fieldHandler.revalidate(),
          pristine: true,
          dirty: false
        });
      }
      this.formAttributeHandler.setFormAttributes(state);
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
