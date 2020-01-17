import registerInputEvent from "@/helpers/properties/register-input-event";
import registerForm from "@/helpers/properties/register-form";

jest.mock("@/helpers/properties/register-input-event");

describe("@/helpers/properties/register-form.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("when register form is called", () => {
    describe("and arg is null", () => {
      it("then el.setAttribute is called", () => {
        const el = {
          setAttribute: jest.fn()
        };

        registerInputEvent.mockReturnValue(false);
        registerForm(el, {});
        expect(registerInputEvent).toHaveBeenCalledWith(el, undefined, undefined);
        expect(el.setAttribute).toHaveBeenCalledWith("novalidate", "");
      });

      describe("and arg is inputEvent", () => {
        it("then el.setAttribute is called", () => {
          const el = {
            dataset: {},
            setAttribute: jest.fn()
          };

          const value = "value";
          const arg = "inputEvent";

          registerInputEvent.mockReturnValue(true);
          registerForm(el, { value, arg });
          expect(el.setAttribute).not.toHaveBeenCalled();
          expect(registerInputEvent).toHaveBeenCalledWith(el, arg, value);
        });
      });
    });
  });
});
