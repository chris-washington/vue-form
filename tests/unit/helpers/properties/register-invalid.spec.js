import registerInvalid from "@/helpers/properties/register-invalid";

describe("helpers/properties/register-invalid.js", () => {
  let el;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    el = {
      setAttribute: jest.fn(),
      removeAttribute: jest.fn()
    };
  });

  describe("When registerInvalid is called", () => {
    beforeEach(() => {
      registerInvalid(el);
    });

    describe("and isInvalid is set", () => {
      describe("and isInvalid is false", () => {
        beforeEach(() => {
          el.isInvalid = false;
        });

        it("then removeAttribute is called with 'invalid'", () => {
          expect(el.removeAttribute).toHaveBeenCalledWith("invalid");
        });

        it("then isInvalid is false", () => {
          expect(el.isInvalid).toBeFalsy();
        });
      });

      describe("and isInvalid is true", () => {
        beforeEach(() => {
          el.isInvalid = true;
        });

        it("then removeAttribute is called with 'invalid'", () => {
          expect(el.setAttribute).toHaveBeenCalledWith("invalid", "");
        });

        it("then isInvalid is true", () => {
          expect(el.isInvalid).toBeTruthy();
        });
      });
    });
  });
});
