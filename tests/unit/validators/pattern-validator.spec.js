import patternMixin from "@/validators/pattern-validator";

describe("patternMixins/pattern-patternMixin.js", () => {
  describe("When initialized", () => {
    beforeEach(() => {
      patternMixin.preCheck("^(new|New)");
    });

    describe("when string is used", () => {
      it("then it validates correctly", () => {
        expect(patternMixin.validate(7)).toBeFalsy();
        expect(patternMixin.validate("New")).toBeTruthy();
        expect(patternMixin.validate("new")).toBeTruthy();
        expect(patternMixin.validate("New and old")).toBeTruthy();
        expect(patternMixin.validate("Newman")).toBeTruthy();
        expect(patternMixin.validate("newly")).toBeTruthy();
        expect(patternMixin.validate("new world")).toBeTruthy();
        expect(patternMixin.validate("NeW")).toBeFalsy();
        expect(patternMixin.validate(null)).toBeFalsy();
        expect(patternMixin.validate(undefined)).toBeFalsy();
      });
    });
  });
});
