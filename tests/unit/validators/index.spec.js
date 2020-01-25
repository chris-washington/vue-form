import validatorTypes from "@/validators/validator-types";

import requiredMixin from "@/validators/required-validator";
import minLengthMixin from "@/validators/min-length-validator";
import maxLengthMixin from "@/validators/max-length-validator";
import maxMixin from "@/validators/max-validator";
import minMixin from "@/validators/min-validator";
import patternMixin from "@/validators/pattern-validator";
import VRXFormCustomValidator from "@/validators/custom-validator";
import rangeLengthMixin from "@/validators/range-length-validator";
import rangeMixin from "@/validators/range-validator";
import VRXFormValidator from "@/validators";

import createMixin from "@/validators/create-mixin";

jest.mock("@/validators/create-mixin");

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
        expect(createMixin).toHaveBeenCalledWith(
          requiredMixin,
          "required",
          validationValue,
          message
        );
      });
    });

    describe("and the type is 'minLength'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MIN_LENGTH, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(
          minLengthMixin,
          "minLength",
          validationValue,
          message
        );
      });
    });

    describe("and the type is 'maxLength'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MAX_LENGTH, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(
          maxLengthMixin,
          "maxLength",
          validationValue,
          message
        );
      });
    });

    describe("and the type is 'max'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MAX, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(maxMixin, "max", validationValue, message);
      });
    });

    describe("and the type is 'min'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.MIN, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(minMixin, "min", validationValue, message);
      });
    });

    describe("and the type is 'pattern'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.PATTERN, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(patternMixin, "pattern", validationValue, message);
      });
    });

    describe("and the type is 'range'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.RANGE, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(rangeMixin, "range", validationValue, message);
      });
    });

    describe("and the type is 'rangeLength'", () => {
      it("then it's constructor is called", () => {
        VRXFormValidator.createValidator(validatorTypes.RANGE_LENGTH, message, validationValue);
        expect(createMixin).toHaveBeenCalledWith(
          rangeLengthMixin,
          "rangeLength",
          validationValue,
          message
        );
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
