import VRXPatternValidator from "@/validators/pattern-validator";

describe("validators/pattern-validator.js", () => {
  describe("When initialized", () => {
    let validationValue = "value";
    let validator;
    const type = "pattern";

    const message = "my message";

    describe("and default message is used", () => {
      beforeEach(() => {
        validator = new VRXPatternValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(validator.getMessage()).toBe("This field's value is invalid.");
      });
    });
    describe("when string is used", () => {
      beforeEach(() => {
        validationValue = "^(new|New)";
        validator = new VRXPatternValidator(validationValue, message);
      });
      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate(7)).toBeFalsy();
        expect(validator.validate("New")).toBeTruthy();
        expect(validator.validate("new")).toBeTruthy();
        expect(validator.validate("New and old")).toBeTruthy();
        expect(validator.validate("Newman")).toBeTruthy();
        expect(validator.validate("newly")).toBeTruthy();
        expect(validator.validate("new world")).toBeTruthy();
        expect(validator.validate("NeW")).toBeFalsy();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate(undefined)).toBeFalsy();
      });
    });

    describe("and custom message is used", () => {
      beforeEach(() => {
        validationValue = /^(new|New)/;
        validator = new VRXPatternValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate(7)).toBeFalsy();
        expect(validator.validate("New")).toBeTruthy();
        expect(validator.validate("new")).toBeTruthy();
        expect(validator.validate("New and old")).toBeTruthy();
        expect(validator.validate("Newman")).toBeTruthy();
        expect(validator.validate("newly")).toBeTruthy();
        expect(validator.validate("new world")).toBeTruthy();
        expect(validator.validate("NeW")).toBeFalsy();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate(undefined)).toBeFalsy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
