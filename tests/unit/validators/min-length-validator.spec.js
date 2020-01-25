import minLengthMixin from "@/validators/min-length-validator";

describe("validators/min-length-validator.js", () => {
  describe("When initialized", () => {
    minLengthMixin.validationValue = 8;

    describe("and custom message is used", () => {
      it("then it validates correctly", () => {
        expect(minLengthMixin.validate("aaa")).toBeFalsy();
        expect(minLengthMixin.validate("aaaaaaaa")).toBeTruthy();
        expect(minLengthMixin.validate(null)).toBeFalsy();
        expect(minLengthMixin.validate("aaaaaaaaaaaaaaaa")).toBeTruthy();
      });
    });
  });
});
