import { set } from "lodash-es";
import { fromEvent } from "rxjs";
import { addSubscription, getModelDirective } from "../utils/operations";

const registerCustomInput = (vnode, inputEvent) => {
  if (inputEvent !== "input") {
    const { value } = getModelDirective(vnode);
    set(vnode.elm, "value", value);
    addSubscription(
      fromEvent(vnode.elm, inputEvent).subscribe(event => vnode.data.model.callback(event.detail))
    );
  }
};

export default registerCustomInput;
