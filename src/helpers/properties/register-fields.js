import { isNil } from "lodash-es";

const registerFields = el => {
  Object.defineProperty(el, "fields", {
    get() {
      if (isNil(this._fields)) {
        this._fields = [...this.querySelectorAll("[data-form-field]")];
      }
      return this._fields;
    }
  });
};

export default registerFields;
