import VRXMaxLengthValidator from "@/validators/max-length-validator";

describe("validators/max-length-validator.js", () => {
  describe("When initialized", () => {
    const validationValue = 8;
    let validator;

    describe("and default message is used", () => {
      beforeEach(() => {
        validator = new VRXMaxLengthValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(validator.getMessage()).toBe(
          `The text should have a max character length of ${validationValue}.`
        );
      });
    });

    describe("and custom message is used", () => {
      const type = "maxLength";
      const message = "my message";

      beforeEach(() => {
        validator = new VRXMaxLengthValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate("aaa")).toBeTruthy();
        expect(validator.validate("aaaaaaaa")).toBeTruthy();
        expect(validator.validate(null)).toBeTruthy();
        expect(validator.validate("aaaaaaaaaaaaaaaa")).toBeFalsy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
