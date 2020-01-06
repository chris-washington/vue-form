import { fromEvent } from "rxjs";
import { isNil, set } from "lodash-es";

import registerGlobal from "../helpers/properties/register-global";
import registerDatasetValid from "../helpers/properties/register-dataset-valid";

import getModelDirective from "../helpers/utils/get-model-directive";
import registerInvalid from "../helpers/properties/register-invalid";

export default {
  bind(el, binding, vnode) {
    console.log(vnode);
    const { arg, value } = binding;
    if (arg && arg === "inputEvent") {
      set(el.dataset, "inputEvent", value);
    }
    set(el, "eventSubscriptions", []);

    registerGlobal(el);
    registerDatasetValid(el);
    registerInvalid(el);

    const { expression } = getModelDirective(vnode);
    if (!isNil(expression)) {
      set(el.dataset, "formField", expression.substring(expression.indexOf(".") + 1));
      set(el.dataset, "dataName", expression);
    } else {
      throw new Error("v-model must be present with a v-form-field directive");
    }
  },
  inserted(el, binding, vnode) {
    const inputEvent = el.form.dataset.inputEvent || "input";

    const modelDirective = getModelDirective(vnode);

    if (!isNil(modelDirective)) {
      set(vnode.elm, "value", modelDirective.value);
      if (inputEvent !== "input") {
        el.eventSubscriptions.push(
          fromEvent(vnode.elm, inputEvent).subscribe(event =>
            vnode.data.model.callback(event.detail)
          )
        );
      }
    }
  },
  update(el, binding, vnode) {
    const modelDirective = getModelDirective(vnode);
    if (!isNil(modelDirective)) {
      set(vnode.elm, "value", modelDirective.value || null);
    }
  },
  unbind(el) {
    if (!isNil(el.eventSubscriptions) && el.eventSubscriptions.length > 0) {
      for (let i = 0, { length } = el.eventSubscriptions; i < length; i += 1) {
        el.eventSubscriptions[i].unsubscribe();
      }
    }
  }
};
