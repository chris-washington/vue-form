import registerValid from "@/helpers/properties/register-valid";

describe("helpers/properties/register-valid.js", () => {
  let el;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    el = {
      setAttribute: jest.fn(),
      removeAttribute: jest.fn()
    };
  });

  describe("When registerValid is called", () => {
    beforeEach(() => {
      registerValid(el);
    });

    describe("and isValid is set", () => {
      describe("and isValid is true", () => {
        beforeEach(() => {
          el.isValid = true;
        });

        it("then removeAttribute is called with 'invalid'", () => {
          expect(el.removeAttribute).toHaveBeenNthCalledWith(1, "invalid");
          expect(el.removeAttribute).toHaveBeenNthCalledWith(2, "aria-invalid");
        });

        it("then isValid is true", () => {
          expect(el.isValid).toBeTruthy();
        });
      });

      describe("and isValid is true", () => {
        beforeEach(() => {
          el.isValid = false;
        });

        it("then setAttribute is called with 'invalid'", () => {
          expect(el.setAttribute).toHaveBeenNthCalledWith(2, "invalid", "");
          expect(el.setAttribute).toHaveBeenNthCalledWith(1, "aria-invalid", true);
        });

        it("then isValid is false", () => {
          expect(el.isValid).toBeFalsy();
        });
      });
    });
  });
});
