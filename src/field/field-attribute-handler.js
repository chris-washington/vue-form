import { get, isEqualWith } from "lodash-es";
import registerFieldName from "../helpers/properties/register-field-name";
import registerFieldErrors from "../helpers/properties/register-field-errors";
import { isInclusiveEmpty } from "../helpers/utils/operations";

function FieldAttributeHandler(el, fieldValidator) {
  this.el = el;
  this.name = this.el.dataset.formField;
  this.validatorInfo = fieldValidator.getValidatorInfo();
  this.fieldValidator = fieldValidator;
  registerFieldName(this.el, this.name);
  registerFieldErrors(this.el, this.name);
}

FieldAttributeHandler.prototype = {
  init() {
    this.setInputDirty();
    this.el.isPristine = true;
    this.setOriginalValue();
  },

  setOriginalValue() {
    const { validatorInfo } = this;
    this.originalValue = validatorInfo.originalValue;
  },

  async clear() {
    this.originalValue = undefined;
    this.el.isDirty = false;
    this.el.errors = {};
    this.el.isPristine = true;
  },

  getValue() {
    return get(this.validatorInfo.component, this.el.dataset.dataName);
  },

  setInputDirty() {
    this.el.isDirty = !isEqualWith(this.originalValue, this.getValue(), (a, b) => {
      if (isInclusiveEmpty(a) && isInclusiveEmpty(b)) {
        return true;
      }

      return undefined;
    });
  },

  setInputNotPristine() {
    this.el.isPristine = false;
  },

  setAttribute(name, value) {
    this.el.setAttribute(name, value);
  },

  removeAttribute(name) {
    this.el.removeAttribute(name);
  }
};

export default FieldAttributeHandler;
