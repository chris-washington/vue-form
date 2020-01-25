import rangeMixin from "@/validators/range-validator";
import { checkForRangeErrors } from "@/helpers/utils/operations";

jest.mock("@/helpers/utils/operations");

describe("validators/range-validator.js", () => {
  describe("When initialized", () => {
    rangeMixin.validationValue = [8, 16];

    describe("and preCheck is called", () => {
      beforeEach(() => {
        rangeMixin.preCheck(rangeMixin.validationValue);
      });

      it("then checkForRangeErrors is called with validationValue", () => {
        expect(checkForRangeErrors).toHaveBeenCalledWith(rangeMixin.validationValue);
      });
    });

    describe("and custom message is used", () => {
      it("then it validates correctly", () => {
        expect(rangeMixin.validate(7)).toBeFalsy();
        expect(rangeMixin.validate(8)).toBeTruthy();
        expect(rangeMixin.validate(17)).toBeFalsy();
        expect(rangeMixin.validate(12)).toBeTruthy();
        expect(rangeMixin.validate(null)).toBeFalsy();
        expect(rangeMixin.validate(undefined)).toBeFalsy();
        expect(rangeMixin.validate("")).toBeFalsy();
        expect(rangeMixin.validate(16)).toBeTruthy();
      });
    });
  });
});
