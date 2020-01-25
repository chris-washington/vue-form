import { inRange } from "lodash-es";
import { checkForRangeErrors } from "../helpers/utils/operations";

export default {
  preCheck(validationValue) {
    checkForRangeErrors(validationValue);
  },
  validate(value) {
    const min = this.validationValue[0];
    const max = this.validationValue[1] + 1;

    return inRange(value, min, max);
  }
};
