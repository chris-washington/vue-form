import VRXFormCustomValidator from "@/validators/custom-validator";

describe("validators/custom-validator.js", () => {
  describe("When initialized", () => {
    it("then properties are set accordingly", () => {
      const type = "sometype";
      const message = "some message";
      const options = {
        option1: "anOption"
      };

      const validator = new VRXFormCustomValidator(type, message, options);

      expect(validator.getMessage()).toBe(message);
      expect(validator.message).toBe(message);
      expect(validator.type).toBe(type);
      expect(validator.options).toEqual(options);
    });
  });
});
