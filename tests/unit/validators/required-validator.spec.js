import VRXRequiredLengthValidator from "@/validators/required-validator";

describe("validators/required-validator.js", () => {
  describe("When initialized", () => {
    let validationValue = false;
    let validator;
    const type = "required";
    const message = "my message";

    describe("and default message is used", () => {
      beforeEach(() => {
        validator = new VRXRequiredLengthValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(validator.getMessage()).toBe("This field is required.");
      });
    });

    describe("and required is true", () => {
      beforeEach(() => {
        validationValue = true;
        validator = new VRXRequiredLengthValidator(validationValue);
      });

      it("then all returns true", () => {
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate(undefined)).toBeFalsy();
        expect(validator.validate(false)).toBeFalsy();
        expect(validator.validate("")).toBeFalsy();
        expect(validator.validate("something")).toBeTruthy();
        expect(validator.validate(4)).toBeTruthy();

        expect(type).toBe(validator.type);
      });
    });

    describe("and required is false", () => {
      beforeEach(() => {
        validationValue = false;
        validator = new VRXRequiredLengthValidator(validationValue);
      });

      it("then all returns true", () => {
        expect(validator.validate(null)).toBeTruthy();
        expect(validator.validate(undefined)).toBeTruthy();
        expect(validator.validate(false)).toBeTruthy();
        expect(validator.validate("")).toBeTruthy();
        expect(validator.validate("something")).toBeTruthy();
        expect(validator.validate(4)).toBeTruthy();

        expect(type).toBe(validator.type);
      });
    });

    describe("and custom message is used", () => {
      beforeEach(() => {
        validator = new VRXRequiredLengthValidator(validationValue, message);
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
