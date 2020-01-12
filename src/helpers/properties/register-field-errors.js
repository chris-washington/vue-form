import { isNil, get } from "lodash-es";

const registerFieldErrors = (el, name) => {
  Object.defineProperty(el, "errors", {
    get() {
      if (!this._fieldErrors) {
        this._fieldErrors = {};
        this._fieldErrors[name] = undefined;
      }

      return this._fieldErrors;
    },
    set(errors) {
      this._fieldErrors = errors;
      this.hasErrors = !isNil(get(this._fieldErrors, this.name));
      this.isDataValid = !this.hasErrors;
    }
  });
};

export default registerFieldErrors;
