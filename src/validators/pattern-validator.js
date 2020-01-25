export default {
  preCheck(validationValue) {
    this.validatorRegex = new RegExp(validationValue);
  },
  validate(value) {
    return this.validatorRegex.test(value);
  }
};
