import VRXMinLengthValidator from "@/validators/min-length-validator";

describe("validators/min-length-validator.js", () => {
  describe("When initialized", () => {
    const validationValue = 8;
    let validator;

    describe("and default message is used", () => {
      beforeEach(() => {
        validator = new VRXMinLengthValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(validator.getMessage()).toBe(
          `The text should have a min character length of ${validationValue}.`
        );
      });
    });

    describe("and custom message is used", () => {
      const type = "minLength";
      const message = "my message";

      beforeEach(() => {
        validator = new VRXMinLengthValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate("aaa")).toBeFalsy();
        expect(validator.validate("aaaaaaaa")).toBeTruthy();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate("aaaaaaaaaaaaaaaa")).toBeTruthy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
