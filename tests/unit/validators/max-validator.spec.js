import maxMixin from "@/validators/max-validator";

describe("validators/max-validator.js", () => {
  describe("When initialized", () => {
    maxMixin.validationValue = 8;

    describe("and custom message is used", () => {
      it("then it validates correctly", () => {
        expect(maxMixin.validate(7)).toBeTruthy();
        expect(maxMixin.validate(8)).toBeTruthy();
        expect(maxMixin.validate(null)).toBeTruthy();
        expect(maxMixin.validate(16)).toBeFalsy();
      });
    });
  });
});
