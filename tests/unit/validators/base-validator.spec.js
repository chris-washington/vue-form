import BaseValidator from "@/validators/base-validator";

class BadValidator extends BaseValidator {}

describe("validators/base-validator.js", () => {
  let baseValidator;
  describe("When BaseValidator is instantiated", () => {
    describe("and validationValue is required and nil", () => {
      it("then an error should be thrown", () => {
        const baseValidatorNew = () => new BadValidator("type");
        expect(baseValidatorNew).toThrow(
          "You must provide a 'validation' property to validate against for the BadValidator"
        );
      });
    });
    it("then all instantiations should be there", () => {
      const badValidator = new BadValidator("type", 3, "message");
      const { type, message, validationValue } = badValidator;
      const typeChange = () => (badValidator.type = "newType");
      expect(typeChange).toThrowError();
      expect(type).toBe("type");
      expect(validationValue).toBe(3);
      expect(message).toBe("message");
    });
  });

  describe("when BaseValidator is extended without overriding static methods", () => {
    beforeEach(() => {
      baseValidator = new BadValidator("someType", "message", false);
    });
    it("then an error is thrown when validate is called", () => {
      const validate = () => baseValidator.validate();

      expect(validate).toThrowError('You have to implement the method "validate" for BadValidator');
    });

    it("then an error is thrown when getMessage is called", () => {
      const getMessage = () => baseValidator.getMessage();

      expect(getMessage).toThrowError(
        'You have to implement the method "getMessage" for BadValidator'
      );
    });
  });
});
