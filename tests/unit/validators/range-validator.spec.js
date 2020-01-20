import VRXRangeValidator from "@/validators/range-validator";
import { throwIfNotTrue, isValidRange } from "@/helpers/utils/operations";

jest.mock("@/helpers/utils/operations");

describe("validators/range-validator.js", () => {
  describe("When initialized", () => {
    const validationValue = [8, 16];
    let validator;

    describe("and default message is used", () => {
      beforeEach(() => {
        isValidRange.mockReturnValue(true);
        validator = new VRXRangeValidator(validationValue);
      });

      it("then the error message is default", () => {
        expect(throwIfNotTrue).toHaveBeenCalledWith(
          true,
          `${validationValue.toString()} is not a proper range array.`
        );
        expect(isValidRange).toHaveBeenCalledWith(validationValue);
        expect(validator.getMessage()).toBe(
          `The number must be between the values ${validationValue[0]} and ${validationValue[1]}.`
        );
      });
    });

    describe("and custom message is used", () => {
      const type = "range";
      const message = "my message";

      beforeEach(() => {
        validator = new VRXRangeValidator(validationValue, message);
      });

      it("then it validates correctly", () => {
        expect(validator.type).toBe(type);
        expect(validator.validate(7)).toBeFalsy();
        expect(validator.validate(8)).toBeTruthy();
        expect(validator.validate(17)).toBeFalsy();
        expect(validator.validate(12)).toBeTruthy();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.validate(undefined)).toBeFalsy();
        expect(validator.validate("")).toBeFalsy();
        expect(validator.validate(16)).toBeTruthy();
      });

      it("then the message is equal to the intialized message", () => {
        expect(message).toBe(validator.getMessage());
      });
    });
  });
});
