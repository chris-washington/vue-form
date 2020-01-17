import { set, isNil } from "lodash-es";
import { getModelDirective } from "../utils/operations";

const registerModel = (el, vnode) => {
  const { expression } = getModelDirective(vnode) || {};
  if (!isNil(expression)) {
    set(el.dataset, "formField", expression.substring(expression.indexOf(".") + 1));
    set(el.dataset, "dataName", expression);
  } else {
    throw new Error("v-model directive must be present with a v-form-field directive");
  }
};

export default registerModel;
