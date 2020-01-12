import { isNil, get } from "lodash-es";
import registerFieldErrors from "@/helpers/properties/register-field-errors";

jest.mock("lodash-es", () => ({
  __esModule: true,
  isNil: jest.fn(),
  get: jest.fn()
}));

describe("helpers/properties/register-field-errors.js", () => {
  let el;
  const name = "team";

  beforeEach(() => {
    jest.restoreAllMocks();
    el = {};

    registerFieldErrors(el, name);
  });

  describe("when errors are retrieved before being set", () => {
    it("then errors then an object is returned with the `name` key undefined", () => {
      expect(el.errors).toBeDefined();
      expect(el.errors[name]).toBeUndefined();
    });
  });
  describe("when errors is set", () => {
    const errors = {
      someError: "hello"
    };

    beforeEach(() => {
      isNil.mockReturnValue(true);
      get.mockReturnValue(null);
      el.errors = errors;
    });

    it("then isNil and get is called with the appropriate args", () => {
      expect(isNil).toHaveBeenCalledWith(get());
    });

    it("then hasErrors is the opposite of isNil", () => {
      expect(el.hasErrors).toBeFalsy();
    });

    it("then isDataValid is the opposite of hasErrors", () => {
      expect(el.isDataValid).toBeTruthy();
    });

    it("then errors contains the set errors", () => {
      expect(el.errors).toEqual(errors);
    });
  });
});
