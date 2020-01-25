import { isInclusiveEmpty } from "../helpers/utils/operations";

export default {
  validate(value) {
    const empty = isInclusiveEmpty(value);
    return !this.validationValue === empty || !empty;
  }
};
