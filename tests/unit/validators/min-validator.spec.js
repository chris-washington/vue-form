import VRXMinValidator from "@/validators/min-validator";

describe("validators/min-validator.js", () => {
  describe("When initialized", () => {
    const validationValue = 8;
    let validator;

    describe("and default message is used", () => {
      beforeEach(() => {
        validator = new VRXMinValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(validator.getMessage()).toBe(
          `Must be a number and the minimum number allowed is ${validationValue}.`
        );
      });
    });

    describe("and custom message is used", () => {
      const type = "min";
      const message = "my message";

      beforeEach(() => {
        validator = new VRXMinValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate(7)).toBeFalsy();
        expect(validator.validate(8)).toBeTruthy();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate(16)).toBeTruthy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
