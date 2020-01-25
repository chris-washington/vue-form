import rangeLengthMixin from "@/validators/range-length-validator";
import { checkForRangeErrors } from "@/helpers/utils/operations";

jest.mock("@/helpers/utils/operations", () => {
  const actual = jest.requireActual("@/helpers/utils/operations");
  return {
    __esModule: true,
    ...actual,
    checkForRangeErrors: jest.fn()
  };
});

describe("validators/range-length-validator.js", () => {
  describe("When initialized", () => {
    rangeLengthMixin.validationValue = [8, 16];
    describe("and preCheck is called", () => {
      beforeEach(() => {
        rangeLengthMixin.preCheck(rangeLengthMixin.validationValue);
      });

      it("then checkForRangeErrors is called with validationValue", () => {
        expect(checkForRangeErrors).toHaveBeenCalledWith(rangeLengthMixin.validationValue);
      });
    });

    describe("and validate is called", () => {
      it("then it validates correctly", () => {
        expect(rangeLengthMixin.validate("aaaaaaa")).toBeFalsy();
        expect(rangeLengthMixin.validate("aaaaaaaa")).toBeTruthy();
        expect(rangeLengthMixin.validate("aaaaaaaaaaaaaaaaa")).toBeFalsy();
        expect(rangeLengthMixin.validate("aaaaaaaaaaaa")).toBeTruthy();
        expect(rangeLengthMixin.validate(null)).toBeFalsy();
        expect(rangeLengthMixin.validate("aaaaaaaaaaaaaaaa")).toBeTruthy();
      });
    });
  });
});
