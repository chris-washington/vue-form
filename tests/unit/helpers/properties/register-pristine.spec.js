import registerPristine from "@/helpers/properties/register-pristine";

describe("helpers/properties/register-pristine.js", () => {
  let el;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    el = {
      setAttribute: jest.fn(),
      removeAttribute: jest.fn()
    };
  });

  describe("When registerPristine is called", () => {
    beforeEach(() => {
      registerPristine(el);
    });

    describe("and isPristine is set", () => {
      describe("and isPristine is false", () => {
        beforeEach(() => {
          el.isPristine = false;
        });

        it("then removeAttribute is called with 'pristine'", () => {
          expect(el.removeAttribute).toHaveBeenCalledWith("pristine");
        });

        it("then isPristine is false", () => {
          expect(el.isPristine).toBeFalsy();
        });
      });

      describe("and isPristine is true", () => {
        beforeEach(() => {
          el.isPristine = true;
        });

        it("then removeAttribute is called with 'pristine'", () => {
          expect(el.setAttribute).toHaveBeenCalledWith("pristine", "");
        });

        it("then isPristine is true", () => {
          expect(el.isPristine).toBeTruthy();
        });
      });
    });
  });
});
