import { fromEvent } from "rxjs";
import { isNil, set } from "lodash-es";

import registerGlobal from "../helpers/properties/register-global";
import registerDatasetValid from "../helpers/properties/register-dataset-valid";

import registerInvalid from "../helpers/properties/register-invalid";

import {
  removeSubscriptions,
  addSubscription,
  getModelDirective
} from "../helpers/utils/operations";

export default {
  bind(el, binding, vnode) {
    const { arg, value } = binding;
    if (arg && arg === "inputEvent") {
      set(el.dataset, "inputEvent", value);
    }

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
    const inputEvent = el.dataset.inputEvent || el.form.dataset.inputEvent || "input";

    const modelDirective = getModelDirective(vnode);

    if (!isNil(modelDirective)) {
      set(vnode.elm, "value", modelDirective.value);
      if (inputEvent !== "input") {
        addSubscription(
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
    removeSubscriptions(el);
  }
};
