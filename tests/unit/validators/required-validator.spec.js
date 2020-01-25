import requiredMixin from "@/validators/required-validator";

describe("validators/required-validator.js", () => {
  describe("When initialized", () => {
    beforeEach(() => {
      requiredMixin.validationValue = true;
    });

    it("then all returns true", () => {
      expect(requiredMixin.validate(null)).toBeFalsy();
      expect(requiredMixin.validate(undefined)).toBeFalsy();
      expect(requiredMixin.validate(false)).toBeFalsy();
      expect(requiredMixin.validate("")).toBeFalsy();
      expect(requiredMixin.validate("something")).toBeTruthy();
      expect(requiredMixin.validate(4)).toBeTruthy();
    });
  });

  describe("and required is false", () => {
    beforeEach(() => {
      requiredMixin.validationValue = false;
    });

    it("then all returns true", () => {
      expect(requiredMixin.validate(null)).toBeTruthy();
      expect(requiredMixin.validate(undefined)).toBeTruthy();
      expect(requiredMixin.validate(false)).toBeTruthy();
      expect(requiredMixin.validate("")).toBeTruthy();
      expect(requiredMixin.validate("something")).toBeTruthy();
      expect(requiredMixin.validate(4)).toBeTruthy();
    });
  });
});
