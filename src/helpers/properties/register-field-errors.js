import { isNil, get } from "lodash-es";

export default function registerFieldErrors(el, name) {
  Object.defineProperty(el, "errors", {
    get() {
      if (!this.fieldErrors) {
        this.fieldErrors[name] = undefined;
      }

      return this.fieldErrors;
    },
    set(errors) {
      this.fieldErrors = errors;
      this.hasErrors = !isNil(get(this.fieldErrors, this.name));
      this.isDataValid = !this.hasErrors;
    }
  });
}
