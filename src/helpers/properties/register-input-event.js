import { set } from "lodash-es";

const registerInputEvent = (el, arg, value) => {
  if (arg === "inputEvent") {
    set(el.dataset, "inputEvent", value);
    return true;
  }
  return false;
};

export default registerInputEvent;
