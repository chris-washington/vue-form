import VueRxMaxValidator from "@/validators/max-validator";

describe("validators/max-validator.js", () => {
  describe("When initialized", () => {
    const validationValue = 8;
    let validator;

    describe("and default message is used", () => {
      beforeEach(() => {
        validator = new VueRxMaxValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(validator.getMessage()).toBe(
          `Must be a number and the max number allowed is ${validationValue}.`
        );
      });
    });

    describe("and custom message is used", () => {
      const type = "max";
      const message = "my message";

      beforeEach(() => {
        validator = new VueRxMaxValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate(7)).toBeTruthy();
        expect(validator.validate(8)).toBeTruthy();
        expect(validator.validate(null)).toBeTruthy();
        expect(validator.validate(16)).toBeFalsy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
