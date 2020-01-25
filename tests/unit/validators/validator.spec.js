import Validator from "@/validators/validator";

class BadValidator extends Validator {}

describe("validators/validator.js", () => {
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
      expect(badValidator.preCheck).not.toThrow();
      expect(badValidator.validate).not.toThrow();
      expect(validationValue).toBe(3);
      expect(message).toBe("message");
    });
  });
});
