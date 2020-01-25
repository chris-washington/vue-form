import minMixin from "@/validators/min-validator";

describe("validators/min-validator.js", () => {
  describe("When initialized", () => {
    minMixin.validationValue = 8;

    describe("and custom message is used", () => {
      it("then it validates correctly", () => {
        expect(minMixin.validate(7)).toBeFalsy();
        expect(minMixin.validate(8)).toBeTruthy();
        expect(minMixin.validate(null)).toBeFalsy();
        expect(minMixin.validate(16)).toBeTruthy();
      });
    });
  });
});
