import validatorTypes from "@/validators/validator-types";

import VueRxRequiredValidator from "@/validators/required-validator";
import VueRxMinLengthValidator from "@/validators/min-length-validator";
import VueRxMaxLengthValidator from "@/validators/max-length-validator";
import VueRxMaxValidator from "@/validators/max-validator";
import VueRxMinValidator from "@/validators/min-validator";
import VueRxPatternValidator from "@/validators/pattern-validator";
import VueFormCustomValidator from "@/validators/custom-validator";
import VueRxRangeLengthValidator from "@/validators/range-length-validator";
import VueRxRangeValidator from "@/validators/range-validator";
import VueRxFormValidator from "@/validators";

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
        VueRxFormValidator.createValidator(validatorTypes.REQUIRED, message, validationValue);
        expect(VueRxRequiredValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'minLength'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.MIN_LENGTH, message, validationValue);
        expect(VueRxMinLengthValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'maxLength'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.MAX_LENGTH, message, validationValue);
        expect(VueRxMaxLengthValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'max'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.MAX, message, validationValue);
        expect(VueRxMaxValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'min'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.MIN, message, validationValue);
        expect(VueRxMinValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'pattern'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.PATTERN, message, validationValue);
        expect(VueRxPatternValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'range'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.RANGE, message, validationValue);
        expect(VueRxRangeValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is 'rangeLength'", () => {
      it("then it's constructor is called", () => {
        VueRxFormValidator.createValidator(validatorTypes.RANGE_LENGTH, message, validationValue);
        expect(VueRxRangeLengthValidator).toHaveBeenCalledWith(validationValue, message);
      });
    });

    describe("and the type is not a recognized type", () => {
      it("then an error si called", () => {
        const throwError = () =>
          VueRxFormValidator.createValidator("fake", message, validationValue);

        expect(throwError).toThrowError("Unsupported validator type: fake");
      });
    });

    describe("and the type is a custom validator", () => {
      it("then it's constructor is called", () => {
        class MyValidator extends VueFormCustomValidator {}

        VueRxFormValidator.createValidator(MyValidator, message, validationValue, options);
        expect(MyValidator).toHaveBeenCalledWith(message, options);
      });
    });

    describe("and the type is a custom validator that does not extend VueFormCustomValidator", () => {
      it("then an error is thrown", () => {
        class MyValidator {}
        const throwError = () =>
          VueRxFormValidator.createValidator(MyValidator, message, validationValue, options);

        expect(throwError).toThrowError(
          "Unsupported custom validator type. Must extend VueFormCustomValidator: class MyValidator {}"
        );
      });
    });
  });
});
