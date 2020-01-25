import VRXValidator from "./validator";

function getClass() {
  return class Validator extends VRXValidator {};
}

export default function createMixin(mixin, name, validationValue, message) {
  const Validator = getClass();
  Object.assign(Validator.prototype, mixin);
  return new Validator(name, validationValue, message);
}
