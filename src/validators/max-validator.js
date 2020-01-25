import { isFinite, toNumber } from "lodash-es";

export default {
  validate(value) {
    const numberValue = toNumber(value);
    return isFinite(numberValue) && value <= this.validationValue;
  }
};
