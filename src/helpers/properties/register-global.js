import registerDirty from "./register-dirty";
import registerPristine from "./register-pristine";
import registerValid from "./register-valid";

const registerGlobal = el => {
  registerDirty(el);
  registerPristine(el);
  registerValid(el);
};

export default registerGlobal;
