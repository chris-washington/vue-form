import registerDirty from "./register-dirty";
import registerPristine from "./register-pristine";
import registerValid from "./register-valid";

export default function registerGlobal(el) {
  registerDirty(el);
  registerPristine(el);
  registerValid(el);
}
