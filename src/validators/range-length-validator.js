import { inRange } from "lodash-es";
import { checkForRangeErrors, isInclusiveEmpty } from "../helpers/utils/operations";

export default {
  preCheck(validationValue) {
    checkForRangeErrors(validationValue);
  },
  validate(value) {
    const min = this.validationValue[0];
    const max = this.validationValue[1] + 1;
    const empty = isInclusiveEmpty(value);
    if (empty) return false;

    return inRange(value.length, min, max);
  }
};
