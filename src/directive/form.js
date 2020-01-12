import VueFormHandler from "../form/form-handler";
import registerGlobal from "../helpers/properties/register-global";
import registerFields from "../helpers/properties/register-fields";
import registerForm from "../helpers/properties/register-form";
import { removeSubscriptions } from "../helpers/utils/operations";

export default {
  bind(el, binding) {
    registerForm(el, binding);
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
    removeSubscriptions(el);
  }
};
