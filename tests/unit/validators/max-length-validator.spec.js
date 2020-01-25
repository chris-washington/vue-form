import maxLengthMixin from "@/validators/max-length-validator";

describe("validators/max-length-validator.js", () => {
  describe("When initialized", () => {
    maxLengthMixin.validationValue = 8;

    describe("and custom message is used", () => {
      it("then it validates correctly", () => {
        expect(maxLengthMixin.validate("aaa")).toBeTruthy();
        expect(maxLengthMixin.validate("aaaaaaaa")).toBeTruthy();
        expect(maxLengthMixin.validate(null)).toBeTruthy();
        expect(maxLengthMixin.validate("aaaaaaaaaaaaaaaa")).toBeFalsy();
      });
    });
  });
});
