/* eslint-disable no-param-reassign */
import VueFormDirective from "./directive/form";
import VueFormFieldDirective from "./directive/field";
import VueForm from "./form/form";
import VueFormCustomValidator from "./validators/custom-validator";
import VueFormValidatorTypes from "./validators/validator-types";

const VueFormsPlugin = {};

VueFormsPlugin.install = function install(Vue) {
  Vue.directive("form", VueFormDirective);
  Vue.directive("form-field", VueFormFieldDirective);
  Vue.prototype.$createForm = function createForm() {
    return new VueForm();
  };
};

export default VueFormsPlugin;

export { VueForm, VueFormCustomValidator, VueFormValidatorTypes };
