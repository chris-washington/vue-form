import { set } from "lodash-es";

const registerInputEvent = (el, arg, value) => {
  if (arg && arg === "inputEvent") {
    set(el.dataset, "inputEvent", value);
  }
};

export default registerInputEvent;
