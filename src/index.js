/* eslint-disable no-param-reassign */
import VRXFormDirective from "./directive/form";
import VRXFormFieldDirective from "./directive/field";
import VRXForm from "./form/form";
import VRXFormCustomValidator from "./validators/custom-validator";
import VRXFormValidatorTypes from "./validators/validator-types";

const VRXFormsPlugin = {};

VRXFormsPlugin.install = function install(Vue) {
  Vue.directive("form", VRXFormDirective);
  Vue.directive("form-field", VRXFormFieldDirective);
  Vue.prototype.$createForm = function createForm() {
    return new VRXForm();
  };
};

export default VRXFormsPlugin;

export { VRXForm, VRXFormCustomValidator, VRXFormValidatorTypes };
