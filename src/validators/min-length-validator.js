import { isNil } from "lodash-es";

export default {
  validate(value) {
    return !isNil(value) && value.length >= this.validationValue;
  }
};
