import VueRxRangeLengthValidator from "@/validators/range-length-validator";
import { throwIfNotTrue, isValidRange } from "@/helpers/utils/operations";

jest.mock("@/helpers/utils/operations", () => {
  const actual = jest.requireActual("@/helpers/utils/operations");
  return {
    __esModule: true,
    ...actual,
    throwIfNotTrue: jest.fn(),
    isValidRange: jest.fn()
  };
});

describe("validators/range-length-validator.js", () => {
  describe("When initialized", () => {
    const validationValue = [8, 16];
    let validator;

    describe("and default message is used", () => {
      beforeEach(() => {
        isValidRange.mockReturnValue(true);
        validator = new VueRxRangeLengthValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(throwIfNotTrue).toHaveBeenCalledWith(
          true,
          `${validationValue.toString()} is not a proper range array.`
        );
        expect(isValidRange).toHaveBeenCalledWith(validationValue);
        expect(validator.getMessage()).toBe(
          `The length of the text should be between ${validationValue[0]} and ${validationValue[1]}.`
        );
      });
    });

    describe("and custom message is used", () => {
      const type = "rangeLength";
      const message = "my message";

      beforeEach(() => {
        validator = new VueRxRangeLengthValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate("aaaaaaa")).toBeFalsy();
        expect(validator.validate("aaaaaaaa")).toBeTruthy();
        expect(validator.validate("aaaaaaaaaaaaaaaaa")).toBeFalsy();
        expect(validator.validate("aaaaaaaaaaaa")).toBeTruthy();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate("aaaaaaaaaaaaaaaa")).toBeTruthy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
