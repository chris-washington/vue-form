import { constructValidationMessage } from "@/helpers/utils/operations";
import getValidationErrorIfPresent from "@/validators/validation-error";

jest.mock("@/helpers/utils/operations");

describe("validators/validation-error.js", () => {
  describe("when called", () => {
    const errors = {
      myField: {
        required: "some required message"
      }
    };

    beforeEach(() => {
      constructValidationMessage.mockReturnValue(errors);
    });

    it("then the result is returned", async () => {
      const result = true;
      const validator = {
        validate: jest.fn().mockReturnValue(result)
      };

      const value = "my value";

      expect(await getValidationErrorIfPresent(validator, value)).toEqual(errors);
      expect(constructValidationMessage).toHaveBeenCalledWith(result, validator);
      expect(validator.validate).toHaveBeenCalledWith(value);
    });
  });
});
