import { set } from "lodash-es";

const registerForm = (el, binding) => {
  const { arg, value } = binding;
  if (arg && arg === "inputEvent") {
    set(el.dataset, "inputEvent", value);
  } else {
    el.setAttribute("novalidate", "");
  }
};

export default registerForm;
