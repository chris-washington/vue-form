import validatorTypes from "@/validators/validator-types";

import VRXRequiredValidator from "@/validators/required-validator";
import VRXMinLengthValidator from "@/validators/min-length-validator";
import VRXMaxLengthValidator from "@/validators/max-length-validator";
import VRXMaxValidator from "@/validators/max-validator";
import VRXMinValidator from "@/validators/min-validator";
import VRXPatternValidator from "@/validators/pattern-validator";
import VRXFormCustomValidator from "@/validators/custom-validator";
import VRXRangeLengthValidator from "@/validators/range-length-validator";
import VRXRangeValidator from "@/validators/range-validator";
import VRXFormValidator from "@/validators";

jest.mock("@/validators/required-validator");
jest.mock("@/validators/min-length-validator");
jest.mock("@/validators/max-length-validator");
jest.mock("@/validators/max-validator");
jest.mock("@/validators/min-validator");
jest.mock("@/validators/pattern-validator");
jest.mock("@/validators/custom-validator");
jest.mock("@/validators/range-length-validator");
jest.mock("@/validators/range-validator");

describe("validators/index.js", () => {
  const message = "my message";
  const validationValue = "some validation value";
  const options = {};

  describe("When createValidator is called", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    describe("and the type is 'required'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.REQUIRED, message, validationValue);
        expect(VRXRequiredValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'minLength'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MIN_LENGTH, message, validationValue);
        expect(VRXMinLengthValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'maxLength'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MAX_LENGTH, message, validationValue);
        expect(VRXMaxLengthValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'max'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MAX, message, validationValue);
        expect(VRXMaxValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'min'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MIN, message, validationValue);
        expect(VRXMinValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'pattern'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.PATTERN, message, validationValue);
        expect(VRXPatternValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'range'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.RANGE, message, validationValue);
        expect(VRXRangeValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'rangeLength'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.RANGE_LENGTH, message, validationValue);
        expect(VRXRangeLengthValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is not a recognized type", () => {
      it("then an error si called", () => {
        const throwError = () => VRXFormValidator.createValidator("fake", message, validationValue);

        expect(throwError).toThrowError("Unsupported validator type: fake");
      });
    });

    describe("and the type is a custom validator", () => {
      it("then it's constructor is called", () => {
        class MyValidator extends VRXFormCustomValidator {}

        VRXFormValidator.createValidator(MyValidator, message, validationValue, options);
        expect(MyValidator).toHaveBeenCalledWith(message, options);
      });
    });

    describe("and the type is a custom validator that does not extend VRXFormCustomValidator", () => {
      it("then an error is thrown", () => {
        class MyValidator {}
        const throwError = () =>
          VRXFormValidator.createValidator(MyValidator, message, validationValue, options);

        expect(throwError).toThrowError(
          "Unsupported custom validator type. Must extend VRXFormCustomValidator: class MyValidator {}"
        );
      });
    });
  });
});
