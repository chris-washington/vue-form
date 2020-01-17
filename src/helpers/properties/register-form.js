import registerInputEvent from "./register-input-event";

const registerForm = (el, binding) => {
  const { arg, value } = binding;
  if (!registerInputEvent(el, arg, value)) {
    el.setAttribute("novalidate", "");
  }
};

export default registerForm;
