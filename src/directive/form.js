import { set } from "lodash-es";
import VueFormHandler from "../form/form-handler";
import registerGlobal from "../helpers/properties/register-global";
import registerFields from "../helpers/properties/register-fields";
import { unsubscribeElement } from "../helpers/utils/operations";

export default {
  bind(el, binding) {
    const { arg, value } = binding;
    if (arg && arg === "inputEvent") {
      set(el.dataset, "inputEvent", value);
    } else {
      set(el, "eventSubscriptions", []);
      el.setAttribute("novalidate", "");
    }
  },
  inserted(el, binding, vnode) {
    const { arg, expression } = binding;
    if (!arg) {
      registerGlobal(el);
      registerFields(el);

      if (vnode.tag === "form") {
        new VueFormHandler(el, vnode.context, expression).init();
      } else {
        throw new Error("vue-form can only be used on a form-tag");
      }
    }
  },
  unbind(el) {
    unsubscribeElement(el);
  }
};
