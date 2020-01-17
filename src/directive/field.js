import { set } from "lodash-es";

import registerGlobal from "../helpers/properties/register-global";
import registerDatasetValid from "../helpers/properties/register-dataset-valid";

import registerInvalid from "../helpers/properties/register-invalid";

import { removeSubscriptions, getModelDirective } from "../helpers/utils/operations";
import registerInputEvent from "../helpers/properties/register-input-event";
import registerModel from "../helpers/properties/register-model";

import registerCustomInput from "../helpers/properties/register-custom-input";

export default {
  bind(el, binding, vnode) {
    console.dir(el);
    const { arg, value } = binding;

    registerInputEvent(el, arg, value);
    registerGlobal(el);
    registerDatasetValid(el);
    registerInvalid(el);
    registerModel(el, vnode);
  },
  inserted(el, binding, vnode) {
    const inputEvent = el.dataset.inputEvent || el.form.dataset.inputEvent || "input";
    if (inputEvent !== "input") {
      registerCustomInput(vnode, inputEvent);
    }
  },
  update(el, binding, vnode) {
    const modelDirective = getModelDirective(vnode);
    if (el.dataset.dataName) {
      set(vnode.elm, "value", modelDirective.value || null);
    }
  },
  unbind(el) {
    removeSubscriptions(el);
  }
};
